import axios from 'axios';
class MyAPI {

  constructor(baseURL) {
    this._instance = axios.create({
      baseURL,
    });
    //TODO Check the problem with error.response, error is undefined
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
          if (response.data && response.data.status === 401 && response.data.data === 'Token expired') {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              try {
                const refreshResponse = await axios.post(`${baseURL}/users/refresh`, {
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
                throw new Error("Invalid Refresh Token");
              }
            } else {
              console.log('No refresh token found in localStorage');
              throw new Error("No refresh token found");
            }
          }

          return Promise.reject(error);
        }
    );
  }
  async login(username, password){
    try {
      const response = await this._instance.post('/users/login', { username, password });
      return response.data
    } catch (error) {
      // console.error("Error performing login operation", error);
      throw error;
    }
  }

  async logout(){
    await this._instance.post('/users/logout');
    // TODO: Change this LOG OUT
    console.log("YOU ARE LOGGED OUT!!!!")
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
  async deleteEnseignant(cin) {
    try {
      const res = await this._instance.delete(`/persons/${cin}`);
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getPerson(cin) {
    try {
      const res = await this._instance.get(`/persons/${cin}`);
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getGrades() {
    try {
      const res = await this._instance.get(`/params/grad`);
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getHandicaps() {
    try {
      const res = await this._instance.get(`/params/handicap`);
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async addHandicap(handicap) {
    try {
      const res = await this._instance.post(`/params/handicap`, handicap);
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async activateAccount(activationRequest){
    try{
      const res = await this._instance.put("/users/activate", activationRequest)
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }

  async resetPassword(resetRequest){
    try{
      const res = await this._instance.put("/users/reset-password", resetRequest)
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }

  async forgotPassword(email){
    try{
      const res = await this._instance.put(`/users/forgot-password/${email}`)
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }

  async getTypesConges(){
    try{
      const res = await this._instance.get("/conges/type")
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }

  async getDemandesConges(){
    try{
      const res = await this._instance.get("/conges/demande")
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }

  async getDemandesCongesByCin(cin){
    try{
      const res = await this._instance.get(`/conges/demande/${cin}`)
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }

  async getDateFinRetour(dateDebutDuree){
    try{
      const res = await this._instance.post("/conges/dateFinRetour", dateDebutDuree)
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }

  async addDemandeConge(demandeConge){
    try{
      const res = await this._instance.post("/conges/demande", demandeConge)
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }

  async acceptDemande(demandeId){
    try{
      const res = await this._instance.put(`/conges/demande/accept/${demandeId}`)
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }

  async refuseDemande(demandeId){
    try{
      const res = await this._instance.put(`/conges/demande/refuse/${demandeId}`)
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }

  async fetchEtatConge(cin){
    try{
      const res = await this._instance.get(`/conges/${cin}`)
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }

  async addDemandeSolde(demande) {
    try{
      const res = await this._instance.post(`/conges/ajout_solde`, demande)
      return res.data;
    }catch(err){
      return Promise.reject(err)
    }
  }
}
export const myApi  =new MyAPI("http://localhost:8080/api");