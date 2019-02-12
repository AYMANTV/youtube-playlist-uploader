import React from 'react';
import ReactDOM from 'react-dom';
import Builder from './Builder';

describe('Builder', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Builder />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
