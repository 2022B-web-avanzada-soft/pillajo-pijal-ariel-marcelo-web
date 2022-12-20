let nombre: string = "Peter";
let nombre2: String = "Peter2";
// tsc 01-variables.ts --target es3  convierte a var y no a let
// tsc 01-variables.ts --target es6  converte a let y no a var

let edad: number = 30;
let casado: boolean = false;
let fecha: Date = new Date();
let sueldo: number = 12.4;

let apellido: string | number = "Parker";
apellido.toUpperCase();
apellido = 123;
apellido as number;
// any
let marihuana: any = 2;


