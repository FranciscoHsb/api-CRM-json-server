import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = import.meta.env.VITE_URL_API
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setClientes(resultado)
      } catch (error) {
        console.log(error);
      }
    }
    obtenerClientesApi()
  }, [])

  const handleEliminar = async (id) => {
    const url = `http://localhost:4000/clientes/${id}`
    const respuesta = await fetch(url,{
      method: 'DELETE'
    })
    await respuesta.json()
    const clientesActualizados = clientes.filter( cliente => cliente.id !== id)
    setClientes(clientesActualizados) 
  }

  return (
    <>
      <table className="w-full mt-5 table-auto shadow bg-white rounded-md">
        <thead>
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map((cliente) => (
              <Cliente
                key={cliente.id}
                cliente={cliente}
                handleEliminar = {handleEliminar}
              />
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Inicio