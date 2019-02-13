import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import Colors from '../../common/colors';

export enum ButtonType {
    Button = 'button',
    Submit = 'submit'
}

export enum ButtonKind {
    Primary = 'primary',
    Secondary = 'secondary'
}

interface ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    label?: string;
    value?: string;
    name?: string;
    className?: string;
    type?: ButtonType;
    kind?: ButtonKind;
}

const getButtonColor = (kind: ButtonKind): string => {
    switch (kind) {
        case ButtonKind.Secondary:
            return Colors.Yellow._400;
        default:
            return Colors.Blue._400;
    }
};

const getButtonAltColor = (kind: ButtonKind): string => {
    return Colors.White;
};

const Button = styled.button.attrs((props: ButtonProps) => ({
    color: getButtonColor(props.kind),
    altColor: getButtonAltColor(props.kind)
}))`
    background-color: ${props => props.altColor};
    border: 0.125rem solid ${props => props.color};
    border-radius: 0.5rem;
    color: ${props => props.color};
    cursor: pointer;
    font-family: inherit;
    font-size: 2rem;
    padding: 1rem 2rem;
    transition-duration: 100ms;
    transition-property: background, color;
    transition-timing-function: linear;

    :hover {
        background-color: ${props => props.color};
        color: ${props => props.altColor};
    }
`;

export default ({ className, label, type = ButtonType.Button, ...p }: ButtonProps) => (
    <Button className={classnames('input', className)} type={type} {...p}>
        {label}
    </Button>
);
