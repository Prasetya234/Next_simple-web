import axios from 'axios'
import { useRouter } from 'next/router'
import { DeleteOrder, CreateOrder, UpdateOrder } from '../service/order'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

interface HomeProps {
  dataOrder: Array<any>
}
export default function Home({ dataOrder }: HomeProps) {
  const router = useRouter(),
    toast = useToast(),
    [loading, setLoading] = useState(false),
    [barangID, setBarangID] = useState(''),
    [barang, setBarang] = useState(''),
    [harga, setHarga] = useState(''),
    [modalType, setModalType] = useState('Add barang'),
    { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    const dataLogin = sessionStorage.getItem('DATA_USER')
    if (!dataLogin) {
      router.push('/login')
      message('Anda harus login terlebih dahulu', false)
    }
  }, [])
  const editOrder = (data: any) => {
    setModalType('Update barang')
    setBarangID(data.id)
    setBarang(data.barang)
    setHarga(data.harga)
    onOpen()
  }
  const addOrder = () => {
    setModalType('Add barang')
    setBarang('')
    setHarga('')
    onOpen()
  }
  const deleteOrder = async (id: number) => {
    setLoading(true)
    await DeleteOrder('/order', id)
    setLoading(false)
  }
  const saveOrder = async () => {
    setLoading(true)
    if (modalType === 'Add barang') {
      if (barang === '' || harga === '') {
        message('Form harus di isi semua', false)
        setLoading(false)
        return
      }
      const user = JSON.parse(sessionStorage.getItem('DATA_USER') || '{}')
      await CreateOrder(
        { barang: barang, harga: harga, pemilik: user.email },
        {
          'Content-Type': 'application/json'
        }
      )
    } else {
      if (barang === '' || harga === '') {
        message('Form harus di isi semua', false)
        setLoading(false)
        return
      }
      const user = JSON.parse(sessionStorage.getItem('DATA_USER') || '{}')
      await UpdateOrder(
        parseInt(barangID),
        { barang: barang, harga: harga, pemilik: user.email },
        {
          'Content-Type': 'application/json'
        }
      )
    }
    setLoading(false)
    setBarang('')
    setHarga('')
    onClose()
  }
  function message(des: string, tipe: boolean) {
    toast({
      description: `${des}`,
      position: 'top-right',
      status: `${tipe ? 'success' : 'error'}`,
      duration: 4000,
      isClosable: false
    })
  }
  return (
    <Layout title="Home">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalType}</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nama Barang</FormLabel>
              <Input
                placeholder="Nama Barang"
                value={barang}
                onChange={(e) => setBarang(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Harga</FormLabel>
              <Input
                placeholder="Harga"
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={saveOrder}
              isLoading={loading}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <br />
      <br />
      <div className="container card mt-5">
        <div className="row mt-3 mb-3">
          <div className="col-10">
            <Text fontSize="3xl">Order</Text>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-success"
              onClick={addOrder}
            >
              Tambah Barang
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Tangal Dibuat</th>
                <th scope="col">Harga</th>
                <th scope="col">Pemilik</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataOrder.map((order: any) => {
                return (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{order.barang}</td>
                    <td>{order.createAt}</td>
                    <td>
                      {'Rp. ' +
                        order.harga.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                    </td>
                    <td>{order.pemilik}</td>
                    <td>
                      <Button
                        colorScheme="blue"
                        onClick={() => editOrder(order)}
                      >
                        Edit
                      </Button>
                      &nbsp;
                      <Button
                        colorScheme="red"
                        isLoading={loading}
                        onClick={() => deleteOrder(order.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {dataOrder.length === 0 ? (
            <Text fontSize="2xl" align="center">
              Kosong
            </Text>
          ) : (
            ''
          )}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const dataOrder = await axios
    .get('https://test-dandan.herokuapp.com/order')
    .then((r) => r.data.content)
  return {
    props: {
      dataOrder
    }
  }
}
