export * from "./host";
export * from "./query";
export * from "./notify";

export function increment(value: number) {
  return (value += 1);
}

export function decrement(value: number) {
  return (value -= 1);
}

export function loga(value: string | number | object) {
  console.log(value);
}

export function parseErrorMessage(value: string): string {
  return value.replace("is a required field", "");
}

export function parseToPlural(element: string[] | number[]): number {
  const SINGULAR = 1;
  const PLURAL = 2;
  return element.length > SINGULAR ? PLURAL : SINGULAR;
}

export function validateNotEmpty(val: string) {
  return !!val || t("warning.requiredField");
}
