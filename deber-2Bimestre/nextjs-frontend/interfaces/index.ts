// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}
export type SolicitudPartidaForm  ={
  salaId: string;
  nombre: string;
}
export interface ResponseSolicitudPartida {
  message: string;
  mazo_id: string | null;
}
export interface Carta {
  code: string;
  image: string;
  images: {
    svg: string;
    png: string;
  }
  value: string;
  suit: string;
}
export interface ResponseCartas {
  success: boolean;
  deck_id: string;
  cards: Carta[];
  remaining: number;
}

