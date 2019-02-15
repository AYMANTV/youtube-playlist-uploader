import React, { ChangeEvent } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import Colors from '../../common/colors';

export enum InputType {
    Text = 'text',
    File = 'file'
}

interface InputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: InputType;
    value?: string;
    name?: string;
    className?: string;
}

const Input = styled.input`
    border: 1px solid ${Colors.Gray._500};
    box-sizing: border-box;
    font-size: 2rem;
    line-height: 3rem;
    padding: 0.5rem;
`;

export default styled(({ className, ...p }: InputProps) => (
    <Input className={classnames('input', className)} {...p} />
))``;
