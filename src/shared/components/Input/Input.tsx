import React from 'react';
import classnames from 'classnames';

export enum InputType {
    Text = 'text',
    File = 'file'
}

interface InputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: InputType;
    value?: string;
    name?: string;
    className?: string;
}

export default ({ className, ...p }: InputProps) => <input className={classnames('input', className)} {...p} />;
