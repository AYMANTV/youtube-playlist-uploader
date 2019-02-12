import React from 'react';
import ReactDOM from 'react-dom';
import BuilderTrack from './BuilderTrack';
import { Track } from '../shared/models/track';

describe('BuilderTrack', () => {
    let track: Track;

    beforeEach(() => {
        track = {
            album: 'Test',
            artist: 'Testars',
            name: 'A real hit'
        };
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BuilderTrack index={0} track={track} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
