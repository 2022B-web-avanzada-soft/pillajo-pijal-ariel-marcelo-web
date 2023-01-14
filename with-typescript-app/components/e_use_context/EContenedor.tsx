import {ContenedorContext, ContenedorContextObject} from "./ContenedorContext";
import {useState} from "react";
import EComponenteA from "./EComponenteA";
export default function (){
 const [nombreUsuario, setNombreUsuario] = useState("Ariel");
 const objetoContenedorContext: ContenedorContextObject = {nombreUsuario, setNombreUsuario}
 return (
     <div>
          <ContenedorContext.Provider value={objetoContenedorContext}>
           <EComponenteA />
          </ContenedorContext.Provider>
     </div>
 )
}