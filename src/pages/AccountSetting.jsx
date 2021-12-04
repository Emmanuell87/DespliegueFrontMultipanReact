import React, { useEffect, useState } from 'react'
import decode from 'jwt-decode'
import API from 'axios/API';
import {  useHistory  } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formInicial = {
    avatar: null,
    email: '',
    nombre: '',
    apellidos: '',
    phoneNumber: '',
    password: '',
    newPassword: ''
}
const AccountSetting = () => {

    const [dataUser, setDataUser] = useState({})

    const [formValue, setformValue] = useState(formInicial);
    const [previewImagen, setPreviewImagen] = useState('')

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
        if(event.target.name==='avatar'){
            if(event.target.files[0]){
                setformValue({
                    ...formValue,
                    [event.target.name]: event.target.files[0]
                });
                setPreviewImagen(URL.createObjectURL(event.target.files[0]))
            }

        }else{
            setformValue({
                ...formValue,
                [event.target.name]: event.target.value
            });
        }
    }

    useEffect(() => {
        const localToken = localStorage.getItem('token')
        if(localToken){
            setDataUser(decode(localToken))
        }
    }, [])


    const actualizarDatosUser = async(event) => {
        event.preventDefault();
        console.log(formValue.avatar)
        var bodyFormData = new FormData();
        if(previewImagen){
              
            bodyFormData.append('avatar', formValue.avatar);
          }
        if(formValue.nombre){
            bodyFormData.append('name', formValue.nombre);
        } else{
            bodyFormData.append('name', dataUser.name);
        }
        if(formValue.apellidos){
            bodyFormData.append('apellidos', formValue.apellidos);
        } else{
            bodyFormData.append('apellidos', dataUser.apellidos);
        }

        if(formValue.email){
            bodyFormData.append('email', formValue.email);
        }else{
            bodyFormData.append('email', dataUser.email);
        }
        bodyFormData.append('rol', dataUser.rol);
        bodyFormData.append('_id', dataUser._id);
        bodyFormData.append('password', formValue.password);
        bodyFormData.append('newPassword', formValue.newPassword);

        API.put('/keys/update', bodyFormData)
        .then(response => {
            localStorage.removeItem('token')
            localStorage.setItem('token', response.data.tokenReturn)
            setformValue({
                email: '',
                nombre: '',
                apellidos: '',
                phoneNumber: '',
                password: '',
                newPassword: ''
            })
            setDataUser(decode(response.data.tokenReturn))
            toast.success('Actualizado')
        })
        .catch(err => {
            toast.error(err.response.data.message)
        })
    }

    const history = useHistory()

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        history.push('/')
    }

    return (
        <section className="py-5 bg-gray-100  bg-opacity-50 h-screen">
            <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
                <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
                <div className="max-w-sm mx-auto md:w-full md:mx-0 grid grid-cols-1">
                    <div className="inline-flex items-center space-x-4 ">
                            <div className=" rounded-full shadow-xl h-16 w-16" >
                                <div className=" rounded-full justify-center cursor-pointer ">
                                    <img className="h-16 rounded-full w-16 " src={previewImagen || dataUser.avatar} alt="imagen" />

                                </div>   



                            </div>


                        <h2 className="font-black text-gray-600">{dataUser.name} {dataUser.apellidos}</h2>
                    </div>
                    <label className="font-bold text-gray-900 bg-indigo-400 w-32 text-center mt-4 " htmlFor="inputFile">
                        Cambiar avatar
                    </label>
                    <input
                        className=""
                        type="file"
                        name="avatar"
                        id="inputFile"
                        onChange={
                            handleChange
                        }
                        hidden={true}
                    />
                </div>
                </div>
                <form className="bg-white space-y-6" onSubmit={actualizarDatosUser}>
                    <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">Account</h2>
                        <div className="md:w-2/3 max-w-sm mx-auto">
                        <label className="text-sm text-gray-400">Email</label>
                        <div className="w-full inline-flex border">
                            <div className="w-1/12 pt-2 bg-gray-100">
                                <svg
                                    fill="none"
                                    className="w-6 text-gray-400 mx-auto"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <input
                                className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                                type="email"
                                name="email"
                                placeholder={dataUser.email}
                                value={formValue.email}
                                onChange={handleChange}
                            />
                        </div>
                        </div>
                    </div>

                    <hr />
                    <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
                        <h2 className="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
                        <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                            <div>
                                <label className="text-sm text-gray-400">Nombre</label>
                                <div className="w-full inline-flex border">
                                    <div className="w-1/12 pt-2 bg-gray-100">
                                        <svg
                                            fill="none"
                                            className="w-6 text-gray-400 mx-auto"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                        </svg>
                                    </div>
                                    <input
                                        className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                                        type="text"
                                        name="nombre"
                                        placeholder={dataUser.name}
                                        value={formValue.nombre}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">Apellidos</label>
                                <div className="w-full inline-flex border">
                                    <div className="w-1/12 pt-2 bg-gray-100">
                                        <svg
                                            fill="none"
                                            className="w-6 text-gray-400 mx-auto"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                        </svg>
                                    </div>
                                    <input
                                        className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                                        type="text"
                                        name="apellidos"
                                        placeholder={dataUser.apellidos}
                                        value={formValue.apellidos}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">Número de celular</label>
                                <div className="w-full inline-flex border">
                                    <div className="pt-2 w-1/12 bg-gray-100">
                                        <svg
                                            fill="none"
                                            className="w-6 text-gray-400 mx-auto"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        />
                                        </svg>
                                    </div>
                                    <input
                                        className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="12341234"
                                        value={formValue.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">Change password</h2>

                        <div className="md:w-2/3 w-full max-w-sm mx-auto space-y-5 md:inline-flex flex flex-col">
                            <div className="">
                                <div className="w-full inline-flex border-b">
                                    <div className="w-1/12 pt-2">
                                        <svg
                                            fill="none"
                                            className="w-6 text-gray-400 mx-auto"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        className="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={formValue.password}
                                        onChange={handleChange}
                                        
                                    />
                                </div>
                            </div>

                            <div className="">
                                <div className="w-full inline-flex border-b">
                                    <div className="w-1/12 pt-2">
                                        <svg
                                            fill="none"
                                            className="w-6 text-gray-400 mx-auto"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        className="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
                                        type="password"
                                        name="newPassword"
                                        placeholder="new-password"
                                        value={formValue.newPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>


                    </div>

                    <hr />
                    
                    <div className="w-full md:inline-flex ">
                        <div className="p-4 md:pl-6 md:w-3/4">
                                <button className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none" type="submit">
                                    <svg
                                        fill="none"
                                        className="w-4 text-white mr-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                    </svg>
                                    Update
                                </button>
                        </div>
                        <div className=" p-4 md:text-right text-gray-500 ">
                            <button 
                                className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-red-400 py-2 inline-flex items-center focus:outline-none"
                                onClick={cerrarSesion}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <ToastContainer 
                position="bottom-center"
                autoClose={3000}
            />
        </section>
    )
}

export default AccountSetting
