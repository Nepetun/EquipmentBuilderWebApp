import { ValidatorFn, FormGroup } from '@angular/forms';

export const RequiredFieldsValidator: ValidatorFn = (fg: FormGroup) => {
    const userName = fg.get('userName').value;
    const password = fg.get('password').value;
    const email = fg.get('email').value;
    const firstName = fg.get('firstName').value;
    const surname = fg.get('surname').value;
    const dateOfBirth = fg.get('dateOfBirth').value;

    //konwersja na konretny typ

    if (userName !== null
    && password !== null
    && email !== null
    && firstName !== null
    && surname !== null
    && dateOfBirth !== null) {
        return null;
    } else {
        return  { requiredFieldsValidatorInvalid : true};
    }

}



