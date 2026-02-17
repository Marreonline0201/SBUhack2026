// API URL: env var, or infer from host
function getApiUrl() {
  if (process.env.REACT_APP_API_URL) return process.env.REACT_APP_API_URL;
  if (typeof window === 'undefined') return '/api';
  if (window.location.port === '3000') return 'http://localhost:5000/api';
  // Same origin on Render
  if (window.location.hostname === 'sbuhack2026.onrender.com') return '/api';
  // GitHub Pages / custom domain: must use full Render API URL
  const RENDER_API = 'https://sbuhack2026.onrender.com/api';
  if (/marreonline0201\.github\.io|betwithfriends0216\.com/.test(window.location.hostname)) return RENDER_API;
  return '/api';
}
const API_URL = getApiUrl();
// Base URL for OAuth redirects (without /api)
function getApiBase() {
  if (typeof window === 'undefined') return '';
  const url = getApiUrl();
  if (url.startsWith('http')) return url.replace(/\/api\/?$/, '');
  return window.location.origin;
}
const API_BASE = getApiBase();

function getToken() {
  return localStorage.getItem('token');
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  } catch (err) {
    throw new Error(err.message || 'Network error - check if the server is running');
  }
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  auth: {
    signup: (email, password, name) =>
      request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      }),
    login: (email, password) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: () => request('/auth/me'),
    forgotPassword: (email) =>
      request('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    resetPassword: (token, password) =>
      request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
      }),
    oauthUrl: (provider) => `${API_BASE}/api/auth/${provider}`,
  },
  groups: {
    list: () => request('/groups'),
    get: (id) => request(`/groups/${id}`),
    create: (name) =>
      request('/groups', {
        method: 'POST',
        body: JSON.stringify({ name }),
      }),
    addMember: (groupId, email) =>
      request(`/groups/${groupId}/members`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    removeMember: (groupId, userId) =>
      request(`/groups/${groupId}/members/${userId}`, { method: 'DELETE' }),
    delete: (id) => request(`/groups/${id}`, { method: 'DELETE' }),
  },
  games: {
    list: (groupId) => request(`/games/group/${groupId}`),
    create: (name, groupId) =>
      request('/games', {
        method: 'POST',
        body: JSON.stringify({ name, groupId }),
      }),
    delete: (id) => request(`/games/${id}`, { method: 'DELETE' }),
  },
  bets: {
    list: (gameId) => request(`/bets/game/${gameId}`),
    create: (gameId, description) =>
      request('/bets', {
        method: 'POST',
        body: JSON.stringify({ gameId, description }),
      }),
    delete: (id) => request(`/bets/${id}`, { method: 'DELETE' }),
  },
  wins: {
    list: (gameId) => request(`/wins/game/${gameId}`),
    leaderboard: (gameId) => request(`/wins/game/${gameId}/leaderboard`),
    add: (gameId, userId) =>
      request('/wins', {
        method: 'POST',
        body: JSON.stringify({ gameId, userId }),
      }),
    delete: (id) => request(`/wins/${id}`, { method: 'DELETE' }),
  },
};
