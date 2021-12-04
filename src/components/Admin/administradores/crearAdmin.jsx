import React, { useState } from 'react'
import API from 'axios/API';

const CardCrearAdmin = ({setCrearAdmin, setDataAdminChange, updateListAdmins, messageToast}) => {

    const [adminData, setAdminData] = useState({
        name: '',
        apellidos: '',
        email: '',
        password: '',
        rol: 'Administrador',
        estado: 'true',
    })



    const handleChange = (event) => {
        setAdminData({
            ...adminData,
            [event.target.name]: event.target.value
        });
    }

    const cancelCrearAdmin = () => {
        setCrearAdmin(false)
        setDataAdminChange({})
    }

    const crearAdmin = () => {
        // const localToken = localStorage.getItem('token')
        if(adminData.name && adminData.apellidos && adminData.email && adminData.password && adminData.rol && adminData.estado){

            let bodyFormData = adminData
            if(bodyFormData.estado=== 'false'){
                bodyFormData.estado = 0
            }else{
                bodyFormData.estado = 1
            }
            API.post('/keys/add', bodyFormData)
            .then(response => {
                messageToast('Administrador creado', 'success')
                updateListAdmins()
                cancelCrearAdmin()
            })
            .catch(error => {
                messageToast(error.response.data.message, 'error')
            })
        }else{
            messageToast('faltan datos', 'error')
        }


    }

    return(
        <div className=" absolute h-full w-full flex items-center justify-center">
            <div className="w-1/2 lg:float-right">
                <div className=" bg-white h-auto tracking-wide border border-black-800 rounded-lg">
                        <p className="text-xl font-semibold pl-6 pt-6 pr-6 pb-2 text-center">
                            Crear Administrador
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center ">


                            <div 
                                className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                            >
                                <label 
                                    className="text-sm text-gray-500"
                                >
                                    Nombre
                                </label>
                                <input 
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                    type="text"
                                    name="name"
                                    placeholder="nombre"
                                    value={adminData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div 
                                className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                            >
                                <label 
                                    className="text-sm text-gray-500"
                                >
                                    Apellidos
                                </label>
                                <input 
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                    type="text"
                                    name="apellidos"
                                    placeholder="apellidos"
                                    value={adminData.apellidos}
                                    onChange={handleChange}
                                />
                            </div>

                            <div 
                                className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                            >
                                <label 
                                    className="text-sm text-gray-500"
                                >
                                    E-mail
                                </label>
                                <input 
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                    type="text"
                                    name="email"
                                    placeholder="correo@mail.com"
                                    value={adminData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div 
                                className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                            >
                                <label 
                                    className="text-sm text-gray-500"
                                >
                                    Password
                                </label>
                                <input 
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={adminData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div 
                                className="flex flex-col  my-2 mx-4 py-2"
                            >
                                <label 
                                    className="text-sm text-gray-500"
                                >
                                    Rol
                                </label>
                                <select className="block w-full " name="rol">
                                    <option>Administrador</option>
                                </select>
                            </div>

                            <div 
                                className="flex flex-col  my-2 mx-4 py-2"
                            >
                                <label 
                                    className="text-sm text-gray-500"
                                >
                                    Estado
                                </label>
                                <select className="block w-full " name="estado" value={adminData.estado} onChange={handleChange}>
                                    <option>true</option>
                                    <option>false</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-row justify-center ">
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 mx-2 rounded-full"
                                onClick={cancelCrearAdmin}
                            >
                                cancel
                            </button>
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 mx-2 rounded-full"
                                onClick={crearAdmin}
                            >
                                ok
                            </button>
                        </div>
                </div>
            </div>


        </div>
    )
}

export default CardCrearAdmin
