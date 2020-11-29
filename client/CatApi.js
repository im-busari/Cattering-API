const fetch = require('node-fetch');

class CatApi {
  constructor(config) {
    this.api_url = config.api_url;
  }

  request(endpoint = '', options = {}) {
    let url = this.api_url + endpoint;
    //  console.log(url);
    let headers = {
      'Content-type': 'application/json;charset=utf-8',
      Accept: 'application / json',
    };

    let config = {
      ...headers,
      ...options,
    };

    return fetch(url, config);
  }

  createCat(body) {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
    };
    return this.request('/register', options);
  }

  getAllMeows() {
    return this.request('/meows', {});
  }
  getSelfMeows(cat, key) {
    return this.request(`/my_meows/${cat}/${key}`, {});
  }

  createMeow(body, cat, key) {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
    };
    console.log(body);
    return this.request(`/meows/${cat}/${key}`, options);
  }

  deleteMeow(id, cat, key) {
    const options = {
      method: 'DELETE',
    };
    console.log(id.id);
    return this.request(`/meows/${parseInt(id.id)}/${cat}/${key}`, options);
  }
}

module.exports = CatApi;
