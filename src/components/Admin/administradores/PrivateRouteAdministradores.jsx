import React, { useEffect, useState } from 'react'
import decode from 'jwt-decode'
import { useHistory } from 'react-router';
const PrivateRouteAdministradores = ({children}) => {
    
    const history = useHistory();
    // const { user, isAuthenticated, isLoading } = useAuth0();
    const [texto, setTexto] = useState()
    const [rol, setRol] = useState();
    useEffect(() => {
        let localToken = localStorage.getItem('token')
        if(localToken) {
            setRol(decode(localToken).rol)
        }
        if(history.length > 2) {
            setTexto('Regresar')
        }else{
            setTexto('Llevame al Home')
        }
    }, [history])

    const regresarRuta = () => {
        if (history.action !== 'POP') {
           history.goBack();
        } else{
            history.push('/')
        }
    }

    return rol==='root' 
    ? 
        (
            <>
                {children}
            </>
        )
    :
    (
        <div>
            <div className="text-3xl text-red-500">
                No estás autorizado para ver este este sitio
            </div>
            <button onClick={regresarRuta}>
                <span className="text-blue-600 font-bold">
                    {texto}
                </span>
                
            </button>
        </div>
    )
}

export default PrivateRouteAdministradores
