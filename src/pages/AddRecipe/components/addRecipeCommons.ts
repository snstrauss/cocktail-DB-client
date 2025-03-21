export function requiredFieldValidation(value: string, errorMessage: string) {
  if (!value) {
    return errorMessage;
  }
}
