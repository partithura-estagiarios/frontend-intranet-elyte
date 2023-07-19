import { createClient, defaultPlugins } from "villus";
import { getEnvironmentVariable } from "../helpers";

// Creates a villus client instance
const hostMeta = <HTMLMetaElement>(
  document.querySelector('meta[name="config-backend_host"]')
);
const content = hostMeta?.content;

const backendHost =
  content && content !== "@unknown-host"
    ? content
    : getEnvironmentVariable("VITE_APP_ENDPOINT");

const url = backendHost;
export const villus = createClient({
  use: [...defaultPlugins()],
  url,
});
