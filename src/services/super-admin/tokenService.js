class TokenService {
  constructor() {
    this.TOKEN_KEY = "token";
    this.USER_ROLE_KEY = "userRole";
    this.PROFILE_KEY = "profile";
    this.USER_ID_KEY = "userId";
  }

  getToken() {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  getUserRole() {
    return sessionStorage.getItem(this.USER_ROLE_KEY);
  }

  setUserRole(role) {
    sessionStorage.setItem(this.USER_ROLE_KEY, role);
  }

  removeUserRole() {
    sessionStorage.removeItem(this.USER_ROLE_KEY);
  }

  getProfile() {
    const profile = sessionStorage.getItem(this.PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
  }

  setProfile(profile) {
    sessionStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile));
  }

  removeProfile() {
    sessionStorage.removeItem(this.PROFILE_KEY);
  }

  getUserId() {
    return sessionStorage.getItem(this.USER_ID_KEY);
  }

  setUserId(userId) {
    sessionStorage.setItem(this.USER_ID_KEY, userId);
  }

  removeUserId() {
    sessionStorage.removeItem(this.USER_ID_KEY);
  }

  clearAll() {
    this.removeToken();
    this.removeUserRole();
    this.removeProfile();
    this.removeUserId();
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new TokenService();
