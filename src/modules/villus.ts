import { createClient, defaultPlugins } from "villus";
import { getEnvironmentVariable } from "../helpers";

const hostMeta = <HTMLMetaElement>(
  document.querySelector('meta[name="config-backend_host"]')
);
const content = hostMeta?.content;
interface FetchOptions extends RequestInit {
  url?: string;
  headers: NonNullable<Record<string, string>>;
}
const backendHost =
  content && content !== "@unknown-host"
    ? content
    : getEnvironmentVariable("VITE_APP_ENDPOINT");

function authPlugin({ opContext }: { opContext: FetchOptions }) {
  const userStore = userStorage();
  opContext.headers.Authorization = userStore.user.token;
}
const url = backendHost;
export const villus = createClient({
  use: [authPlugin, ...defaultPlugins()],
  url,
});
