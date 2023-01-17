import {EstilosEjemplo} from "../components/a_estilos/EstilosEjemplo";
import Componente from "../components/b_componentes/Componente";
import Layout from "../components/Layout";

export default function a_hola_mundo() {
  return (
      <div>
          <Layout>
              <Componente texto={"Hello"} numero={9} booleano={true}/>
              <button
                  onClick={
                      (event) => {
                          alert("DIO CLICK")
                          console.log(event)
                      }
                  }
              >Click</button>
              <EstilosEjemplo />
            </Layout>
      </div>
  )
}