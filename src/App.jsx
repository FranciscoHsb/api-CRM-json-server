import { useState } from 'react'
import { BrowserRouter, Routes, Route }from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente'
import EditarCliente from './paginas/EditarCliente'
import Usuario from './paginas/Usuario'
import VerCliente from './paginas/VerCliente'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout/>}>
          <Route index element={<Inicio/>}/>
          <Route path="nuevo" element={<NuevoCliente/>}/>
          <Route path="editar/:id" element={<EditarCliente/>}/>
          <Route path=":id" element={<VerCliente/>}/>
        </Route>
        <Route path="/perfil" element={<Layout/>}>
          <Route index/* path="usuario" */ element={<Usuario/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
