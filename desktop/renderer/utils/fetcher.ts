export const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    // credentials: "same-origin",
    credentials: "include",
  }).then((res) => res.json());
