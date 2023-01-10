import axios from 'axios'
import { createStandaloneToast } from '@chakra-ui/react'

const api = 'https://web-production-7dfb.up.railway.app/'
const toast = createStandaloneToast()

export async function DeleteOrder(reqUrl: string, req: number) {
  try {
    const res = await axios
      .delete(`${api}` + `${reqUrl}/` + req)
      .then((res) => res.data.content)
    message(`Delete order ${req}`, true)
    window.location.reload()
    return res
  } catch (error) {
    message(`Tidak bisa menghapus order ${req}`, false)
    return []
  }
}

export async function CreateOrder(req: object, type: object) {
  try {
    const res = await axios
      .post(`${api}/order`, req, type)
      .then((res) => res.data.content)
    message(`Create order success ${res.barang}`, true)
    window.location.reload()
    return res
  } catch (error) {
    message(`Tidak bisa membuat order`, false)
    return []
  }
}

export async function UpdateOrder(id: number, req: object, type: object) {
  try {
    const res = await axios
      .put(api + 'order/' + id, req, type)
      .then((res) => res.data.content)
    message(`Update order success ${res.barang}`, true)
    window.location.reload()
    return res
  } catch (error) {
    message(`Tidak bisa mengupdate order ${id}`, false)
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
