import React from 'react'
import API from 'axios/API'


const CardDeshabilitarAdmin = ({adminDataDisabled, setDeshabilitarAdmin,setDataAdminChange, updateListAdmins, messageToast}) => {

    const cancelDeshabilitarAdmin = () => {
        setDeshabilitarAdmin(false)
        setDataAdminChange({})
    }
    

    const deshabilitarAdmin = () => {
        API.put('/keys/disabled', {_id: adminDataDisabled._id})
        .then(response => {
            messageToast('Administrador deshabilitado', 'success')
            updateListAdmins()
            cancelDeshabilitarAdmin()

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
                        ¿Está seguro que desea deshabilitar el usuario administrador <span className="font-bold">{adminDataDisabled.name} {adminDataDisabled.apellidos}</span>?
                    </h5>
                    <div className="flex flex-row justify-center ">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 mx-2 rounded-full"
                            onClick={cancelDeshabilitarAdmin}
                        >
                            cancel
                        </button>
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 mx-2 rounded-full"
                            onClick={deshabilitarAdmin}
                        >
                            ok
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CardDeshabilitarAdmin
