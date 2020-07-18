import axios from 'axios'

export async function userLogin (loginInfo) {
  const res = await axios.post('/api/user/login', loginInfo)
  return res
}

export async function whoami () {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }
  const res = await axios.get('/api/user/whoami', {
    headers: {
      authorization: `bearer ${token}`
    }
  })
  return res.data.data
}

export function loginOut () {
  localStorage.removeItem('token')
}

export async function reg (userInfo) {
  const res = await axios.post('/api/user/reg', userInfo)
  return res.data
}
