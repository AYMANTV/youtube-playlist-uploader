import React, { useContext } from 'react';
import styled from 'styled-components';

import AppContext from '../App/AppContext';
import BuilderSubmit from './BuilderSubmit';
import Colors from '../shared/common/colors';

export interface BuilderNavProps {
    className?: string;
}

const BuilderNav = styled.nav`
    border-top: 1px solid ${Colors.Gray._400};
    box-sizing: border-box;
    padding: 2rem;
    text-align: right;
`;

export const BuilderNavComponent = (props: BuilderNavProps) => {
    const { className } = props;
    return (
        <BuilderNav className={className}>
            <BuilderSubmit />
        </BuilderNav>
    );
};

export const mapContextToProps = (p: BuilderNavProps): BuilderNavProps => {
    const c = useContext(AppContext);
    return { ...p };
};

export default styled((p: BuilderNavProps) => <BuilderNavComponent {...mapContextToProps(p)} />)``;
