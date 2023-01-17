import Layout from "../components/Layout";
import {useState} from "react";
import CryptoFormulario from "../components/f_ejemplo_criptomonedas/CryptoFormulario";

export default function (){
    const [monedas, setMonedas] = useState({} as any);
    return (            <>
            <Layout title="Ejemplo Criptomonedas | EPN">
                <CryptoFormulario
                    setMonedas={setMonedas}>
                </CryptoFormulario>
            </Layout>
        </>
    )
}