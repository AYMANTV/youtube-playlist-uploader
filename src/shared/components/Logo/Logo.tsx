import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import Colors from '../../common/colors';

interface LogoProps {
    className?: string;
}

const Logo = styled.div`
    color: ${Colors.Gray._100};
    font-size: 3rem;
`;

export default ({ className }: LogoProps) => (
    <Logo className={classnames('input', className)}>YouTube™ Playlist Uploader</Logo>
);
