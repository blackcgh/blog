import originAxios from 'axios'

export default function axios(config) {
  return new Promise((resolve, reject) => {
    const instance = originAxios.create({
      baseURL: 'http://localhost/api',
      headers:{'Content-Type':'application/json'},
      timeout: 5000
    })

    instance.interceptors.request.use(config => {
      return config;
    }, err => {
      return err;

    })

    instance.interceptors.response.use(res => {
      return res.data;
    }, err => {
      return err;
    })

    instance(config).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}
