export function validateNotEmpty(val: string) {
  return !!val || t("warning.requiredField");
}
