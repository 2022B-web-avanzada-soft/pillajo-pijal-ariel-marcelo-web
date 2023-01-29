// h_react_hook_form
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Layout from "../components/Layout";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

type FormularioEjemplo = {
    nombre: string;
    estadoCivil: string;
}
export default function () {
    const [nombre, setNombre] = useState('Adrian');

    const {handleSubmit, register, formState: {errors, isValid},
        control
    } = useForm<FormularioEjemplo>(
        {
            defaultValues: {
                nombre: 'Vicente',
                estadoCivil: ''
            },
            mode: 'all'
        }
    )
    const controladorSubmit = (data: FormularioEjemplo) => {
        console.log(data)
    }
    return (<>
        <Layout title={'Formulario'}>
            <h1>Formulario con react Hook Form</h1>
            <form onSubmit={handleSubmit(controladorSubmit)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text"
                           className="form-control"
                           placeholder="EJ: Adrian"
                           id="nombre"
                           {...register('nombre', {
                               required: {
                                   value: true,
                                   message: 'nombre requerido'
                               },
                               maxLength: {value: 20, message: 'Longitud maxima 20'},
                               minLength: {value: 5, message: 'Longitud minima 5'},
                               validate: {
                                   soloNumeros:(valorActual) => {
                                       // Transformar a numero un string:
                                       // Number("1")
                                       // +"1"
                                       if (Number.isNaN(+valorActual)) {
                                           // Se puede devolver un false o un mensaje de error
                                           // return false; // Error
                                           return 'Ingrese solo numeros'; // Error
                                       } else {
                                           // Se devuelve un true
                                           return true; // Esta correcto
                                       }
                                   }
                               }
                           })}
                           aria-describedby="nombreHelp"/>
                    <div id="nombreHelp" className="form-text">
                        Ingresa tu nombre.
                    </div>
                    {errors.nombre &&
                        <div className="alert alert-warning"
                             role="alert">
                            Tiene errores {errors.nombre.message}
                        </div>
                    }
                </div>
                <div className="mb-3">
                    <FormControl fullWidth>
                        <InputLabel id="estadoCivilLabelId">Estado civil</InputLabel>
                        <Controller
                            control={control}
                            rules={{ required: {value: true, message: 'Estado C. requerido'}}}
                            name="estadoCivil"
                            render={
                                ({field: {onChange, value, onBlur,}}) => {
                                    return <Select
                                        labelId="estadoCivilLabelId"
                                        id="estadoCivilId"
                                        label="Estado Civil"
                                        onBlur={onBlur}
                                        value={value}
                                        onChange={onChange}
                                    >
                                        <MenuItem value={'casado'}>Casado</MenuItem>
                                        <MenuItem value={'soltero'}>Soltero</MenuItem>
                                    </Select>
                                }
                            }
                        />
                        {/*Termina controller*/}
                        {errors.estadoCivil &&
                            <div className="alert alert-warning" role="alert">
                                Tiene errores {errors.estadoCivil.message}
                            </div>
                        }
                    </FormControl>
                </div>
                <Button type="submit"
                        disabled={!isValid}
                        variant='outlined'>Submit</Button>
            </form>
        </Layout>

    </>)
}

