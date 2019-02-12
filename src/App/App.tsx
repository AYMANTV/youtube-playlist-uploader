import React, { useState } from 'react';
import Uploader, { Playlist, Track } from '../Uploader/Uploader';

import styled from 'styled-components';
import Builder from '../Builder/Builder';

const App = styled.div``;

export default () => {
    const [playlist, setPlaylist]: [Playlist, (p: Playlist) => void] = useState([
        { album: 'Depression Cherry', artist: 'Beach House', name: 'Levitation' } as Track
    ]);
    return (
        <App>
            <Uploader label="Upload iTunes XML" onSubmit={p => setPlaylist(p)} />
            <Builder playlist={playlist} />
        </App>
    );
};
