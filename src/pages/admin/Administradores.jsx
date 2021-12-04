import React, { useEffect, useState } from 'react'
import API from 'axios/API'
import AdminTable from 'components/Admin/administradores/AdminTable'
import CardEditarAdmin from 'components/Admin/administradores/editarAdmin'
import CardDeshabilitarAdmin from 'components/Admin/administradores/deshabilitarAdmin'
import CardCrearAdmin from 'components/Admin/administradores/crearAdmin'
import PrivateRouteAdministradores from 'components/Admin/administradores/PrivateRouteAdministradores'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Administradores = () => {
    const [listAdministradores, setListAdministradores] = useState([])
    const [estadoBuscar, setEstadoBuscar] = useState(false)
    const [filtro, setFiltro] = useState('')

    const [deshabilitarAdmin, setDeshabilitarAdmin] = useState(false)
    const [crearAdmin, setCrearAdmin] = useState(false)
    const [editarAdmin, setEditarAdmin] = useState(false)
    const [dataAdminChange, setDataAdminChange] = useState({})

    useEffect(() =>{
        API.get('/keys/list')
        .then(response => {
            setListAdministradores(response.data)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])


    const filtrado = () => {
        return listAdministradores.filter(administrador => administrador.name.toLowerCase().includes(filtro.toLowerCase()))
    }

    const cambiarEstadoBuscar = () => {
        setEstadoBuscar(!estadoBuscar);
        
        if(estadoBuscar){//if se cancela "buscar" limpiamos el filtro
            setFiltro('')
            filtrado()
        }
    }

    const updateListAdmins = () => {
        API.get('/keys/list')
        .then(response => {
            setListAdministradores(response.data)
        })
        .catch(err => {
            console.error(err)
        })

        setDataAdminChange({})
    }

    const messageToast = (message, type) => {
        if(type === 'success'){
            toast.success(message)
        }else{
            toast.error(message)
        }
    }


    return (
        <PrivateRouteAdministradores >
            <div className="flex justify-center min-h-screen">


                {
                    deshabilitarAdmin
                    ?   <CardDeshabilitarAdmin
                            adminDataDisabled = {dataAdminChange}
                            setDeshabilitarAdmin = {setDeshabilitarAdmin}
                            updateListAdmins = {updateListAdmins}
                            setDataAdminChange = {setDataAdminChange}
                            messageToast={messageToast}
                        /> 
                    : null 
                }

                {
                    editarAdmin
                    ?   <CardEditarAdmin
                            adminDataEdit = {dataAdminChange}
                            setEditarAdmin = {setEditarAdmin}
                            updateListAdmins = {updateListAdmins}
                            setDataAdminChange = {setDataAdminChange}
                            messageToast={messageToast}
                        /> 
                    : null 
                }

                {
                    crearAdmin
                    ?   <CardCrearAdmin
                            setCrearAdmin = {setCrearAdmin}
                            updateListAdmins = {updateListAdmins}
                            setDataAdminChange = {setDataAdminChange}
                            messageToast={messageToast}
                        /> 
                    : null 
                }




                <div className="col-span-12">
                    <div className="max-w-full min-w-[340px] relative h-20 flex items-end">
                        <div className="flex justify-between w-full">
                            <span className="font-bold flex items-end mb-2">
                                Administradores: {filtrado().length}
                            </span>
                            <div className="flex items-end">
                                <div 
                                    className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                                    hidden={!estadoBuscar}
                                >
                                    <label 
                                        className="text-sm text-gray-500"
                                        hidden={!estadoBuscar}
                                    >
                                        Filtro
                                    </label>
                                    <input 
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                        type="text"
                                        name="filtro"
                                        placeholder="Filtrar nombre"
                                        value={filtro}
                                        onChange={(e) => {
                                            setFiltro(e.target.value);
                                        }}
                                        hidden={!estadoBuscar}
                                    />
                                </div>
                                <button 
                                    className="inline-flex items-center justify-center w-10 h-10 mr-2 mb-2 text-indigo-500 transition-colors duration-150 bg-gray-300 rounded-full focus:shadow-outline hover:bg-gray-400"
                                    onClick={cambiarEstadoBuscar}
                                >
                                    {
                                        estadoBuscar
                                        ?   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        :   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                    }

                                </button>
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded-full"
                                    onClick={() => setCrearAdmin(true)}
                                >
                                    Crear Administrador
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="overflow-auto lg:overflow-visible ">
                        <table className="table text-gray-400 border-separate space-y-6 text-sm shadow-2xl">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-3 text-center text-gray-800">Nombre</th>
                                    <th className="p-3 text-center text-gray-800">Apellidos</th>
                                    <th className="p-3 text-center text-gray-800">Email</th>
                                    <th className="p-3 text-center text-gray-800">Rol</th>
                                    <th className="p-3 text-center text-gray-800">Estado</th>
                                    <th className="p-3 text-center text-gray-800">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="overflow-y-auto">
                                {
                                    filtrado().map((admin) =>{
                                        return (
                                            <AdminTable
                                                key={admin._id}
                                                dataAdmin ={admin}
                                                setDeshabilitarAdmin = {setDeshabilitarAdmin}
                                                setEditarAdmin = {setEditarAdmin}
                                                setDataAdminChange = {setDataAdminChange}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <ToastContainer 
                    position="bottom-center"
                    autoClose={3000}
                />
            </div>
        </PrivateRouteAdministradores>
    )
}



export default Administradores
