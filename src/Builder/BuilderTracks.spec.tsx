import React from 'react';
import ReactDOM from 'react-dom';
import BuilderTracks from './BuilderTracks';

describe('BuilderTracks', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BuilderTracks />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
