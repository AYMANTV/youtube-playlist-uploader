import React from 'react';
import ReactDOM from 'react-dom';
import BuilderSubmit from './BuilderSubmit';

describe('BuilderSubmit', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BuilderSubmit />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
