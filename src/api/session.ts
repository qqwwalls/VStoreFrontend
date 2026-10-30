import type { AuthSession } from '../types/backend';

const SESSION_KEY = 'vstore.auth.v1';
export const SESSION_CHANGED = 'vstore:session-changed';

export function readSession(): AuthSession | null {
  try {
    const session: AuthSession | null = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    return session && typeof session.accessToken === 'string' && typeof session.refreshToken === 'string'
      && typeof session.user?.id === 'string' ? session : null;
  } catch {
    return null;
  }
}

export function saveSession(session: AuthSession | null) {
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent(SESSION_CHANGED, { detail: session }));
}
