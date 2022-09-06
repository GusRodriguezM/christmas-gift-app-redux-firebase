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
        height: 100vh;
    }

    h1, h2, h3, h4 {
        font-weight: 400;
        line-height: 1.1;
        margin-top: 0;
        margin-bottom: 0;
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