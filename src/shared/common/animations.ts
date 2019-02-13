import { keyframes } from 'styled-components';

export const spin = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const fade = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: .25;
    }

    100% {
        opacity: 1;
        
    }
`;
