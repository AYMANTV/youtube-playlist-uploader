import React from 'react';
import ReactDOM from 'react-dom';
import BuilderNav from './BuilderNav';

describe('BuilderNav', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BuilderNav />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
