import axios from 'axios';
import { TOKEN_STORAGE_KEY } from './config';

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {

    paramsOrData._token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    
    // Old hard coded method
    // paramsOrData._token = ( // for now, hardcode token for "testing"
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc" +
    // "3RpbmciLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU1MzcwMzE1M30." +
    // "COmFETEsTxN_VfIlgIKw0bYJLkvbRQNgO1XCSE8NZ0U");

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData})).data;
        // axios sends query string data via the "params" key,
        // and request body data via the "data" key,
        // so the key we need depends on the HTTP verb
    }

    catch(err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
  
  /** Log user in and return token */
  static async logIn(formData) {
    const res = await this.request(`login`, formData, 'post');
    return res.token;
  }

  /** Create new user and return token */
  static async signUp(formData) {
    const optionalFormData = {
      username: formData.username,
      password: formData.password,
      first_name: formData.first_name || undefined,
      last_name: formData.last_name || undefined,
      email: formData.email || undefined
    }

    const res = await this.request(`users`, optionalFormData, 'post');
    return res.token;
  }
}

export default JoblyApi;