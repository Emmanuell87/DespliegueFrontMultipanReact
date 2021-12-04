import React from 'react'

const ProductosCarrito = ({listaCarrito}) => {
    return (
        <div className="inline-flex">
            <img src={listaCarrito.imagen.secure_url} alt={listaCarrito.nombre} className="h-16 w-16"/>
            <div className="flex flex-col">
                <div>
                    {listaCarrito.nombre}
                </div>
                <div>
                    {listaCarrito.cantidad} 
                </div>
                <div>
                    {listaCarrito.precio}
                </div>
            </div>
            <div className="mx-6">
                <div>
                    {listaCarrito.precio*listaCarrito.cantidad}
                </div>
                <div>
                    {
                        !listaCarrito.stocks
                        ?
                            <span className="text-red-500">Sin stocks</span>
                        :
                            null
                    }
                </div>
            </div>

        </div>
    )
}

export default ProductosCarrito
