import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import Colors from '../../common/colors';
import { spin, fade } from '../../common/animations';

interface LoaderProps {
    className?: string;
}

const Loader = styled.div`
    appearance: none;
    background: transparent;
    border: 1rem solid ${Colors.Gray._700};
    border-radius: 50%;
    height: 6rem;
    position: relative;
    width: 6rem;

    ::before {
        animation: ${spin} 1000ms linear infinite, ${fade} 1000ms linear infinite;
        background: ${Colors.Blue._400};
        border-radius: 50%;
        box-shadow: 0 0 0.5rem ${Colors.White};
        content: '';
        display: block;
        height: 2rem;
        left: 2rem;
        margin: -2rem;
        position: absolute;
        top: 4rem;
        transform-origin: 3rem;
        width: 2rem;
    }
`;

export default ({ className }: LoaderProps) => <Loader role="progressbar" className={classnames('input', className)} />;
