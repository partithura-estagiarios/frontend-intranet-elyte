export * from "./host";
export * from "./query";
export * from "./notify";
export * from "./storage";
export * from "./date";

export function increment(value: number) {
  return (value += 1);
}

export function decrement(value: number) {
  return (value -= 1);
}

export function loga(value: string | number | object | boolean) {
  console.log(value);
}

export function parseErrorMessage(value: string): string {
  return value.replace("is a required field", "");
}
