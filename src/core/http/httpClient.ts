import { env } from '@/core/config/env';

type JsonPrimitive = string | number | boolean | null;
export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | { [key: string]: JsonValue };

export class HttpError extends Error {
  public readonly status: number;
  public readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

const buildUrl = (path: string) => new URL(path, env.apiBaseUrl).toString();

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(buildUrl(path), init);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new HttpError('Request failed', response.status, errorBody);
  }

  return (await response.json()) as T;
};

export const httpClient = {
  get: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { ...init, method: 'GET' }),
  post: <T, B extends JsonValue>(path: string, body: B, init?: RequestInit) =>
    request<T>(path, {
      ...init,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      body: JSON.stringify(body),
    }),
};
