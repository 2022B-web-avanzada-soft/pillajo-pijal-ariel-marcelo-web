import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {initSupabase} from "../../../../supabase/init.supabase";
import {CategoriaModelo} from "../../../modelos/categoria.modelo";

@Injectable({
  providedIn: 'root'
})
export class CategoriaAPIService {

  supabaseClient: SupabaseClient = createClient(
    initSupabase.url as string,
    initSupabase.key as string
  )

  TABLA_CATEGORIA = 'Categoria';

  constructor() { }

  // Read All
  async readCategorias() {
    const { data, error } = await this.supabaseClient
      .from<CategoriaModelo>(this.TABLA_CATEGORIA)
      .select()
    return { data, error };
  }

  // Read By ID
  async readCategoriaPorID(id_categoria: number) {
    const { data, error } = await this.supabaseClient
      .from<CategoriaModelo>(this.TABLA_CATEGORIA)
      .select()
      .eq('id_categoria', id_categoria)
      .single()
    return { data, error };
  }

}
