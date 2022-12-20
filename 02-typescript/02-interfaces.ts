export interface B{



}
interface Usuario {
    nombre: string;
    apellido: string;
    edad?: number | undefined; //  opcional
    sueldo?: number; // opcional
    casado: boolean | 0 | 1;
    estado: 'AC' | 'IN' | 'BN';
    // funciones
    imprimirUsuario: (mensaje: string) => string | 'BN';
    calcularImpuesto: (impuesto: number) => number;
    estadoActual?: () => 'AP' | 'AF' | 'AT'; // opcional
    // calcularImpuesto parametro numero impuesto, sueldo + sueldo * impuesto
    // estadoActual no reciba parametros, 'AP' 'AF' 'AT'
}

let user: Usuario = {
    nombre: "Adrian",
    apellido: "Eguez",
    casado: 0,
    estado: 'BN',
    imprimirUsuario: (mensaje: string) => {
        return 'BN';
    },
    calcularImpuesto: (impuesto: number) => {
        return 12;
    }

}