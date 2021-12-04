import API from 'axios/API'
import Venta from 'components/Venta'
import React, { useEffect, useState } from 'react'





const Ventas = () => {
    const [ventas, setVentas] = useState()

    useEffect(() => {
        const localToken= localStorage.getItem('token')
        API.get('/ventas/list', {headers:{token: localToken}})
        .then((response) =>{
            setVentas(response.data)
        })
        .catch((error) =>{
            console.error(error)
        })
    }, [])

    return (
        <div>
            {
                ventas
                ?
                    ventas.map((venta)=>{
                        return(
                            <Venta 
                                key = {venta._id}
                                ventaData = {venta} 
                            />
                        )
                    })
                :
                    null
            }
        </div>
    )
}

export default Ventas
