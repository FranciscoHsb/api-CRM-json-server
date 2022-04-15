import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'
//import Spinner from '../components/Spinner'

const EditarCliente = () => {

  const { id } = useParams()
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    setCargando(true)
    const consultarClienteId = async () => {
      const url = `http://localhost:4000/clientes/${id}`
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      setCliente(resultado)
      setCargando(false)
    }
    consultarClienteId()
  }, [])



  return (
    <>
      {cliente.nombre ?
        <>
          <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
          <p className="text-xl mt-3">Utiliza este formulario para editar los datos de un cliente</p>
          <Formulario
            cliente={cliente}
            cargando={cargando}
          />
        </>
        : <p>Cliente no Encontrado</p>
      }
    </>
  )
}

export default EditarCliente