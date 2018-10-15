import axios from 'axios'
const baseUrl = 'http://m.gjw.com/'
let filterUrl = (_url) => {
  if (_url && _url.startsWith('http')) {
    return _url;
  }
  return baseUrl + _url;
}


export default {
  get(_url, _params = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: filterUrl(_url),
        method: 'get',
        params: _params
      }).then((res) => {
        resolve(res.data);
      }).catch((error) => {
        reject(error);
      })
    })
  },
  post(_url, _params = {}) {

    return new Promise((resolve, reject) => {
      axios({
        url: filterUrl(_url),
        method: 'post',
        data: _params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "auth": window.localStorage.getItem('token')
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}