import axios from 'axios';
class MyAPI {
  constructor(baseURL) {
    this._instance = axios.create({
      baseURL,
    });

    // interceptor for adding Auth headers
    this._instance.interceptors.request.use(config => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.log('No token found in localStorage');
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });

    // interceptor for handling refresh token
    // Response Interceptor: Handle token refresh
    this._instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { response } = error;
        const originalRequest = error.config|| {};

        // Check for token expiration
        if (response && response.status === 401 && response.data === 'Token expired') {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const refreshResponse = await axios.post(`${baseURL}/auth/refresh`, {
                refreshToken
              });

              const { newAccessToken, newRefreshToken } = refreshResponse.data;

              // Save the new tokens
              localStorage.setItem('accessToken', newAccessToken);
              localStorage.setItem('refreshToken', newRefreshToken);

              // Retry the original request with the new access token
              if (originalRequest.headers) {
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              } else {
                originalRequest.headers = { 'Authorization': `Bearer ${newAccessToken}` };
              }
              console.log("Token refreshed")
              return this._instance.request(originalRequest);
            } catch (refreshError) {
              console.error('Token refresh failed:', refreshError);

              this.logout();
              throw RefreshTokenErrorFct("Invalid Refresh Token");
            }
          } else {
            console.log('No refresh token found in localStorage');
            this.logout();
            throw RefreshTokenErrorFct("No refresh token found")
          }
        }

        return Promise.reject(error);
      }
    );
  }
  async login(username, password){
    try {
      const response = await this._instance.post('/api/users/login', { username, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('role', response.data.userRole);

    } catch (error) {
      // console.error("Error performing login operation", error);
      throw error;
    }
  }

  async getEnseignants(){
    try{
      const res = await this._instance.get("/persons/enseignant")
      return res.data
    }catch(e){
      // console.error("Error while fetching records", e)
      return e
    }
  }
  async addEnseignant(data) {
    try {
      const res = await this._instance.post("/persons", data);
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  

  logout(){
    // Clear tokens from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
  }
}
export const myApi  =new MyAPI("http://localhost:8080/api");