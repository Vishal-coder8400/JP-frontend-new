class TokenService {
  constructor() {
    this.TOKEN_KEY = "token";
    this.USER_ROLE_KEY = "userRole";
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getUserRole() {
    return localStorage.getItem(this.USER_ROLE_KEY);
  }

  setUserRole(role) {
    localStorage.setItem(this.USER_ROLE_KEY, role);
  }

  removeUserRole() {
    localStorage.removeItem(this.USER_ROLE_KEY);
  }

  clearAll() {
    this.removeToken();
    this.removeUserRole();
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new TokenService();
