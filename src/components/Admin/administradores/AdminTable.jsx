import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';

const AdminTable = ({dataAdmin, setDeshabilitarAdmin, setEditarAdmin, setDataAdminChange}) => {

    
    const history = useHistory();

    const [colorEstado, setColorEstado] = useState()
    useEffect(() => {
        if(dataAdmin.estado===0){
            setColorEstado('red')
        }else{
            setColorEstado('green')
        }
    }, [dataAdmin.estado])

    const cambiarEstadoDeshabilitar = () => {
        setDataAdminChange(dataAdmin)
        setDeshabilitarAdmin(true)
    }

    const cambiarEstadoEditar = () => {
        setDataAdminChange(dataAdmin)
        setEditarAdmin(true)
    }

    const verDetalles = () => {
        history.push(`/administrador/${dataAdmin._id}`)
        // path="/administrador/:id"
    }

    return (
        <tr className="bg-gray-200">
            <td 
                className="p-3 cursor-pointer"
                onClick={verDetalles}
            >
                <div className="">
                    <div className="text-center ">{dataAdmin.name}</div>
                </div>
            </td>

            <td 
                className="p-3 text-center cursor-pointer"
                onClick={verDetalles}
            >
                {dataAdmin.apellidos}
            </td>
            <td 
                className="p-3 align-middle text-center cursor-pointer"
                onClick={verDetalles}
            >
                {dataAdmin.email}
            </td>
            <td 
                className="p-3 text-center cursor-pointer"
                onClick={verDetalles}
            >
                {dataAdmin.rol}
            </td>
            <td 
                className="p-3 text-center cursor-pointer"
                onClick={verDetalles}
            >
                <span className={`bg-${colorEstado}-400 text-gray-50 rounded-md px-2`}>{dataAdmin.estado? 'Habilitado':'Deshabilitado'}</span>
            </td>
            <td className="p-3 text-center">
                <div className="inline-flex">
                    <button 
                        className="text-gray-400 hover:text-yellow-600  mx-2"
                        onClick={cambiarEstadoEditar}    
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button 
                        className="text-gray-400 hover:text-red-600  ml-2"
                        onClick={cambiarEstadoDeshabilitar}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path 
                                fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default AdminTable
