import React from 'react'
import API from 'axios/API'


const CardEliminarCategoria = ({categoriaEliminar, setEliminarCategoria, setCategoria, updateListCategorias, messageToast}) => {

    const cancelEliminarCategoria = () => {
        setEliminarCategoria(false)
        setCategoria({})
    }
    

    const eliminarCategoria = () => {
        const localToken = localStorage.getItem('token')
        API.delete('/categorias/delete', {headers:{token: localToken}, data:{_id: categoriaEliminar._id}})
        .then(response => {
            messageToast('Categoria eliminada', 'success')
            updateListCategorias()
            cancelEliminarCategoria()

        })
        .catch(error => {
            messageToast(error.response.data.message, 'error')
        })
    }
    return(
        <div className=" absolute h-full w-full flex items-center justify-center">
            <div className="w-1/2 lg:float-right">
                <div className=" bg-white h-auto tracking-wide border border-black-800 rounded-lg">
                    <h5 className="text-sm font-semibold pl-6 pt-6 pr-6 pb-2 text-center">
                        ¿Está seguro que desea eliminar la categoria <span className="font-bold">{categoriaEliminar.name}</span>?
                    </h5>
                    <div className="flex flex-row justify-center ">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 mx-2 rounded-full"
                            onClick={cancelEliminarCategoria}
                        >
                            cancel
                        </button>
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 mx-2 rounded-full"
                            onClick={eliminarCategoria}
                        >
                            ok
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CardEliminarCategoria
