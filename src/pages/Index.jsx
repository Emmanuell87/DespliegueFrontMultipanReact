import React from 'react'
import { Link } from 'react-router-dom'
import ProductosMasVendidos from 'components/Productos/ProductosMasVendidos'
import ProductosPromo from 'components/Productos/ProductosPromo'
import Image from 'assets/img/panes.jpg'
import Image1 from 'assets/img/panes1.jpg'
import Image3 from 'assets/img/panes3.jpg'
import Aperitivos from 'assets/img/Aperitivos.jpg'
import Pan from 'assets/img/Pan frances.jpg'
import Postres from 'assets/img/Postres.jpg'
import Panqueques from 'assets/img/Panqueques.jpg'
import Frutas from 'assets/img/Frutas.jpg'
import Cafe from 'assets/img/Cafe.jpg'

const Index = () => {
    return (
        <div className="carousel relative container mx-auto" style= {{maxWidth:900}}>
        <div className="carousel-inner relative overflow-hidden w-full p-5">
            
            <input className="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden=""/>
            <div className="carousel-item absolute opacity-0">
                <div className="h-full w-full mx-auto flex pt-6 md:pt-20 md:items-center bg-cover bg-right"style={{backgroundImage: `url(${Image})`}} >

                    <div className="container mx-auto">
                        <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                            <p className="text-black text-2xl my-4">Para el desayuno</p>
                            <Link to="/" className="text-xl inline-block no-underline border-b border-yellow-600 leading-relaxed hover:text-black hover:border-black" >
                                Ir al producto
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <label htmlFor="carousel-3" className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
            <label htmlFor="carousel-2" className="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

            
            <input className="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden=""/>
            <div className="carousel-item absolute opacity-0 bg-cover bg-right">
                <div className="h-full w-full mx-auto flex pt-6 md:pt-20 md:items-center bg-cover bg-right" style={{backgroundImage: `url(${Image1})`}}>

                    <div className="container mx-auto">
                        <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                            <p className="text-black text-2xl my-4">Para compartir</p>
                            <Link to="/" className="text-xl inline-block no-underline border-b border-yellow-600 leading-relaxed hover:text-black hover:border-black">
                                Ir al producto
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <label htmlFor="carousel-1" className="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
            <label htmlFor="carousel-2" className="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

            
            <input className="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden=""/>
            <div className="carousel-item absolute opacity-0">
                <div className="h-full w-full mx-auto flex pt-6 md:pt-20 md:items-center bg-cover bg-bottom"style={{backgroundImage: `url(${Image3})`}}>

                    <div className="container mx-auto">
                        <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                            <p className="text-black text-2xl my-4">Comienza con pie derecho</p>
                            <Link to="/" className="text-xl inline-block no-underline border-b border-yellow-600 leading-relaxed hover:text-black hover:border-black">
                                Ir al producto
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <label htmlFor="carousel-3" className="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
            <label htmlFor="carousel-2" className="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

            
            <ol className="carousel-indicators">
                <li className="inline-block mr-3">
                    <label htmlFor="carousel-1" className="carousel-bullet cursor-pointer block text-4xl text-yellow-400 hover:text-yellow-900">•</label>
                </li>
                <li className="inline-block mr-3">
                    <label htmlFor="carousel-2" className="carousel-bullet cursor-pointer block text-4xl text-yellow-400 hover:text-yellow-900">•</label>
                </li>
                <li className="inline-block mr-3">
                    <label htmlFor="carousel-3" className="carousel-bullet cursor-pointer block text-4xl text-yellow-400 hover:text-yellow-900">•</label>
                </li>
            </ol>

    </div>  
        <h2 className= "font-bold text-yellow-900 text-xl ">PRODUCTOS EN PROMOCION</h2>

        <div className="flex flex-wrap justify-between pt-1 -mx-6">
            <ProductosPromo imagen= {Aperitivos} descuento= 'Descuento del 50%' nombreProducto= 'Aperitivos' descripcion= 'Disfruta de nuestros deliciosos aperitivos, no esperes y date un gusto' precio= 'Desde $ 2.000' />
            <ProductosPromo imagen= {Pan} descuento= 'Descuento del 50%' nombreProducto= 'Pan Frances' descripcion= 'Disfruta de nuestros delicioso pan frances, disfruta de nuestra deliciosa textura' precio= 'Desde $ 1.000' />
            <ProductosPromo imagen= {Postres} descuento= 'Descuento del 50%' nombreProducto= 'Postres' descripcion= 'Disfruta de nuestros deliciosos postres, no esperes puede que no lo encuentres' precio= 'Desde $ 5.000' />
                
        </div>   
        <h2 className= "font-bold text-yellow-900 text-xl ">PRODUCTOS MAS VENDIDOS</h2>

        <div className="flex flex-wrap justify-between pt-1 -mx-6">
            <ProductosMasVendidos imagen= {Panqueques} calificacion= '5 Estrellas' nombreProducto= 'Panqueques' descripcion= 'Este delicioso panqueque es aplaudido por nuestro publico disfrutalo' precio= 'Desde $ 4.000'/>
            <ProductosMasVendidos imagen= {Frutas} calificacion= '5 Estrellas' nombreProducto= 'Frutas' descripcion= 'La furta es uno de nuestros productos mas deseados, mantente sano consumiendo fruta' precio= 'Desde $ 5.000'/>
            <ProductosMasVendidos imagen= {Cafe} calificacion= '5 Estrellas' nombreProducto= 'Cafe' descripcion= 'Un café por la mañana no puede faltar, comienza el dia tomando uno sobre todo café colombiano' precio= 'Desde $ 1.000'/>
        
            
        </div>        
       
         
         
    </div>
    )
}

export default Index
