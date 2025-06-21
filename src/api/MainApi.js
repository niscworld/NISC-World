const DEVELOPMENT_MODE = !false;

class API {
  static DEVELOPMENT_MODE = DEVELOPMENT_MODE;

  static BASE_URL = API.DEVELOPMENT_MODE ? 'http://127.0.0.1:5000' : 'https://nisc-world-backend.onrender.com';

  static ACCOUNTS_URL = `${API.BASE_URL}/accounts`;

  static API_URL = `${API.BASE_URL}/api/v1`;
  static ACCOUNTS_API = `${API.ACCOUNTS_URL}/api`;

  static CONTACT_ENDPOINT = `${API.API_URL}/sendMail`;
  static LOGIN_ENDPOINT = `${API.ACCOUNTS_API}/login`;
  static LOGOUT_ENDPOINT = `${API.ACCOUNTS_API}/logout`;
  static REFRESH_TOKEN_ENDPOINT = `${API.ACCOUNTS_API}/refresh-token`;


  static INTERNSHIPS = `${API.BASE_URL}/internships`
  static INTERNSHIPS_API = `${API.INTERNSHIPS}/api`
  static GET_INTERNSHIPS = `${API.INTERNSHIPS_API}/get-internships`
  
  // Dashboard
  static DASHBOARD = `${API.BASE_URL}/dashboard`;
  static DASHBOARD_API = `${API.DASHBOARD}/api`;

  static DASHBOARD_DEVELOPER = `${API.DASHBOARD}/developer`;
  static DASHBOARD_DEVELOPER_ENDPOINT = `${API.DASHBOARD_DEVELOPER}/api`;

  static DEVELOPER_CREATE_USER = `${API.DASHBOARD_DEVELOPER_ENDPOINT}/create-user`;
  static DEVELOPER_CREATE_INTERNSHIP = `${API.DASHBOARD_DEVELOPER_ENDPOINT}/create-internship`;

}


// Export all
export default API;
