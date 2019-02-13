import React from 'react';
import ReactDOM from 'react-dom';
import UploadPlaylist from './UploadPlaylist';

describe('UploadPlaylist', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<UploadPlaylist />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
