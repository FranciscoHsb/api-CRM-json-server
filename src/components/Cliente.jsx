import { useNavigate } from 'react-router-dom'

const Cliente = ({ cliente, handleEliminar }) => {
  const { nombre, telefono, empresa, email, notas, id } = cliente

  const navigate = useNavigate()

 


  return (
    <tr className="border-b-2 hover:bg-gray-50">
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p><span className="text-gray-800 uppercase font-bold">E-mail:{' '}</span>{email}</p>
        <p><span className="text-gray-800 uppercase font-bold">Tel: {' '}</span>{telefono}</p>

      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs mt-3 rounded-sm"
          onClick={ () => navigate(`/clientes/${id}`)}
        >Ver</button>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 block w-full text-white p-2 uppercase font-bold text-xs mt-3 rounded-sm"
          onClick={ () => navigate(`/clientes/editar/${id}`)}
        >Editar</button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-600 block w-full text-white p-2 uppercase font-bold text-xs mt-3 rounded-sm"
          onClick = { () => {handleEliminar(id)} }
        >Eliminar</button>
      </td>
    </tr>
  )
}

export default Cliente