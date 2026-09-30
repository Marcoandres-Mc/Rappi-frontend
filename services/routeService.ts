import { apiFetch } from "./api";


// =========================================================
// TIPOS
// =========================================================

export interface RouteRequest {
  ubicacion_inicial: string;

  algoritmo:
    | "fuerzaBruta"
    | "backtracking"
    | "divideVencenas";

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

  algoritmo:
    | "fuerzaBruta"
    | "backtracking"
    | "divideVencenas";

  criterio: string;

  origen: RoutePoint;

  destinos: number[];

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


// =========================================================
// CALCULAR RUTA
// =========================================================

export async function calculateRoute(
  request: RouteRequest
): Promise<RouteResult> {

  const response = await apiFetch(
    "/routes/repartidor",
    {
      method: "POST",

      body: JSON.stringify(request),
    }
  );

  return response as RouteResult;
}


// =========================================================
// OBTENER INFORMACIÓN DEL GRAFO
// =========================================================

export async function getGraphInfo() {

  return apiFetch(
    "/routes/grafo",
    {
      method: "GET",
    }
  );
}