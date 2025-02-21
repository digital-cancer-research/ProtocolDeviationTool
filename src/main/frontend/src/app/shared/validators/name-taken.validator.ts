import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidateNameTaken(names: string[], isCaseSensitive: boolean = true): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        var value = control.value.trim();
        if (isCaseSensitive) {
            names = names.map(name => name.trim());
        } else {
            names = names.map(name => name.toLowerCase().trim());
            value = value.toLowerCase();
        }
        if (names.includes(value)) {
            return { nameIsTaken: true };
        }
        return null;
    };
}
