// hooks/useSelectMoneda.tsx
import {MonedasInterface} from "../../interfaces/moneda";
import {useState} from "react";
import {JSXElement} from "@babel/types";

export default function (label: string, opciones: MonedasInterface[]) {
    // select del arreglo de monedas (html - jsx element)
    // valor de esa moneda
    const [moneda, setMoneda] = useState('');
    const generarJSXElementMonedas: () => JSX.Element[] = () => {
        return opciones.map(
            (moneda) =>
                ( // Iteracion (KEY ES REQUERIDO)
                    <option key={moneda.id} id={moneda.id.toString()} value={moneda.id}>
                        {moneda.nombre}
                    </option>
                )
        );
    };
    const UseSelectMonedas = (
        <>
            <label className="form-label" htmlFor={label}> {label} </label>
            <select className="form-select"
                    name={label}
                    id={label}
                    value={moneda}
                    onChange={e => {
                        e.preventDefault();
                        setMoneda(e.target.value)
                    }}
            >
                <option value="">Seleccione opción</option>
                {generarJSXElementMonedas()}
            </select>
        </>
    )
    return [moneda, UseSelectMonedas];
}