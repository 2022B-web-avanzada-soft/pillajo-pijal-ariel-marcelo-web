import Layout from "../../components/Layout";
import {useEffect, useState} from "react";
import {Todo, TodoHttp} from "../../servicios/http/todo.http";

export default function(){
    const [arregloTodos, setArregloTodos] =useState([] as Todo[])
    useEffect(
        ()=>{
            consultarTodos();
        },
        []
    )
    const consultarTodos = async ()=>{
        const resultado = await TodoHttp();
        setArregloTodos([
            ...arregloTodos,
            ...resultado]);
    }
    return(
        <>
            <Layout title={"to do´s"}>
                <h1>To Do`s</h1>
                {arregloTodos.map(
                    (todo: Todo)=>{
                        return (<li key={todo.id}>
                            {todo.id} - {todo.completed} -
                            <a href={'/estudiantes/'+ todo.id}>
                                {todo.title}
                            </a>
                        </li>)
                    }
                )}
            </Layout>
        </>
    )
}
