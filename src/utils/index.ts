export function setTokenLocalStorage(token: string | null) {
  localStorage.setItem("token", JSON.stringify(token));
}

export function getTokenLocalStorage() {
  const json = localStorage.getItem("token");

  if (!json) {
    return null;
  }

  const token = JSON.parse(json);

  return token ?? null;
}
