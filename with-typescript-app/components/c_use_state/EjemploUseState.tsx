// componentes/c_use_state/EjemploUseState.tsx
import {useEffect, useState} from "react";

interface Usuario {
    nombre: string;
    edad: number;
    casado: boolean;
    hijos?: number[];
}

export default function () {
    const [numero, setNumero] = useState(0);
    const [nombre, setNombre] = useState("");
    const [arregloNumeros, setArregloNumeros] = useState([1, 2, 3] as number[]);
    const [usuario, setUsuario] = useState({
        nombre: "Adrian",
        edad: 33,
        casado: true,
    } as Usuario)

    // ayuda escuchar cambios variables
    useEffect(
        ()=>{
            console.log('INICIO EL COMPONENTE', numero, usuario);
        },
        []  // arregloVariables
        // Si esta vacio se ejecuta al principio una vez
    );
    useEffect(
        ()=>{
            console.log('Cambio numero', numero);
        },
        [numero]  // arregloVariables
    );
    useEffect(
        ()=>{
            console.log('Cambio arregloNumeros', arregloNumeros);
        },
        [arregloNumeros]  // arregloVariables
    );
    useEffect(
        ()=>{
            console.log('Cambio usuario', usuario);
        },
        [usuario]  // arregloVariables
    );

    useEffect(
        ()=>{
            console.log('Cambio todo', numero, arregloNumeros, usuario);
        },
        [numero, arregloNumeros, usuario]  // arregloVariables
    );


    return (<>
        <button className="bg-blue-500 m-2" onClick={(event)=>{
            event.preventDefault(); // Previene el comportamiento por defecto
            setNumero(numero + 1);
        }}
        >
            Numero</button>
        <button className="bg-blue-500 m-2" onClick={(event)=>{
            event.preventDefault(); // Prevenir que se recargue la pagina
            setArregloNumeros([...arregloNumeros, 1]);
        }}
        >
            Arreglo</button>
        <button className="bg-blue-500 m-2" onClick={(event)=>{
            event.preventDefault();
            let usuarioNuevo = {...usuario, nombre: new Date().toString()};
            setUsuario(usuarioNuevo);
        }}
        >
            Usuario</button>
    </>)
}