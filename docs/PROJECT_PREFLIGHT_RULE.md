# Project Preflight Rule

สถานะ: REQUIRED  
ขอบเขต: ทุกงานในโปรเจกต์ Network-Configuration

## กฎบังคับก่อนเริ่มงาน

ก่อนเริ่มงานทุกครั้ง ต้องอ่านและทบทวนกฎการทำงานกลางของโครงการและฐานกลางที่เกี่ยวข้องก่อนลงมือทำ

ต้องตรวจอย่างน้อย:
- Project Goal
- Roadmap
- Current Node
- Current State
- Evidence ล่าสุด
- Error / Blocker
- Dependency
- ข้อจำกัดและ Protected Area ที่เกี่ยวข้อง

ห้ามเริ่มงานจากความจำ การคาดเดา หรือสถานะจากบทสนทนาเก่าเพียงอย่างเดียว

## Verification Gate

หากยังไม่ได้อ่านหรือยืนยันข้อมูลข้างต้น:
- ห้ามเริ่ม Implementation
- ห้าม Test
- ห้ามเปลี่ยน Roadmap
- ห้ามรายงานสถานะว่า VERIFIED / PASS / COMPLETE

ให้ใช้ UNKNOWN / UNVERIFIED จนกว่าจะตรวจฐานและ Evidence จริง

## Working Sequence

อ่านกฎและฐานกลาง
→ ตรวจ Evidence
→ กำหนด Working Route
→ ทำตาม Roadmap
→ ทำทีละ 1 Node
→ Verify
→ บันทึก Evidence
→ Update Central Database
→ ไป Node ถัดไป

กฎนี้เป็น Operational Preflight Gate และใช้ร่วมกับกฎการทำงานกลางฉบับเต็ม ไม่แทนที่กฎข้ออื่น
