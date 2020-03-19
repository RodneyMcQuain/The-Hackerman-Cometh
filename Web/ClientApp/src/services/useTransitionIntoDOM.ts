import { useLayoutEffect } from 'react';
import { useAddCssClass } from './useAddCssClass';

export const useTransitionIntoDOM = (cssClass: string): string => {
    const [mightAppear, shouldAppear] = useAddCssClass(cssClass);

    useLayoutEffect(() => {
        const appearTimeout = setTimeout(() => {
            shouldAppear(true);
        }, 0);

        return () => {
            clearTimeout(appearTimeout);
        }
    }, []);

    return mightAppear;
};