import React, { MouseEvent } from 'react';
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

export enum ButtonSize {
    Small = 'small',
    Medium = 'Medium'
}

interface ButtonProps {
    active?: boolean;
    className?: string;
    disabled?: boolean;
    kind?: ButtonKind;
    label?: string;
    name?: string;
    size?: ButtonSize;
    type?: ButtonType;
    value?: string;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const getButtonColor = (kind: ButtonKind): string => {
    switch (kind) {
        case ButtonKind.Secondary:
            return Colors.Orange._400;
        default:
            return Colors.Blue._400;
    }
};

const getButtonFontSize = (size: ButtonSize): string => {
    switch (size) {
        case ButtonSize.Small:
            return '1.25rem';
        default:
            return '2rem';
    }
};

const getButtonLineHeight = (size: ButtonSize): string => {
    switch (size) {
        case ButtonSize.Small:
            return '1.5rem';
        default:
            return '2rem';
    }
};

const getButtonPadding = (size: ButtonSize): string => {
    switch (size) {
        case ButtonSize.Small:
            return '.5rem 1rem';
        default:
            return '1rem 2rem';
    }
};

const getButtonAltColor = (_: ButtonKind): string => {
    return Colors.White;
};

const Button = styled.button.attrs((props: ButtonProps) => ({
    active: props.active,
    altColor: getButtonAltColor(props.kind),
    color: getButtonColor(props.kind),
    fontSize: getButtonFontSize(props.size),
    lineHeight: getButtonLineHeight(props.size),
    padding: getButtonPadding(props.size)
}))`
    background-color: ${props => (props.active ? props.color : props.altColor)};
    border: 1px solid ${props => props.color};
    border-radius: 0.5rem;
    color: ${props => (props.active ? props.altColor : props.color)};
    cursor: pointer;
    font-family: inherit;
    font-size: ${props => props.fontSize};
    line-height: ${props => props.lineHeight};
    padding: ${props => props.padding};
    transition-duration: 100ms;
    transition-property: background, color;
    transition-timing-function: linear;

    :hover:not(:disabled) {
        background-color: ${props => props.color};
        color: ${props => props.altColor};
    }

    :disabled {
        border-color: ${Colors.Gray._400};
        color: ${Colors.Gray._400};
    }

    :focus {
        /* @todo: add a focus state */
        outline: 0;
    }
`;

export default styled(({ className, label, type = ButtonType.Button, ...p }: ButtonProps) => (
    <Button className={classnames('button', className)} type={type} {...p}>
        {label}
    </Button>
))``;
