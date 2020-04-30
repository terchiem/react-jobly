import axios from 'axios';
import { TOKEN_STORAGE_KEY, BASE_URL } from './config';

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {

    paramsOrData._token = window.localStorage.getItem(TOKEN_STORAGE_KEY);

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}/${endpoint}`,
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

  /** Get user data and return it */
  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Edit a user */
  static async editUser(username, formData) {
    const optionalFormData = {
      password: formData.password,
      first_name: formData.first_name || undefined,
      last_name: formData.last_name || undefined,
      email: formData.email || undefined,
      photo_url: formData.photo_url || undefined
    }
    const res = await this.request(`users/${username}`, optionalFormData, 'patch');
    return res.user;
  }

  /** Create application between job and user */
  static async applyForJob(jobId) {
    const res = await this.request(`jobs/${jobId}/apply`, {}, 'post');
    return res.message;
  }
}

export default JoblyApi;