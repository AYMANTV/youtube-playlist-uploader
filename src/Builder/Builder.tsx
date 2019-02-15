import React, { useContext } from 'react';
import styled from 'styled-components';

import AppContext from '../App/AppContext';
import BuilderPreview from './BuilderPreview';
import BuilderNav from './BuilderNav';
import BuilderTracks from './BuilderTracks';

export interface BuilderProps {
    className?: string;
}

const BuilderContent = styled.section`
    display: flex;
    flex: 1 1 auto;
    height: 0;

    ${BuilderTracks} {
        flex: 0 1 auto;
        width: 60rem;
    }

    ${BuilderPreview} {
        flex: 1 1 auto;
    }
`;

export const BuilderComponent = (props: BuilderProps) => {
    const { className } = props;
    return (
        <form className={className}>
            <BuilderContent>
                <BuilderTracks />
                <BuilderPreview />
            </BuilderContent>
            <BuilderNav />
        </form>
    );
};

export const mapContextToProps = (p: BuilderProps): BuilderProps => {
    const c = useContext(AppContext);
    return {
        ...p
    };
};

export default styled((p: BuilderProps) => <BuilderComponent {...mapContextToProps(p)} />)`
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100vh;
    width: 100%;

    ${BuilderNav} {
        flex: 0 0 auto;
        width: 100%;
    }
`;
