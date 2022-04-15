import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {

  const { id } = useParams()
  const navigate = useNavigate()
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
    cargando ? <Spinner /> :
      Object.keys(cliente).length === 0 ? <p>No hay cliente</p> : (
        <>
          <div className="text-gray-700">
            {//!cargando && (
              <>
                <h1 className="font-black text-4xl text-blue-900">Ver Cliente: {cliente.nombre}</h1>
                <p className="text-xl mt-3">Informacion del Cliente</p>
                {cliente.nombre && (
                  <p className="text-xl mt-10 mb-3"><span className="uppercase font-bold">Cliente:{' '}</span>{cliente.nombre}</p>
                )}
                {cliente.email && (
                  <p className="text-xl mb-3"><span className="uppercase font-bold">e-mail:{' '}</span>{cliente.email}</p>
                )}
                <p className="text-xl mb-3"><span className="uppercase font-bold">telefono:{' '}</span>{cliente.telefono}</p>
                {cliente.empresa && (
                  <p className="text-xl mb-3"><span className="uppercase font-bold">empresa:{' '}</span>{cliente.empresa}</p>
                )}
                {cliente.notas && (
                  <p className="text-xl mb-3"><span className="uppercase font-bold">notas:{' '}</span>{cliente.notas}</p>
                )}
              </>
              //)
            }
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 block w-full text-white p-2 uppercase font-bold text-xs mt-3 rounded-sm"
            onClick={() => navigate(`/clientes/editar/${id}`)}
          >Editar</button>
        </>
      )
  )
}

export default VerCliente