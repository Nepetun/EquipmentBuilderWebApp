import { AbstractControl } from "@angular/forms";

export function userNameValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^.+$/.test(control.value);

  if (valid) {
    return null;
  } else {
    return { required: { valid: false, value: control.value } };
  }
}

// import { ValidatorFn, FormGroup } from '@angular/forms';

// export const UserNameValidator: ValidatorFn = (fg: FormGroup) => {
//     const startD = fg.get('kontrolkaOd').value;
//     const endD = fg.get('kontrolkaDo').value;

//     //konwersja na konretny typ

//     return startD !== null && endD !== null && startD <= endD ? null : { nazwaWalidoatroaUzytegoWHtmlNaPoziomieFormy}
// }
