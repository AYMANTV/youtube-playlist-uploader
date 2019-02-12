import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

interface InputProps {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    label?: string;
    value?: string;
    name?: string;
    className?: string;
}

const Button = styled.button`
    border: 0.125rem solid #ccc;
    border-radius: 0.25rem;
`;

export default ({ className, label, ...p }: InputProps) => (
    <Button className={classnames('input', className)} {...p}>
        {label}
    </Button>
);
