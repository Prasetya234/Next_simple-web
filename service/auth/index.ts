import { createStandaloneToast } from '@chakra-ui/react'
import axios from 'axios'

const api = 'https://web-production-7dfb.up.railway.app/'

interface User {
  id: number
  email: string
  password: string
  phoneNumber: string
}

const toast = createStandaloneToast()

export default async function Auth(reqUrl: string, req: object, json: object) {
  try {
    const res = await axios
      .post<User[], any>(`${api}` + `${reqUrl}`, req, json)
      .then((res) => res.data.content)
    message(`Selamat Datang ${res.email}`, true)
    sessionStorage.setItem('DATA_USER', JSON.stringify(res))
    return res
  } catch (error) {
    message('Opss! Akun tidak tersedia', false)
    return []
  }
}

export async function RegisterAuth(reqUrl: string, req: object, json: object) {
  try {
    const res = await axios
      .post<User[], any>(`${api}` + `${reqUrl}`, req, json)
      .then((res) => res.data.content)
    message(`Selamat Datang ${res.email}`, true)
    sessionStorage.setItem('DATA_USER', JSON.stringify(res))
    return res
  } catch (error) {
    message('Opss! Akun sudah digunakan', false)
    return []
  }
}

export async function DeleteOrder(reqUrl: string, req: number) {
  try {
    const res = await axios
      .delete(`${api}` + `${reqUrl}/` + req)
      .then((res) => res.data.content)
    message(`Delete order ${req}`, true)
    return res
  } catch (error) {
    message(`Tidak bisa menghapus order ${req}`, false)
    return []
  }
}

function message(msg: string, type: boolean) {
  toast({
    description: `${msg}`,
    position: 'top-right',
    status: `${type ? 'success' : 'error'}`,
    duration: 4000,
    isClosable: false
  })
}
