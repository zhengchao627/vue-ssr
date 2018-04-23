import request from 'axios'

request.defaults.baseURL = 'http://localhost:8081/'

export const getUser = ({ commit, state }) => {
  return request.get('user/11').then((response) => {
    // if (response.statusText === 'OK') {
      commit('GET_USER', response.data)
    // }
  }).catch((error) => {
    console.log(error)
  })
}
