const DEVELOPMENT_MODE = false;

class API {
  static DEVELOPMENT_MODE = DEVELOPMENT_MODE;
  static BASE_URL = API.DEVELOPMENT_MODE ? 'http://127.0.0.1:5000' : 'https://nisc-world-backend.onrender.com';
  static ACCOUNTS_URL = `${API.BASE_URL}/accounts`;
  static API_URL = `${API.BASE_URL}/api/v1`;
  static ACCOUNTS_API = `${API.ACCOUNTS_URL}/api`;
  static CONTACT_ENDPOINT = `${API.API_URL}/sendMail`;
  static LOGIN_ENDPOINT = `${API.ACCOUNTS_API}/login`;
}  


// Export all
export default API;
