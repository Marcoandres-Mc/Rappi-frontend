import { apiFetch } from "@/services/api";

import type {
  AlgorithmsInfo,
  DeliveryAlgorithm,
  DeliveryRouteRequest,
  DeliveryRouteResponse,
  RouteRequest,
  RouteResponse,
} from "@/types/route";

// Ruta directa: Dijkstra
export function calculateRoute(
  request: RouteRequest
): Promise<RouteResponse> {
  return apiFetch<RouteResponse>("routes/calculate", {
    method: "POST",
    body: JSON.stringify({
      ...request,
      algorithm: "dijkstra",
    }),
  });
}

// Múltiples entregas: Fuerza Bruta, Backtracking o Divide y Vencerás
export function calculateDeliveries(
  request: DeliveryRouteRequest
): Promise<DeliveryRouteResponse> {
  return apiFetch<DeliveryRouteResponse>("/routes/deliveries", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

// Comparar algoritmos con el mismo conjunto de entregas
export async function compareAlgorithms(
  request: DeliveryRouteRequest
) {
  const algorithms: DeliveryAlgorithm[] = [
    "brute_force",
    "backtracking",
    "divide_conquer",
  ];

  const algorithmsToRun =
    request.destinations.length > 8
      ? algorithms.filter((algorithm) => algorithm !== "brute_force")
      : algorithms;

  const results = await Promise.all(
    algorithmsToRun.map(async (algorithm) => {
      try {
        const result = await calculateDeliveries({
          ...request,
          algorithm,
        });

        return {
          algorithm,
          result,
          error: null,
        };
      } catch (error) {
        return {
          algorithm,
          result: null,
          error:
            error instanceof Error
              ? error.message
              : "No se pudo calcular el algoritmo.",
        };
      }
    })
  );

  return results;
}

// Consultar algoritmos disponibles
export function obtenerAlgoritmos(): Promise<AlgorithmsInfo> {
  return apiFetch<AlgorithmsInfo>("/routes/");
}

// Convertir "08:00" a 8
export function horaAEntero(hora: string): number {
  return Number.parseInt(hora.split(":")[0], 10);
}