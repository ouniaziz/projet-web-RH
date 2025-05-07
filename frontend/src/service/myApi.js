import axios from 'axios';
class MyAPI {

  constructor(baseURL) {
    this._instance = axios.create({
      baseURL,
    });
    //TODO Check the problem with error.response, error is undefined
    this._instance.interceptors.response.use(
        response => response,
        error => {
          if (error.response.status === 401) {
            //TODO: Handle unauthorized (redirect to login)
            console.log("You ARE DISCONNECTED")
            //window.location.href = '/';
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
  async EditEnseignant(data) {
    try {
      const res = await this._instance.put(`/persons/update`, data);
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
 
  async AffecterEmploi(cin, formData) {
    return this._instance.put(`/persons/update/emploi/${cin}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  async GetEmploi(cin) {
    try {
      const res = await this._instance.get(`/persons/emploi/${cin}`, {
        responseType: 'arraybuffer',
        headers: {
          'Accept': 'application/pdf'
        }
      });
      return new Uint8Array(res.data);
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
}
export const myApi  =new MyAPI("http://localhost:8080/api");