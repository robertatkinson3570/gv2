interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export async function http<T>(request: RequestInfo, init?: RequestInit): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${request}`, init);
  response.parsedBody = await response.json();
  return response;
}
