import API from 'axios/API'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetallesProducto = () => {
    const {id} = useParams()
    const [productData, setProductData] = useState()
    const [cantidadCompra, setCantidadCompra] = useState(1)

    const handleChange = (event) => {
        
        setCantidadCompra(event.target.value);

    }

    useEffect(() => {
        API.get('/articulos/:id', {params:{_id: id}})
        .then((response) =>{
            setProductData(response.data)
        })
        .catch((error) =>{
            console.log(error)
        })
    }, [id])

    // const crearCategoria = () => {
    const agregarProductoCarrito = () =>{
        var token = localStorage.getItem('token');
        if(token){
            if(productData.cantidad>=cantidadCompra){
                // console.log(item)
                const newItem = {
                    _id: productData._id,
                    imagen: productData.imagen,
                    nombre: productData.nombre,
                    cantidad: cantidadCompra,
                    precio: productData.precio,
                    stocks: true
                }
                var carrito = localStorage.getItem("carrito")
                if(!carrito){
                    localStorage.setItem('carrito', JSON.stringify(newItem))
                    toast.success("Se ha agregado el producto al carrito")
                //   this.snackbar.color ="teal accent-4"
                //   this.snackbar.text = "Se ha agregado el producto al carrito"
                //   this.snackbar.estado = true
                    // this.$Global.productosCarrito = this.$Global.productosCarrito + 1
                //   this.$store.state.carrito = this.$store.state.carrito + 1
                }else{
                    var newCarrito = []
                    if(JSON.parse(carrito).length===undefined){
                        newCarrito.push(JSON.parse(carrito)) 
                    }else{
                        JSON.parse(carrito).forEach(element => {
                            newCarrito.push(element)
                        });          
                    }
                    var validacion = false
                    newCarrito.forEach(element=>{
                        if(element._id === productData._id){
                            validacion = true
                            element.cantidad = cantidadCompra
                        }
                    })
                    if(!validacion){
                        newCarrito.push(newItem)
                        localStorage.setItem('carrito', JSON.stringify(newCarrito))
                        toast.success("se ha agregado el producto al carrito")
                        // this.snackbar.color ="teal accent-4"
                        // this.snackbar.text = "Se ha agregado el producto al carrito"
                        // this.snackbar.estado = true
                        // this.$store.state.carrito = this.$store.state.carrito + 1 
                    }else{
                        localStorage.setItem('carrito', JSON.stringify(newCarrito))
                        toast.success("Se ha actualizado el carrito con éxito")
                        // this.snackbar.color ="teal accent-4"
                        // this.snackbar.text = "Se ha actualizado el carrito con éxito"
                        // this.snackbar.estado = true

                    }
                }
            }else{
                toast.info("la cantidad no puede ser mayor a la cantidad máxima disponible")
                //   this.snackbar.color ="red"
                //   this.snackbar.text = "la cantidad no puede ser mayor a la cantidad máxima disponible"
                //   this.snackbar.estado = true
            }
        }else{
            toast.info("Debes iniciar sesión para realizar esta acción")
        //   this.snackbar.color ="red"
        //   this.snackbar.text = "Debes iniciar sesión para realizar esta acción"
        //   this.snackbar.estado = true
        }
    }

    return (
        <div className="grid grid-cols-2">
            {
                productData
                ?
                    <>
                        <img src={productData.imagen.secure_url} alt={productData.nombre} />
                        <div>
                            <div>
                                Nombre: {productData.nombre}
                            </div>
                            <div>
                                Categoria: {productData.categoria}
                            </div>
                            <div>
                                cantidad: {productData.cantidad}
                            </div>
                            <div>
                                precio: {productData.precio}
                            </div>
                            <div>
                                categoria: {productData.categoria}
                            </div>
                            <div>
                                <input 
                                    className="appearance-none bg-transparent border-none  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                    type="number"
                                    name="cantidadCompra"
                                    placeholder="Cantidad Compra"
                                    min="1"
                                    max={productData.cantidad}
                                    value={cantidadCompra}
                                    onChange={handleChange}
                                />
                                
            
                                <button 
                                    className="bg-yellow-600"
                                    onClick={agregarProductoCarrito}
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </>
                :
                    null
            } 

            
            <ToastContainer 
                position="bottom-center"
                autoClose={3000}
            />
        </div>
    )
}

export default DetallesProducto
