import * as React from 'react';

interface EmailValidationTextProps {
    isEmailValid: boolean;
    isEmailDuplicate: boolean;
    setArrayValidity: Function;
}

export const EmailValidationText = (props: EmailValidationTextProps) => {
    const { isEmailValid, isEmailDuplicate } = props;

    let emailValidationArray = [isEmailValid, isEmailDuplicate];

    const validationClassNames = props.setArrayValidity(emailValidationArray);

    return (
        <>
            <p className={validationClassNames[0]}>Email is valid</p>
            <p className={validationClassNames[1]}>Email is available</p>
        </>
    );
};