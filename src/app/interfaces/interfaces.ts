export interface Conversion {
    origen: string;
    origenTit: string;
    destino: string;
    destinoTit: string;
    equivalencia: number;
}


export interface Operacion {
  cantidadOriginal: number,
  cantidadResultado: number,
  unidadOrigen: string,
  unidadDestino: string
}