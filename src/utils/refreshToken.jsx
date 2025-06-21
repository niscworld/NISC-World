// src/utils/refreshToken.js
import API from './../api/MainApi';

export async function refreshToken() {
  const user_id = localStorage.getItem('user_id');
  const old_token = localStorage.getItem('token');
  const refresh_token = localStorage.getItem('refresh_token');

  if (!user_id || !old_token || !refresh_token) {
    console.warn('[REFRESH TOKEN] Missing tokens');
    return { success: false, message: 'Missing tokens' };
  }

  try {
    const response = await fetch(API.REFRESH_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        jwt_token: old_token,
        refresh_token,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('expires_at', data.expires_at);
      return { success: true, message: 'Token refreshed', token: data.token };
    } else {
      console.warn('[REFRESH TOKEN FAILED]', data.message);
      localStorage.clear();
      return { success: false, message: data.message || 'Refresh failed' };
    }
  } catch (error) {
    console.error('[REFRESH TOKEN ERROR]', error);
    localStorage.clear();
    return { success: false, message: 'Network error during refresh' };
  }
}
