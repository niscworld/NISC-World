const BASE_URL = 'https://nisc-world-backend.onrender.com';

const ACCOUNTS_URL = `${BASE_URL}/accounts`

const API_URL = `${BASE_URL}/api/v1`;
const ACCOUNTS_API = `${ACCOUNTS_URL}/api`

const CONTACT_ENDPOINT = `${API_URL}/sendMail`;
const LOGIN_ENDPOINT = `${ACCOUNTS_API}/login`


// Export all
export {
  CONTACT_ENDPOINT,
  LOGIN_ENDPOINT
};