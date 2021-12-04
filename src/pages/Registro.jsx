import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import API from 'axios/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from 'components/Logo';

const Registro = () => {

    
    const history = useHistory();

    const [formValue, setformValue] = useState({
        name: '',
        apellidos: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        let localToken = localStorage.getItem('token')
        if (localToken) {
            history.push('/')
        }
    }, [history])

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    
    const enviarDatosRegistro = async(event) => {
        event.preventDefault();

        if(formValue.name && formValue.apellidos && formValue.email && formValue.password && formValue.confirmPassword){

            if(formValue.password === formValue.confirmPassword){
                API.post('/keys/add', formValue)
                .then(response => {
                    toast.success('Registro correcto')
                    window.setTimeout(() => {
                        history.push('/');
                     }, 2000)
                })
                .catch(error => {
                    toast.error(error.response.data.message)
                })
            }
        }else{
            toast.error('Faltan datos')
        }

    }

    return (
        <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
            <div className="flex justify-center">
                <Logo height="32" width="32" />
            </div>
            <section>
                <h3 className="font-bold text-2xl">Binvenido a Multipan</h3>
                <p className="text-gray-600 pt-2">Crea una cuenta.</p>
            </section>

            <section className="mt-10">
                <form className="flex flex-col" onSubmit={enviarDatosRegistro}>

                    <div className="mb-6 pt-3 rounded bg-yellow-100">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="name">Nombre</label>
                        <input 
                            type="text" 
                            name="name"
                            id="name" 
                            className="bg-yellow-100 rounded w-full text-gray-900 focus:outline-none border-b-4 border-yellow-600 focus:border-yellow-900 transition duration-500 px-3 pb-3"
                            value={formValue.name} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-yellow-100">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="apellidos">Apellidos</label>
                        <input 
                            type="text" 
                            name="apellidos"
                            id="apellidos" 
                            className="bg-yellow-100 rounded w-full text-gray-900 focus:outline-none border-b-4 border-yellow-600 focus:border-yellow-900 transition duration-500 px-3 pb-3"
                            value={formValue.apellidos} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-yellow-100">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">E-mail</label>
                        <input 
                            type="text" 
                            name="email"
                            id="email" 
                            className="bg-yellow-100 rounded w-full text-gray-700 focus:outline-none border-b-4 border-yellow-600 focus:border-yellow-900 transition duration-500 px-3 pb-3"
                            value={formValue.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-yellow-100">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            id="password"
                            min='8'
                            className="bg-yellow-100 rounded w-full text-gray-900 focus:outline-none border-b-4 border-yellow-600 focus:border-yellow-900 transition duration-500 px-3 pb-3"
                            value={formValue.password} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-yellow-100">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            id="confirmPassword" 
                            className="bg-yellow-100 rounded w-full text-gray-900 focus:outline-none border-b-4 border-yellow-600 focus:border-yellow-900 transition duration-500 px-3 pb-3"
                            value={formValue.confirmPassword} 
                            onChange={handleChange}
                        />
                    </div>

                    <button className="bg-yellow-700 hover:bg-yellow-900 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Ingresar</button>
                </form>
            </section>
            <ToastContainer 
                position="bottom-center"
                autoClose={3000}
            />
        </div>
    )
}

export default Registro
