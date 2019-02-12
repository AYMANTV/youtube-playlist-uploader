import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

export enum ButtonType {
    Button = 'button',
    Submit = 'submit'
}

interface InputProps {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    label?: string;
    value?: string;
    name?: string;
    className?: string;
    type?: ButtonType;
}

const Button = styled.button`
    border: 0.125rem solid #ccc;
    border-radius: 0.5rem;
`;

export default ({ className, label, type = ButtonType.Button, ...p }: InputProps) => (
    <Button className={classnames('input', className)} type={type} {...p}>
        {label}
    </Button>
);
