import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviationService } from '../services/deviation.service';

export class DeviationValidators {
    static dvdecodIsValidForDvcat(deviationService: DeviationService, dvcat: string): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return deviationService.getDvdecodsByDvcat$(dvcat).pipe(
                map((dvdecods) =>
                    dvdecods.includes(control.value) ? null : { dvdecodIsNotValidForDvcat: false }
                )
            );
        }
    }
}
