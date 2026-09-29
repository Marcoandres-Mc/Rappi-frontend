import { apiFetch } from "./api";
import type {
  RouteRequest,
  RouteResult,
} from "@/types/route";

export async function calculateRoute(
  request: RouteRequest
): Promise<RouteResult> {
  return apiFetch("/routes/calculate", {
    method: "POST",
    body: JSON.stringify(request),
  });
}