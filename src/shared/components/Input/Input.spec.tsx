import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';

describe('Input', () => {
    const noop = () => {};
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Input onChange={noop} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
