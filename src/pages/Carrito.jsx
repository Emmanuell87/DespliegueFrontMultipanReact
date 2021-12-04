import React, { useEffect, useState } from 'react'
import API from 'axios/API'
import ProductosCarrito from '../components/ProductosCarrito'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Carrito = () => {
    const [listaCarrito, setListaCarrito] = useState([])

    useEffect(() => {
        const carritoStorage = localStorage.getItem('carrito') 
        if(carritoStorage){
            if(JSON.parse(carritoStorage).length===undefined){
                setListaCarrito(item => [...item, JSON.parse(carritoStorage)])
            }else{
                setListaCarrito(JSON.parse(carritoStorage))
            }
        }
    }, [])


    // getAllCarrito(){

    //   }
    const realizarCompra = () =>{
        let index = 0
        const localToken = localStorage.getItem('token')
        
        listaCarrito.forEach((element)=> {
            API.put('articulos/comprar', element, {headers: {token: localToken}})
            .then(response=>{
                index++
                if(index === listaCarrito.length){
                    toast.success('su compra ha sido éxitosa')
                }
            })  
            .catch(error=>{
                index++
                toast.error(error.response.data.message)
            })
          })
    }

    const confirmarStocks = () => {
        let validacion = true
        let key = 0
        listaCarrito.forEach((element)=> {
            API.post('/articulos/stocks', element)
            .then(response => {
                key++
                if(key===listaCarrito.length-1){
                    if(validacion){
                        realizarCompra();
                    }
                }
            })
            .catch(error => {
                key++
                toast.error(error.response.data.message)
            })
        })
    }

    return (
        <div>
            <div className="grid grid-cols-1">
                {
                    listaCarrito.length !== 0
                    ?
                        listaCarrito.map( (item)=>(
                            <ProductosCarrito
                                key={item._id}
                                listaCarrito={item}
                            />
                        ))
                    : null
                }
            </div>

            <button 
                className="bg-yellow-500"
                onClick={confirmarStocks}
            >
                Comprar 
            </button>

            <ToastContainer 
                position="bottom-center"
                autoClose={3000}
            />
            
        </div>
    )
}

export default Carrito
