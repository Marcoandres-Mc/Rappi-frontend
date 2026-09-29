export type Algorithm =
  | "brute_force"
  | "backtracking"
  | "divide_conquer";

export interface Coordinate {
  lat: number;
  lon: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  district: "Miraflores" | "San Isidro";
  coordinates: Coordinate;
}

export interface RouteRequest {
  origin: Coordinate;
  destination: Coordinate;
  algorithm: Algorithm;
}

export interface RouteResult {
  algorithm: string;
  distance_km: number | null;
  estimated_time_min: number | null;
  nodes_explored: number | null;
  branches_pruned: number | null;
  route: Coordinate[];
}