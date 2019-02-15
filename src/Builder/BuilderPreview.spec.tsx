import React from 'react';
import ReactDOM from 'react-dom';
import BuilderPreview from './BuilderPreview';

describe('BuilderPreview', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BuilderPreview />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
