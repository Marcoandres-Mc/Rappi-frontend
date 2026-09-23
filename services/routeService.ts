import type { RouteRequest, RouteResult } from "../types/route";

export async function calculateRoute(
  request: RouteRequest
): Promise<RouteResult> {

  console.log("Solicitud enviada:", request);

  // Simulación temporal del backend
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    distance: 4.2,
    estimatedTime: 14,
    nodesVisited: 38,
    routeNodes: [1023, 1045, 1088, 1102, 1140],
    algorithm: request.algorithm,
  };
}