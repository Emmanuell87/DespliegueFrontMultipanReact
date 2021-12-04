import React from 'react'
import ParticipantesProyecto from 'components/ParticipantesProyecto'
import Rodolfo from 'assets/img/Rodolfo.jpg'
const Participantes = () => {
    return (
        <div>
	
               <div><ParticipantesProyecto nombre= 'Emmanuel Mejia' descripcion= 'Desarrollador Backend, encargado de la experiencia de usuario interno' direccion= 'Supía, Colombia' trabajo= 'Backend' imagen={Rodolfo}/></div>
               <div><ParticipantesProyecto nombre= 'Rodolfo Duarte' descripcion= 'Desarrollador Frontend, encargado de la experiencia de usuario final' direccion= 'Bogotá, Colombia' trabajo= 'Frontend' imagen={Rodolfo}/></div>
               <div><ParticipantesProyecto nombre= 'Edwin Arroyave' descripcion= 'Desarrollador Tester, encargado de las pruebas unitarias' direccion= 'Pereira, Colombia' trabajo= 'Tester' imagen={Rodolfo}/></div>
               <div><ParticipantesProyecto nombre= 'Juan Vargas' descripcion= 'Desarrollador Frontend, encargado de la experiencia de usuario final' direccion= 'Bogotá, Colombia' trabajo= 'Frontend' imagen={Rodolfo}/></div>

          
        </div>


    )
}

export default Participantes
