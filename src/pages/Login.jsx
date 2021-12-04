import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import API from "axios/API"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import decode from 'jwt-decode'
import Logo from 'components/Logo';


const Login = () => {
    const history = useHistory();
    

    const [formValue, setformValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        let localToken = localStorage.getItem('token')
        if (localToken) {
            history.push('/')
        }
    }, [history])

    // const esperar = () =>{
        
    //     return  timeout()
    // }

    const enviarDatosLogin = async(event) => {
        // toast.success('error')
        // let espera = await timeout(1000);
        event.preventDefault();
        var loginBody = {
            email: formValue.email,
            password: formValue.password
        }
        let token = null;
        API.post('/keys/login', loginBody)
        .then(response => {
            localStorage.setItem('token', response.data.tokenReturn);
            token = decode(response.data.tokenReturn)
            toast.success('Bienvenido ' + token.name + ' ' + token.apellidos);
            window.setTimeout(() => {
                history.push('/');
             }, 2000)
        })
        .catch(error => {
            toast.error(error.response.data.message);
            // if(err.response.status===401){
            //     toast.success(error.data.);
            //     console.log(error.data.)
            //     // console.log(err.response.data.message)
            // }else if(err.response.status===404){
            //     toast.success('');
            //     console.log("El correo no está registrado")
            // }else{// En caso de error 500
            //     toast.success('Bienvenido ' + token.name + ' ' + token.apellidos);
            //     console.log('Ocurrio un error interno')
            // }
        })
    }

    return (
            <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <div className="flex justify-center">

                    <Logo height="32" width="32" />
                </div>
                <section>
                    <h3 className="font-bold text-2xl">Binvenido a Multipan</h3>
                    <p className="text-gray-600 pt-2">Inicia sesión en tu cuenta.</p>
                </section>

                <section className="mt-10">
                    <form className="flex flex-col" onSubmit={enviarDatosLogin}>
                        <div className="mb-6 pt-3 rounded bg-yellow-100">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">Email</label>
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
                                className="bg-yellow-100 rounded w-full text-gray-900 focus:outline-none border-b-4  focus:border-yellow-900 transition duration-500 px-3 pb-3"
                                value={formValue.password} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-between" >
                            <Link to="/registro" className="text-sm text-yellow-900 hover:text-yellow-700 hover:underline mb-6">
                                Crear cuenta
                            </Link>
                            <Link to="/" className="text-sm text-yellow-900 hover:text-yellow-700 hover:underline mb-6">
                                Olvidaste tu contraseña?
                            </Link>
                        </div>
                        <button className="bg-yellow-700 hover:bg-yellow-900 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Ingresar</button>
                    </form>
                </section>
                <ToastContainer 
                    position="bottom-center"
                    autoClose={2000}
                />
            </div>
    )
}

export default Login
