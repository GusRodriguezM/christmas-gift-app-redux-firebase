import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    
    html {
        box-sizing: border-box;
        font-size: 100%;
    }

    *, *::before, *::after {
        box-sizing: inherit;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Gentium Book Basic', serif;
    
        /*Making the background-image responsive*/
        background-image: url('https://images.unsplash.com/photo-1588158074612-37ee7e776f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80');
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        height: 100%;
        width: 100%;

        @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobileLargeLimit}) {
            width: 122.5%;
        }
        
        @media screen and (min-width: 435px) and (max-width: 459px){
            width: 117%;
        }
    }

    h1, h2, h3, h4 {
        font-weight: 400;
        line-height: 1.1;
        margin-top: 0;
        margin-bottom: 0;
    }

    h1 {
        //(28px, 16px + 2vw, 40px) / 16px
        font-size: clamp(1.75rem, 1rem + 2vw, 2.5rem);
    }

    h2 {
        //(22px, 14px + 2vw, 36px) / 16px
        font-size: clamp(1.375rem, 0.875rem + 1.5vw, 2.25rem);
    }

    h3, a {
        //(16px, 12px + 2vw, 32px) / 16px
        font-size: clamp(1rem, 0.75rem + 1vw, 2rem);
    }

    h4, span {
        //(10px, 10px + 2vw, 28px) / 16px
        font-size: clamp(0.625rem, 0.625rem + 0.5vw, 1.75rem);
    }

    p {
        margin-top: 0;
    }

    a, a:visited, a:active {
        text-decoration: none;
    }

    button {
        font-family: inherit;
    }

`;

export default GlobalStyles;