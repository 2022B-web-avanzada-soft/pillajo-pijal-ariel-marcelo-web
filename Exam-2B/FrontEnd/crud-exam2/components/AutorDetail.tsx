import { useState } from 'react';
import { Autor } from '../interfaces';
import { Button, TextField, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';

type ListDetailProps = {
    item: Autor,
    new?: boolean
}

function removeIdFromAutor(autor: Autor): AutorWithoutId {
    const { id, ...autorWithoutId } = autor;
    return autorWithoutId;
}

// Define un tipo para `Autor` sin la propiedad `id`
export type AutorWithoutId = Omit<Autor, 'id'>;

const ListDetail = ({ item: autor, new: nuevo }: ListDetailProps) => {
    const [editableAutor, setEditableAutor] = useState<Autor>(autor);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name, value);
        setEditableAutor(prevState => ({ ...prevState, [name]: value }));
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setEditableAutor(prevState => ({ ...prevState, [name]: checked }));
    }

    const handleSaveChanges = async () => {
        // Aquí iría el código para guardar los cambios en la base de datos
        console.log('Autor editado:', editableAutor);
        const autorNuevo = {
            nombreAutor: editableAutor.nombreAutor,
            fechaNacimiento: editableAutor.fechaNacimiento.toString(),
            numeroLibros: Number(editableAutor.numeroLibros),
            fallecido: editableAutor.fallecido
        }
        if (nuevo) {
            console.log('Autor creado:', autorNuevo);
            try {
                const response = await axios.post('http://localhost:3050/autor', autorNuevo);
                console.log(response.data); // Aquí puedes hacer lo que necesites con la respuesta del servidor
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('Autor editado:', autorNuevo);
            try {
                const res = await axios.put(`http://localhost:3050/autor/${Number(editableAutor.id)}`, autorNuevo);
                console.log(res.data);

            } catch (error) {
                console.error(error);
            }

        }
    }

    return (
        <div>
            {nuevo && <h1>Nuevo Autor</h1>}
            {nuevo == false && <h1>Detalle para  {autor.nombreAutor}</h1>}
            <TextField
                name="nombreAutor"
                label="Nombre"
                value={editableAutor.nombreAutor ?? ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="fechaNacimiento"
                label="Fecha de Nacimiento"
                value={editableAutor.fechaNacimiento ?? ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="numeroLibros"
                label="Número de Libros"
                type="number"
                value={editableAutor.numeroLibros ?? 0}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="fallecido"
                        checked={editableAutor.fallecido ?? false}
                        onChange={handleCheckboxChange}
                    />
                }
                label="Fallecido"
            />
            <Button
                variant="contained"
                onClick={handleSaveChanges}
                href={"/autores" }
            >Guardar cambios</Button>
        </div>
    );
}

export default ListDetail;
