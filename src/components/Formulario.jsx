import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Spinner from './Spinner'

const Formulario = ({ cliente, cargando }) => {


  const navigate = useNavigate()
  //const urlActual = useLocation().pathname

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre es muy corto')
      .max(20, 'El nombre es muy largo')
      .required('El nombre del cliente es obligatorio'),
    empresa: Yup.string().required('Nombre de la Empresa es obligatorio!'),
    email: Yup.string().email('Email no valido!').required('El Email es obligatorio!'),
    telefono: Yup.number('no es un numero')
      .positive('El numero no es positivo')
      .integer('El numero no es entero')
      .typeError('El Numero no es valido'),
    notas: ''
  })

  const handleSubmit = async (val) => {
    try {
      let respuesta
      if (cliente.id) {
        console.log('editando');
        const url = `http://localhost:4000/clientes/${cliente.id}`
        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(val),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else {
        console.log('agregando');
        const url = 'http://localhost:4000/clientes'
        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(val),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      await respuesta.json()
      navigate('/clientes')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    cargando ? <Spinner /> :
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto border- ">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
          {cliente.nombre ? "Editar cliente" : "Agregar cliente"}
        </h1>
        <Formik
          initialValues={{
            nombre: cliente?.nombre ?? "",  // cliente.nombre ? cliente.nombre : ""
            empresa: cliente?.empresa ?? "",
            email: cliente?.email ?? "",
            telefono: cliente?.telefono ?? "",
            notas: cliente?.notas ?? ""
          }}
          enableReinitialize={true}
          onSubmit={async (val, { resetForm }) => {
            await handleSubmit(val)
            resetForm()
          }}

          validationSchema={nuevoClienteSchema}
        >
          {({ errors, touched }) => { //data: variable con mucha informacion de Formik 
            return (
              <Form>
                <div>
                  <div className="mb-4">
                    <label
                      className="text-gray-800"
                      html="nombre"
                    >Nombre: </label>
                    <Field
                      id="nombre"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="Nombre del Cliente"
                      name="nombre"
                    />
                  </div>
                  {errors.nombre && touched.nombre ? (
                    <div className="text-center my-4 text-white bg-red-600 font-bold p-3 uppercase">
                      {errors.nombre}
                    </div>
                  ) : null
                  }

                  <div className="mb-4">
                    <label
                      className="text-gray-800"
                      html="empresa"
                    >Empresa: </label>
                    <Field
                      id="empresa"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="Empresa del Cliente"
                      name="empresa"
                    />
                  </div>
                  {errors.empresa && touched.empresa ? (
                    <div className="text-center my-4 text-white bg-red-600 font-bold p-3 uppercase">
                      {errors.empresa}
                    </div>
                  ) : null
                  }

                  <div className="mb-4">
                    <label
                      className="text-gray-800"
                      html="email"
                    >E-mail: </label>
                    <Field
                      id="email"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="Email del Cliente"
                      name="email"
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <div className="text-center my-4 text-white bg-red-600 font-bold p-3 uppercase">
                      {errors.email}
                    </div>
                  ) : null
                  }

                  <div className="mb-4">
                    <label
                      className="text-gray-800"
                      html="telefono"
                    >Telefono: </label>
                    <Field
                      id="telefono"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50"
                      placeholder="Telefono del Cliente"
                      name="telefono"
                    />
                  </div>
                  {
                    //errors.telefono && touched.telefono ? console.log(errors.telefono) : null
                    errors.telefono && touched.telefono ? (
                      
                      <div className="text-xs pl-3 ">
                        <p><span className="text-red-500">*</span> El numero no pueden ser letras</p>
                        <p><span className="text-red-500">*</span> El numero tiene que ser positivo (mayor que 0)</p>
                      </div>
                    ) : null
                  }

                  <div className="mb-4">
                    <label
                      className="text-gray-800"
                      html="notas"
                    >Notas: </label>
                    <Field
                      as="textarea"
                      id="notas"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50 h-40"
                      placeholder="Notas del Cliente"
                      name="notas"
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value={cliente.nombre ? "Editar cliente" : "Agregar cliente"}
                  className=" mt-5 w-full bg-blue-800 p-3 text-white font-bold text-lg"
                />

              </Form>)
          }}
        </Formik>
      </div>
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario