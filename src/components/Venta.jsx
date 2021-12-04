import API from 'axios/API';
import React, { useEffect, useState } from 'react'

const getDate = (dateObj) => {
    // const dateObj = new Date();
    
    
    
    var date = new Date(dateObj);//transformamos el Date.now object a New Date object
    
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() ) // obtenemos la fecha de creacion tranformada en la zona horaria Colombiana 
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()} - ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
}

const Venta = ({ventaData}) => {
    const id = ventaData.user
    const [email, setEmail] = useState()
    
    useEffect(() => {
        // API.get(`/keys/${}`)
        API.get('/keys/:id', {params:{_id: id}})
        .then((response) => {
            setEmail(response.data.email)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [id]);
    console.log(ventaData.user)
    return (
        <div className="my-10 mx-8">
            <div>
                Comprador : {email}
            </div>
            <div>
                Producto : {ventaData.nombre}
            </div>
            <div>
                Categoria : {ventaData.categoria}
            </div>
            <div>
                Precio : {ventaData.precio}
            </div>
            <div>
                Cantidad : {ventaData.cantidad}
            </div>
            <div>
                Precio Total : {ventaData.cantidad * ventaData.precio}
            </div>
            <div>
                Fecha de compra : {getDate(ventaData.createdAt)}
            </div>
        </div>
    )
}

export default Venta
