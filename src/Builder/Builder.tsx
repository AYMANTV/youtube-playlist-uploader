import React, { useState } from 'react';
import styled from 'styled-components';
import { Playlist } from '../Uploader/Uploader';
import BuilderTrack from './BuilderTrack';

export interface BuilderProps {
    playlist: Playlist;
}

const Builder = styled.form`
    border: none;
`;

export default (props: BuilderProps) => {
    const { playlist } = props;
    const [currentIndex, setCurrentIndex]: [number, (i: number) => void] = useState(0);

    return (
        <Builder>
            <BuilderTrack track={playlist[currentIndex]} />
        </Builder>
    );
};
