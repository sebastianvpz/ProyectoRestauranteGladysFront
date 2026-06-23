import { getServerEnv } from "@/lib/env";
import { HttpError, UnauthorizedError } from "@/lib/http/errors";
import { getAdminSession } from "@/app/admin/_lib/session";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
  signal?: AbortSignal;
};

const DEFAULT_TIMEOUT_MS = 15_000;

export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const env = getServerEnv();
  const url = buildUrl(env.apiUrl, path);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  if (options.signal) {
    options.signal.addEventListener("abort", () => controller.abort());
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...options.headers,
  };
  if (options.body !== undefined && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (env.apiToken) {
    headers.Authorization = `Bearer ${env.apiToken}`;
  } else {
    try {
      const session = await getAdminSession();
      if (session?.token) {
        console.log("Enviando petición a " + url + " CON Token JWT (email: " + session.email + ")");
        headers.Authorization = `Bearer ${session.token}`;
      } else {
        console.log("Enviando petición a " + url + " SIN Token (sesión no tiene token)");
      }
    } catch (e) {
      console.log("Enviando petición a " + url + " SIN Token (Error al leer sesión)");
    }
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: options.method ?? "GET",
      headers,
      body:
        options.body === undefined
          ? undefined
          : options.body instanceof FormData
            ? options.body
            : JSON.stringify(options.body),
      cache: options.cache,
      next: options.next,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    throw new HttpError(
      err instanceof Error ? err.message : "Network error",
      0,
    );
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 401) throw new UnauthorizedError();
  if (!response.ok) {
    const body = await safeJson(response);
    throw new HttpError(
      `Request failed: ${response.status} ${response.statusText}`,
      response.status,
      body,
    );
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

function buildUrl(base: string, path: string): string {
  if (!base) {
    throw new HttpError("API URL is not configured (NEXT_PUBLIC_API_URL)", 0);
  }
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

async function safeJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
