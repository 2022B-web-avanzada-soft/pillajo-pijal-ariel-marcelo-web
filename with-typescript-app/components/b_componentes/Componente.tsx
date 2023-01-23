import {useState} from "react";

type PropiedadesComponente = {
    url: string;
    iteraciones: number;
    mostrar?: boolean;
};
// interface PropiedadesComponente{
//
// }
export default function (props: PropiedadesComponente){
    const { url, iteraciones, mostrar } = props;
    // const arreglo = [ 1, 0 ];
    // const numeroUno = arreglo[0];
    // const numeroDos = arreglo[0];
    // const [ numeroUno, numeroDos ] = [ 1, 0 ];
    // Hooks
    const [iteracion, setIteracion] = useState(iteraciones);
    // const url = props.url;
    // const iteraciones = props.iteraciones;
    // const mostrar = props.mostrar;
    const contenidoCondicional: () => (JSX.Element) = ()=>{
        if(mostrar){
            return <p>Hola</p>
        }
        return <></>
    };
    return (
        <>
            <a target="_blank" href={url}>IR A GOOGLE</a>
            {/*{mostrar ? <p>Hello</p> : <></>}*/}
            {contenidoCondicional()}
            { mostrar &&
                <h1>Si muestra</h1>
            }


            <div>
                {iteracion}
            </div>
            <button className="bg-blue-500" onClick={
                (event)=> {
                    console.log(event);
                    setIteracion(iteracion + 1);
                }
            }> Aumentar </button>
        </>
    )
}