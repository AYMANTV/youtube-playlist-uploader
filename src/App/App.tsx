import React, { useState } from 'react';
import Uploader, { Playlist, Track } from '../shared/Uploader/Uploader';

import styled from 'styled-components';
import Builder from '../Builder/Builder';

const App = styled.div``;

export default () => {
    // @todo: add a YouTube login button to init the youtube service
    // @todo: remove this fixed data
    const [playlist, setPlaylist]: [Playlist, (p: Playlist) => void] = useState([
        { album: 'Depression Cherry', artist: 'Beach House', name: 'Levitation' } as Track,
        { album: 'The Life Pursuit', artist: 'Belle & Sebastian', name: 'Sukie In The Graveyard' } as Track
    ]);

    // When the upload is submitted, set the playlist data.
    const onUploadSubmit = p => setPlaylist(p);

    return (
        <App>
            {/* @todo: expand this to allow for M3U files */}
            <Uploader label="Upload iTunes XML" onSubmit={onUploadSubmit} />
            <Builder playlist={playlist} />
        </App>
    );
};
