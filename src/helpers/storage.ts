/**
 * Busca o item definido no `.env`
 * @returns {string} o item do localStorage identificado com a chave definida no `.env`
 */
function getKeyToken(): string {
  return import.meta.env.VITE_APP_STORAGE_KEY as string;
}

/**
 * Busca um item no localStorage, caso não possua uma chave, será buscado o default, definido no `.env`
 * @param {string} key - ID do item a ser retornado, ou será buscado o item cuja chave esteja no `.env`
 * @returns {string}
 */
export function getItemStorage(key?: string): string {
  if (key !== null) {
    return localStorage.getItem(key as string) as string;
  }
  return localStorage.getItem(getKeyToken()) as string;
}

/**
 * Define um item do localStorage
 * @param {string} token - ID do token a ser definido
 * @returns {void}
 */
export function setTokenStorage(token: string): void {
  localStorage.setItem(getKeyToken(), token);
}

/**
 * Remove um item do localStorage
 */
export function removeToken(): void {
  localStorage.removeItem(getKeyToken());
}
/**
 * Remove todos os itens do local storage
 */
export function clearStorage(): void {
  localStorage.clear();
}

export function getTokenStorage(): string | null {
  return localStorage.getItem(getKeyToken());
}
