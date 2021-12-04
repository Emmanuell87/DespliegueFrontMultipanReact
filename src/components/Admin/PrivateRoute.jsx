import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import decode from 'jwt-decode'
const PrivateRoute = ({children}) => {

    const history = useHistory();
    // const { user, isAuthenticated, isLoading } = useAuth0();
    const [rol, setRol] = useState();
    useEffect(() => {
        let localToken = localStorage.getItem('token')
        if(localToken) {
            setRol(decode(localToken).rol)
        }
    }, [])

    const regresarRuta = () => {
        if (history.action !== 'POP') {
           history.goBack();
        }
   }
   
    return rol==='Administrador' || rol==='root' 
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
                    llevame al Home
                </span>
                
            </button>
        </div>
    )
}

export default PrivateRoute
