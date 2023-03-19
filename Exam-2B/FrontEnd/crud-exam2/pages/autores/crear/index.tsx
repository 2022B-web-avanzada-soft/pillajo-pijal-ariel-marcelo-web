import React from 'react'
import ListDetail   from "../../../components/ListDetail";
import {Autor} from "../../../interfaces";

const NewAutor = () => {
    const item: Autor = {
        id: null,
        nombreAutor: '',
        fechaNacimiento: '',
        numeroLibros: null,
        fallecido: false,
        libros: []
    }
    return (
        <div>
            <ListDetail item={item} new={true}/>
        </div>
    )
}
export default NewAutor