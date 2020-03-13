import * as React from 'react';

interface UsernameValidationTextProps {
    isUsernameDuplicate: boolean;
    setArrayValidity: Function;
}

export const UsernameValidationText = (props: UsernameValidationTextProps) => {
    const { isUsernameDuplicate } = props;

    let usernameValidationArray = [isUsernameDuplicate];

    const validationClassNames = props.setArrayValidity(usernameValidationArray);

    return (
        <>
            <p className={validationClassNames[0]}>Username is available</p>
        </>
    );
};