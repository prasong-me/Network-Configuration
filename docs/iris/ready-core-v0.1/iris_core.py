import json, sqlite3, uuid, hashlib
from datetime import datetime, timezone, timedelta

SCHEMA_VERSION='iris.event.v1'

def now(): return datetime.now(timezone.utc).isoformat()
def new_id(): return str(uuid.uuid4())
def canon(x): return json.dumps(x,sort_keys=True,separators=(',',':'),ensure_ascii=False)
def digest(x): return hashlib.sha256(canon(x).encode()).hexdigest()

class IRIS:
    def __init__(self, db='iris.db'):
        self.db=sqlite3.connect(db)
        self.db.executescript('''
        CREATE TABLE IF NOT EXISTS events(
          event_id TEXT PRIMARY KEY, work_id TEXT NOT NULL, session_id TEXT,
          seq INTEGER NOT NULL, event_type TEXT NOT NULL, occurred_at TEXT NOT NULL,
          producer TEXT NOT NULL, schema_version TEXT NOT NULL, payload TEXT NOT NULL,
          provenance TEXT NOT NULL, authority TEXT NOT NULL, causation_id TEXT,
          correlation_id TEXT, previous_hash TEXT, event_hash TEXT NOT NULL UNIQUE);
        CREATE TABLE IF NOT EXISTS checkpoints(
          checkpoint_id TEXT PRIMARY KEY, work_id TEXT NOT NULL, session_id TEXT,
          last_event_id TEXT NOT NULL, last_seq INTEGER NOT NULL, state TEXT NOT NULL,
          evidence TEXT NOT NULL, integrity_hash TEXT NOT NULL, created_at TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS write_grants(
          grant_id TEXT PRIMARY KEY, work_id TEXT NOT NULL, session_id TEXT,
          operation TEXT NOT NULL, target TEXT NOT NULL, schema_version TEXT NOT NULL,
          issued_at TEXT NOT NULL, expires_at TEXT NOT NULL, used INTEGER NOT NULL,
          grant_hash TEXT NOT NULL UNIQUE);
        '''); self.db.commit()

    def start_work(self, command, actor='ChatGPT'):
        w,s=new_id(),new_id()
        self.append(w,s,'WORK_STARTED',{'command':command,'status':'ACTIVE'},actor,
                    {'status':'VERIFIED','source':'user_work_command'},
                    {'status':'VERIFIED','scope':'work-start'})
        return {'work_id':w,'session_id':s}

    def _last(self,w):
        return self.db.execute('SELECT seq,event_hash,event_id FROM events WHERE work_id=? ORDER BY seq DESC LIMIT 1',(w,)).fetchone()

    def append(self,w,s,event_type,payload,producer='ChatGPT',provenance=None,authority=None,causation_id=None,correlation_id=None):
        last=self._last(w); seq=(last[0]+1 if last else 1); prev=(last[1] if last else None)
        e={'event_id':new_id(),'work_id':w,'session_id':s,'seq':seq,'event_type':event_type,
           'occurred_at':now(),'producer':producer,'schema_version':SCHEMA_VERSION,
           'payload':payload,'provenance':provenance or {'status':'UNKNOWN'},
           'authority':authority or {'status':'UNKNOWN'},'causation_id':causation_id,
           'correlation_id':correlation_id,'previous_hash':prev}
        e['event_hash']=digest(e)
        self.db.execute('INSERT INTO events VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',(
            e['event_id'],w,s,seq,event_type,e['occurred_at'],producer,SCHEMA_VERSION,
            canon(payload),canon(e['provenance']),canon(e['authority']),causation_id,
            correlation_id,prev,e['event_hash']))
        self.db.commit(); return e

    def authorize_write(self,w,s,operation,target,ttl_seconds=300):
        issued=datetime.now(timezone.utc); expires=issued+timedelta(seconds=ttl_seconds)
        g={'grant_id':new_id(),'work_id':w,'session_id':s,'operation':operation,'target':target,
           'schema_version':SCHEMA_VERSION,'issued_at':issued.isoformat(),'expires_at':expires.isoformat()}
        g['grant_hash']=digest(g)
        self.db.execute('INSERT INTO write_grants VALUES(?,?,?,?,?,?,?,?,?,?)',
                        (g['grant_id'],w,s,operation,target,SCHEMA_VERSION,g['issued_at'],g['expires_at'],0,g['grant_hash']))
        self.db.commit(); return g

    def consume_write(self,grant_id,operation,target):
        r=self.db.execute('SELECT operation,target,expires_at,used FROM write_grants WHERE grant_id=?',(grant_id,)).fetchone()
        if not r: return False,'UNKNOWN_GRANT'
        if r[3]: return False,'GRANT_ALREADY_USED'
        if r[0]!=operation or r[1]!=target: return False,'SCOPE_MISMATCH'
        if datetime.fromisoformat(r[2])<=datetime.now(timezone.utc): return False,'GRANT_EXPIRED'
        self.db.execute('UPDATE write_grants SET used=1 WHERE grant_id=?',(grant_id,)); self.db.commit()
        return True,'AUTHORIZED'

    def checkpoint(self,w,s,state,evidence):
        last=self._last(w)
        if not last: raise RuntimeError('NO_EVENT_TO_CHECKPOINT')
        body={'work_id':w,'session_id':s,'last_event_id':last[2],'last_seq':last[0],
              'state':state,'evidence':evidence,'event_hash':last[1]}
        c={'checkpoint_id':new_id(),**body,'integrity_hash':digest(body),'created_at':now()}
        self.db.execute('INSERT INTO checkpoints VALUES(?,?,?,?,?,?,?,?,?)',(
            c['checkpoint_id'],w,s,last[2],last[0],canon(state),canon(evidence),c['integrity_hash'],c['created_at']))
        self.db.commit(); return c
