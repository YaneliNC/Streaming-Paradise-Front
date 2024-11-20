import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './AdminTemplate.css';
import AdminSidebar from '../admin/AdminSidebar';
import AdminNav from '../admin/AdminNav';
import ProtectedRoute from '../ProtectedRoute';
import ListadoUsuarioComponent from '../components/ListadoUsuarioComponent/ListadoUsuarioComponent';
import EditUsuarioComponent from '../components/EditUsuarioComponent/EditUsuarioComponent';
import PermisoComponent from '../components/PermisoComponent/PermisoComponent';
import RolComponent from '../components/RolComponent/RolComponent';
import RolXPermisoComponent from '../components/RolXPermisoComponent/RolXPermisoComponent'
import RegistroUserComponent from '../components/RegistroUserComponent/RegistroUserComponent';
import ListadoProductosComponent from '../components/ListadoProductosComponent/ListadoProductosComponent';
import RegistroProductoComponent from '../components/RegistroProductoComponent/RegistroProductoComponent';
import EditarProductoComponent from '../components/EditarProductoComponent/EditarProductoComponent';
import ListadoComprasComponent from '../components/ListadoComprasComponent/ListadoComprasComponent';
import RegistroPermisoComponent from '../components/RegistroPermisoComponent/RegistroPermisoComponent';
import EditarPermisoComponent from '../components/EditarPermisoComponent/EditarPermisoComponent';
import RegistroRolComponent from '../components/RegistroRolComponent/RegistroRolComponent';
import EditarRolComponent from '../components/EditarRolComponent/EditarRolComponent';
import ListadoCuponesComponent from '../components/ListadoCuponesComponent/ListadoCuponesComponent';
import RegistroCuponComponent from '../components/RegistroCuponComponent/RegistroCuponComponent';
import EditarCuponComponent from '../components/EditarCuponComponent/EditarCuponComponent';
import OfertaComponent from '../components/OfertaComponent/OfertaComponent';
import RegistroOfertaComponent from '../components/RegistroOfertaComponent/RegistroOfertaComponent';
import EditarOfertaComponent from '../components/EditarOfertaComponent/EditarOfertaComponent';
import DashboardComponent from '../components/DashboardComponent/DashboardComponent';
import ListadoCatalogoComponent from '../components/ListadoCatalogoComponent/ListadoCatalogoComponent';
import ListadoComentComponent from '../components/ListadoComentComponent/ListadoComentComponent';

const AdminTemplate = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminNav />
        <div className="admin-container">
          <Routes>
          <Route path="/" element={<ProtectedRoute element={<DashboardComponent/>} requiredRoles={[1]} />} />
          <Route path="usuarios/listado" element={<ProtectedRoute element={<ListadoUsuarioComponent/>} requiredRoles={[1]} />} />
          <Route path="usuarios/editar/:id"  element={<ProtectedRoute element={<EditUsuarioComponent/>} requiredRoles={[1]} />} />
          <Route path="permisos/editar/:id" element={<ProtectedRoute  element={<EditarPermisoComponent/>} requiredRoles={[1]} />} />
          <Route path="subscriptions/edit/:id" element={<ProtectedRoute  element={<EditarProductoComponent/>} requiredRoles={[1]} />} />
          <Route path="ofertas/editar/:id"  element={<ProtectedRoute element={<EditarOfertaComponent/>} requiredRoles={[1]} />} />
          <Route path="cupones/editar/:id" element={<ProtectedRoute  element={<EditarCuponComponent/>} requiredRoles={[1]} />} />
          <Route path="roles/editar/:id" element={<ProtectedRoute  element={<EditarRolComponent/>} requiredRoles={[1]} />} />
          <Route path="permisos/listado" element={<ProtectedRoute  element={<PermisoComponent/>} requiredRoles={[1]} />} />
          <Route path="roles/listado" element={<ProtectedRoute  element={<RolComponent/>} requiredRoles={[1]} />} />
          <Route path="rolxpermiso/listado/:idrol" element={<ProtectedRoute  element={<RolXPermisoComponent/>} requiredRoles={[1]} />} />
          <Route path="usuarios/agregar"  element={<ProtectedRoute element={<RegistroUserComponent/>} requiredRoles={[1]} />} />
          <Route path="permisos/agregar" element={<ProtectedRoute  element={<RegistroPermisoComponent/>} requiredRoles={[1]} />} />
          <Route path="oferta/agregar"  element={<ProtectedRoute element={<RegistroOfertaComponent/>} requiredRoles={[1]} />} />
          <Route path="cupones/agregar" element={<ProtectedRoute  element={<RegistroCuponComponent/>} requiredRoles={[1]} />} />
          <Route path="roles/agregar" element={<ProtectedRoute element={<RegistroRolComponent/>} requiredRoles={[1]} />} />
          <Route path="productos/listado" element={<ProtectedRoute  element={<ListadoProductosComponent/>} requiredRoles={[1]} />} />
          <Route path="sub/agregar" element={<ProtectedRoute element={<RegistroProductoComponent/>} requiredRoles={[1]} />} />
          <Route path="movies/editar/:id" element={<ProtectedRoute element={<EditarProductoComponent/>} requiredRoles={[1]} />} />
          <Route path="compras/listado" element={<ProtectedRoute element={<ListadoComprasComponent/>} requiredRoles={[1]} />} />
          <Route path="cupones/listado" element={<ProtectedRoute element={<ListadoCuponesComponent/>} requiredRoles={[1]} />} />
          <Route path="ofertas/listado" element={<ProtectedRoute element={<OfertaComponent/>} requiredRoles={[1]} />} />
          <Route path="catalogo/listado" element={<ProtectedRoute element={<ListadoCatalogoComponent/>} requiredRoles={[1]} />} />
          <Route path="comentarios/listado" element={<ProtectedRoute element={<ListadoComentComponent/>} requiredRoles={[1]} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminTemplate;
