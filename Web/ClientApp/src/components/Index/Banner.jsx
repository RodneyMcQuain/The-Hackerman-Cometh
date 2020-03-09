import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import { useAddCssClass } from '../../services/useAddCssClass';
import '../../styles/banner.scss';

const backgroundImage = `linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
), url(banner-image.jpg)`;

const Banner = () => {
    const [fadeHeader, fadeText] = useBannerFade();
    const bannerTextClasses = `banner-text hide ${fadeText}`;

    return (
        <header
            style={{ backgroundImage: backgroundImage }}
            id="banner-img"
        >
            <div id="banner-container">
                <h1 id="banner-header" className={`hide ${fadeHeader}`}>The Hackerman Cometh</h1>
                <p className={bannerTextClasses}>
                    We aim to educate the next generation of white hat hackers
                </p>
                <p className={bannerTextClasses}>
                    <Link to="log-in">Log In</Link>
                    &nbsp;
                    or
                    &nbsp;
                    <Link to="sign-up">Sign Up</Link>
                    &nbsp;
                    to increase your knowledge of computer security
                </p>
            </div>
        </header>
    );
};

const useBannerFade = () => {
    const [mightBeHeaderTransition, shouldAddHeaderTransition] = useAddCssClass("appear");
    const [mightBeTextTransition, shouldAddTextTransition] = useAddCssClass("appear");

    useEffect(() => {
        const headerTimer = setTimeout(() => shouldAddHeaderTransition(true), 250);
        const textTimer = setTimeout(() => shouldAddTextTransition(true), 1500);

        return () => {
            clearTimeout(headerTimer);
            clearTimeout(textTimer);
        };
    }, []);

    return [mightBeHeaderTransition, mightBeTextTransition];
};

export default Banner;
