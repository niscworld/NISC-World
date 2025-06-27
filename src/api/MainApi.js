const DEVELOPMENT_MODE = !false;

class API {
  static DEVELOPMENT_MODE = DEVELOPMENT_MODE;

  static BASE_URL = API.DEVELOPMENT_MODE ? 'http://127.0.0.1:5000' : 'https://nisc-world-backend.onrender.com';

  static WHOAMI = `${API.BASE_URL}/api/whoami`

  static IS_SERVER_ON = `${API.BASE_URL}/is_server_on`

  static ACCOUNTS_URL = `${API.BASE_URL}/accounts`;

  static API_URL = `${API.BASE_URL}/api/v1`;
  static ACCOUNTS_API = `${API.ACCOUNTS_URL}/api`;

  static CONTACT_ENDPOINT = `${API.API_URL}/sendMail`;
  static LOGIN_ENDPOINT = `${API.ACCOUNTS_API}/login`;
  static LOGOUT_ENDPOINT = `${API.ACCOUNTS_API}/logout`;
  static REFRESH_TOKEN_ENDPOINT = `${API.ACCOUNTS_API}/refresh-token`;

  static VIEW_PROFILE = `${API.ACCOUNTS_API}/view-profile`;
  static EDIT_PROFILE = `${API.ACCOUNTS_API}/edit-profile`;
  static CHANGE_PASSWORD = `${API.ACCOUNTS_API}/change-password`;

  static SEND_OTP = `${API.ACCOUNTS_API}/send-otp`;
  static VERIFY_OTP = `${API.ACCOUNTS_API}/verify-otp`;

  static INTERNSHIPS = `${API.BASE_URL}/internships`
  static INTERNSHIPS_API = `${API.INTERNSHIPS}/api`
  static GET_INTERNSHIPS = `${API.INTERNSHIPS_API}/get-internships`
  static APPLY_INTERNSHIP = `${API.INTERNSHIPS_API}/apply-internship`
  static ACCEPT_INTERNSHIP = `${API.INTERNSHIPS_API}/accept-internship`
  static REJECT_INTERNSHIP = `${API.INTERNSHIPS_API}/reject-internship`
  static SEND_MESSAGE_TO_INTERN = `${API.INTERNSHIPS_API}/send-message-to-intern`
  
  // Dashboard
  static DASHBOARD = `${API.BASE_URL}/dashboard`;
  static DASHBOARD_API = `${API.DASHBOARD}/api`;

  static DASHBOARD_DEVELOPER = `${API.DASHBOARD}/developer`;
  static DASHBOARD_DEVELOPER_ENDPOINT = `${API.DASHBOARD_DEVELOPER}/api`;

  static DEVELOPER_CREATE_USER = `${API.DASHBOARD_DEVELOPER_ENDPOINT}/create-user`;
  static DEVELOPER_CREATE_INTERNSHIP = `${API.DASHBOARD_DEVELOPER_ENDPOINT}/create-internship`;

  static DASHBOARD_HR = `${API.DASHBOARD}/hr`;
  static DASHBOARD_HR_ENDPOINT = `${API.DASHBOARD_HR}/api`;
  

}


// Export all
export default API;
