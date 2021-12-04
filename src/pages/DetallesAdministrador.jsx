import API from 'axios/API'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'



const DetallesAdministrador = () => {
    const {id} = useParams()
    const [adminData, setAdminData] = useState()
    const [mostrarAccionesArticulos, setMostrarAccionesArticulos] = useState(true)
    const [mostrarAccionesCategorias, setMostrarAccionesCategorias] = useState(true)
    
    useEffect(() => {
        console.log('aaaaaa')
        API.get('/keys/:id', {params:{_id: id}})
        .then((response) =>{
            setAdminData(response.data)
            // if(adminData){
            //     console.log(adminData)
            //     setAdminData(adminData.sort({createdAt:1}))
            // }
            
            // console.log(adminData.sort({createdAt:-1}))
        })
        .catch((error) =>{
            console.log(error)
        })
    }, [id])
    // alert('aaaaaaaaaa')
    const verAccionesArticulos = () => {
        setMostrarAccionesArticulos(!mostrarAccionesArticulos)
        setMostrarAccionesCategorias(false)
    }

    const verAccionesCategorias = () => {
        setMostrarAccionesArticulos(false)
        setMostrarAccionesCategorias(!mostrarAccionesCategorias) //
    }
    return (
        <div>
            {
                adminData
                ?
                    <div className="">
                        <div className="grid grid-cols-1">

                            <span className="text-center mt-8">
                                <span className="font-bold mr-2">
                                    Nombre: 
                                </span>
                                {adminData.name}
                            </span>
                            <span className="text-center mx-2">
                                <span className="font-bold mr-2">
                                    Apellidos:  
                                </span>
                                   {adminData.apellidos}
                            </span>
                            <span className="text-center mb-8">
                                <span className="font-bold mr-2">

                                    Email:
                                </span> 
                                {adminData.email}
                            </span>
                        </div>


                        
                        
                        <div className="flex flex-col my-8 ">
                            {/* <div className="border-8 border-gray-600">

                            </div> */}
                            <span className="font-bold">
                                Acciones o cambios realizados por el administrador:
                            </span>
                                <div className="bg-gray-200 shadow-md rounded-3xl">
                                    <div className="bg-gray-400 shadow-md rounded-3xl  mx-12 my-2 py-2">
                                        <span 
                                            className="font-bold cursor-pointer mx-3"
                                            onClick={verAccionesArticulos}
                                        >
                                            Cambios en articulos
                                        </span>

                                        <div className="grid grid-cols-4">
                                            {
                                                mostrarAccionesArticulos
                                                ?
                                                    adminData.acciones.articulos.map((articulo) => {
                                                        return(
                                                            <DetalleArticulos
                                                                key = {articulo._id}
                                                                articulo = {articulo}
                                                            />
                                                        )
                                                    })
                                                :
                                                    null
                                            }
                                        </div>


                                    </div>

                                    <div className="bg-gray-400 shadow-md rounded-3xl  mx-12 my-2 py-2">
                                        <span 
                                            className="font-bold cursor-pointer mx-3"
                                            onClick={verAccionesCategorias}
                                            
                                        >
                                            Cambios en categorias
                                        </span>

                                        <div className="grid grid-cols-4">

                                            {
                                                mostrarAccionesCategorias
                                                ?
                                                    adminData.acciones.categorias.map((categoria) => {
                                                        return (
                                                            <DetalleCategorias 
                                                                key ={categoria._id}
                                                                categoria={categoria} 
                                                            />
                                                        )
                                                    })
                                                :
                                                    null
                                            }
                                        </div>
                                    </div>



                                </div>                      
                            
                        </div>
                        
                    </div>
                :
                    null
            }
        </div>
    )
}

const getDate = (dateObj) => {
    // const dateObj = new Date();
    
    
    
    var date = new Date(dateObj);//transformamos el Date.now object a New Date object
    
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() ) // obtenemos la fecha de creacion tranformada en la zona horaria Colombiana 
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()} - ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
}

const DetalleArticulos = ({articulo}) => {

    return (
        <div className="max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3">
            <div>
                Nombre Articulo : {articulo.nombre}
            </div>
            <div>
                Categoria asociada : {articulo.categoria}
            </div>
            <div>
                cantidad : {articulo.cantidad}
            </div>
            <div>
                precio : {articulo.precio}
            </div>
            <div>
                tipo : {articulo.tipo}
            </div>
            <div>
                Fecha creacion : {getDate(articulo.createdAt)}
            </div>
        </div>
    )
} 

const DetalleCategorias = ({categoria}) => {
    return (
        <div className="max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3">
            <div>
                {categoria.nombre}
            </div>
            <div>
                {categoria.tipo}
            </div>
            <div>
                {getDate(categoria.createdAt)}
            </div>
        </div>
    )
}

export default DetallesAdministrador
