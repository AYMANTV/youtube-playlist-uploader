import React, { useContext } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

import AppContext from '../App/AppContext';
import BuilderSubmit from './BuilderSubmit';

export interface BuilderNavProps {}

const BuilderNav = styled.nav`
    border: none;
`;

export const BuilderNavComponent = (props: BuilderNavProps) => {
    return (
        <BuilderNav>
            <BuilderSubmit />
        </BuilderNav>
    );
};

export const mapContextToProps = (): BuilderNavProps => {
    const c = useContext(AppContext);
    return {};
};

export default () => <BuilderNavComponent {...mapContextToProps()} />;
