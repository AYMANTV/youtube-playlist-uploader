import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

describe('Modal', () => {
    const noop = jest.fn();

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Modal open={false} onClose={noop} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
