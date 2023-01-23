import {useEffect, useState} from "react";
import {MONEDAS} from "../d_hook_custom/monedas";
import {MonedasInterface} from "../../interfaces/moneda";
import useSelectMoneda from "../hooks/useSelectMoneda";
import {ConsultaMoneda} from "../../pages/f_ejemplo_criptomonedas";

export default function (params) {
    const {setMonedas} = params;
    const [monedasArreglo, setMonedasArreglo] = useState(MONEDAS);
    const [criptoMonedasArreglo, setCriptoMonedasArreglo] = useState([] as MonedasInterface[]);
    const [valorMoneda, SelectMonedaComponente] = useSelectMoneda(
        'Seleccionar Moneda',
        monedasArreglo
    );
    const [valorCriptoMoneda, SelectCriptoMonedaComponente] = useSelectMoneda(
        'Seleccionar Criptomoneda',
        criptoMonedasArreglo
    );
    useEffect(
        () => {
            const consultarAPICripto = async () => {
                const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
                const respuesta = await fetch(url);
                const dataPlana = await respuesta.json();
                const arregloCriptos: MonedasInterface[] = dataPlana.Data.map(
                    (criptoMoneda) => {
                        const criptoMonedaLocal: MonedasInterface = {
                            id: criptoMoneda.CoinInfo.Name,
                            nombre: criptoMoneda.CoinInfo.FullName,
                        }
                        return criptoMonedaLocal
                    }
                );
                setCriptoMonedasArreglo(arregloCriptos);
            }
            consultarAPICripto().then().catch((error) => {
                console.error(error)
            });
        },
        []
    )
    const manejarSubmitFormulario = (e)=>{
        e.preventDefault();
        const monedasConsulta: ConsultaMoneda = {
            valorCriptoMoneda: valorCriptoMoneda as string,
            valorMoneda: valorMoneda as string
        }
        setMonedas(monedasConsulta);
    }
    return (
        <>
            <form onSubmit={manejarSubmitFormulario}>
                {SelectMonedaComponente}
                {SelectCriptoMonedaComponente}
                <br/>
                <button className={'btn btn-primary w-100'} type={'submit'}>
                    Consultar
                </button>
            </form>
        </>
    )
}