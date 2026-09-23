export type OptimizationCriterion = 
  | "distance"
  | "time"
  | "traffic";

export type Algorithm =
  | "dijkstra"
  | "brute-force"
  | "backtracking"
  | "divide-conquer";

export interface RouteRequest {
  origin: string;
  destination: string;
  criterion: OptimizationCriterion;
  algorithm: Algorithm;
}

export interface RouteResult {
  distance: number;
  estimatedTime: number;
  nodesVisited: number;
  routeNodes: number[];
  algorithm: Algorithm;
}