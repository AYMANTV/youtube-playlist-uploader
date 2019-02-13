import React, { useContext } from 'react';
import styled from 'styled-components';

import AppContext from '../App/AppContext';
import Button from '../shared/components/Button/Button';
import Loader from '../shared/components/Loader/Loader';
import Logo from '../shared/components/Logo/Logo';
import Colors from '../shared/common/colors';

export interface GetStartedProps {
    onStart: () => void;
    loading: boolean;
}

const GetStarted = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem;
    width: 100%;

    .get-started__logo {
        margin-bottom: 1rem;
        text-align: center;
    }

    .get-started__copy {
        color: ${Colors.Gray._400};
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 3rem;
        text-align: center;
    }
`;

export const GetStartedComponent = (props: GetStartedProps) => {
    const { loading, onStart } = props;

    if (loading) return <Loader />;

    return (
        <GetStarted>
            <Logo className="get-started__logo" />
            <p className="get-started__copy">Convert an iTunes™ playlist from XML or M3U to a playlist on YouTube™.</p>
            <Button label="Get Started" onClick={onStart} />
        </GetStarted>
    );
};

export const mapContextToProps = (): GetStartedProps => {
    const c = useContext(AppContext);
    return {
        loading: c.initializing,
        onStart: c.initialize
    };
};

export default () => <GetStartedComponent {...mapContextToProps()} />;
