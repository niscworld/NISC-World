// src/utils/logout.js
import API from './../api/MainApi.js';

export async function logout() {
  const user_id = localStorage.getItem('user_id');
  const jwt_token = localStorage.getItem('token');

  if (!user_id || !jwt_token) {
    localStorage.clear();
    return { success: false, message: "No active session found" };
  }

  try {
    const response = await fetch(API.LOGOUT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, jwt_token }),
    });

    const data = await response.json();

    localStorage.clear(); // Clear tokens in all cases

    if (response.ok) {
      return { success: true, message: data.message || "Logged out successfully" };
    } else {
      return { success: false, message: data.message || "Logout failed" };
    }
  } catch (err) {
    console.error('[LOGOUT ERROR]', err);
    localStorage.clear();
    return { success: false, message: "Logout error occurred" };
  }
}
