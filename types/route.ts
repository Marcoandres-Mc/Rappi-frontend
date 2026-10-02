export interface Coordinate {
  lat: number;
  lon: number;
}

export type DeliveryAlgorithm =
  | "brute_force"
  | "backtracking"
  | "divide_conquer";

export type RouteMode = "direct" | "deliveries";

export interface RouteRequest {
  origin: Coordinate;
  destination: Coordinate;
  algorithm?: "dijkstra";
  traffic_hour?: number;
}

export interface DeliveryRouteRequest {
  origin: Coordinate;
  destinations: Coordinate[];
  algorithm: DeliveryAlgorithm;
  traffic_hour?: number;
  return_to_origin?: boolean;
}

export interface RouteResponse {
  algorithm: string;
  execution_time_ms: number;
  nodos_visitados: number;
  distancia_total_m: number;
  weighted_cost: number;
  path: Coordinate[];
}

export interface DeliveryRouteResponse {
  algorithm: string;
  execution_time_ms: number;
  matrix_time_ms: number;
  nodos_visitados: number;
  states_explored: number;
  branches_pruned: number;
  distancia_total_m: number;
  weighted_cost: number;
  delivery_order: number[];
  is_optimal: boolean;
  path: Coordinate[];
}

export interface AlgorithmsInfo {
  message: string;
  algorithms: {
    direct_route: string[];
    deliveries: {
      name: DeliveryAlgorithm;
      max_deliveries: number;
      optimal: boolean;
    }[];
  };
}

export interface Place {
  id: string;
  name: string;
  district: "Miraflores" | "San Isidro";
  coordinates: Coordinate;
}