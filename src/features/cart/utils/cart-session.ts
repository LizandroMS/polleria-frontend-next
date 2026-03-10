const SESSION_KEY = 'polleria_session_id';

export function getOrCreateSessionId() {
  if (typeof window === 'undefined') return null;

  let sessionId = localStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}

export function getSessionId() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SESSION_KEY);
}