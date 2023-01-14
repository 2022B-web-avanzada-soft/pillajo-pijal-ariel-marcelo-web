import {useState} from "react";

type PropiedadesComponente = {
    texto: string;
    numero: number;
    booleano?: boolean;
}

export default function Componente(props: PropiedadesComponente) {
    const  { texto, numero, booleano } = props;
    // hooks de react donde iteración guarda la variable y setIteracion
    // es la función que permite cambiar el valor de la variable
    // el valor inicial será el que le de el número
    const [iteracion, setIteracion] = useState(numero);
    // DEVOLVER HTML
    const contenidoCondicional: () => (JSX.Element) = ()=>{
        if(booleano){
            return <p>Hola</p>
        }
        return <></>
    };
    return (

        <>
            <p> {texto}</p>
            {contenidoCondicional()}
            {booleano && <p> Hola </p>}
            {booleano ? <p> {numero}</p> : <p> No hay numero</p>}
            <div >
                {iteracion}
            </div>
            <button
                onClick={
                    () => {
                        setIteracion(iteracion + 1);
                    }
                }
            > Aumentar </button>
        </>
    )
}