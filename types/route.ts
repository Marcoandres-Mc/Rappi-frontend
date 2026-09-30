export type Algorithm =
  | "fuerzaBruta"
  | "backtracking"
  | "divideVencenas";

export interface Location {
  id: string;
  name: string;
  address: string;

  // Distritos permitidos para el proyecto
  district: "Miraflores" | "San Isidro";

  // ID del nodo correspondiente en el grafo
  nodeId: string | number;

  coordinates: {
    lat: number;
    lon: number;
  };
}

export interface RouteRequest {
  ubicacion_inicial: string;
  algoritmo: Algorithm;
  destinos: number[];
}

export interface RoutePoint {
  id: string | number;
  lat: number;
  lon: number;
  distrito: string | null;
}

export interface RouteResult {
  mensaje: string;

  algoritmo: Algorithm;

  criterio: string;

  origen: RoutePoint;

  destinos: Array<string | number>;

  ruta: Array<string | number>;

  puntos_mapa: RoutePoint[];

  costo_total: number | null;

  estadisticas_grafo: {
    nodos: number;
    edges: number;
    dirigido: boolean;
    multigrafo: boolean;
  };
}