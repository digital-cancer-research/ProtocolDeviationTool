import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidateNameTaken(names: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (names.includes(control.value)) {
            return { nameIsTaken: true };
        }
        return null;
    };
}
