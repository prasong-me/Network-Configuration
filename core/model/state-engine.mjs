/**
 * Core Model State Engine
 *
 * Pure state-machine logic. No target adapter or runtime integration.
 * Contract v2.1 invariant:
 *   FAILED + unhandled error => BLOCKED.
 */

export const PROCESSING_STATUS = Object.freeze({
  IDLE: 'IDLE',
  PROCESSING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  BLOCKED: 'BLOCKED'
});

const TRANSITIONS = Object.freeze({
  IDLE: new Set(['PROCESSING']),
  PROCESSING: new Set(['SUCCESS', 'FAILED']),
  FAILED: new Set(['BLOCKED']),
  SUCCESS: new Set([]),
  BLOCKED: new Set([])
});

export function createStateEngine(initialStatus = PROCESSING_STATUS.IDLE) {
  if (!Object.hasOwn(PROCESSING_STATUS, initialStatus)) {
    throw new TypeError(`Unknown processing status: ${initialStatus}`);
  }

  let status = initialStatus;

  return Object.freeze({
    getStatus() {
      return status;
    },

    transition(nextStatus) {
      if (!Object.hasOwn(PROCESSING_STATUS, nextStatus)) {
        throw new TypeError(`Unknown processing status: ${nextStatus}`);
      }

      const allowed = TRANSITIONS[status];
      if (!allowed.has(nextStatus)) {
        throw new Error(`Invalid state transition: ${status} -> ${nextStatus}`);
      }

      status = nextStatus;
      return status;
    },

    fail({ unhandledError = false } = {}) {
      if (status !== PROCESSING_STATUS.PROCESSING) {
        throw new Error(`Failure can only be recorded from PROCESSING, got ${status}`);
      }

      status = PROCESSING_STATUS.FAILED;

      if (unhandledError) {
        status = PROCESSING_STATUS.BLOCKED;
      }

      return status;
    }
  });
}
