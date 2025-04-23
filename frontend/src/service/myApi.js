import axios from 'axios';
class MyAPI {

  constructor(baseURL) {
    this._instance = axios.create({
      baseURL,
    });
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
}

MyAPI.REFRESH_TOKEN= "a3k5X9pLmQ2vR7sN1tY8";
MyAPI.ACCESS_TOKEN="rT9f4xW6zP8qL3nB5vM7";

export const myApi  =new MyAPI("http://localhost:8080/api");