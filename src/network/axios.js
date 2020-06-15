import originAxios from 'axios'

export default function axios(config) {
  return new Promise((resolve, reject) => {
    const instance = originAxios.create({
      baseURL: '/api',
      headers:{'Content-Type':'application/json'},
      withCredentials: true,
      timeout: 5000
    })

    // instance.interceptors.request.use(config => {
    //   return config;
    // }, err => {
    //   return err;

    // })

    instance.interceptors.response.use(res => {
      return res.data;
    }, err => {
      return err;
    })

    instance(config).then(res => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    }).catch(err => {
      reject(err);
    })
  })
}
