import React, { useContext } from 'react';
import styled from 'styled-components';
import BuilderTrack from './BuilderTrack';
import AppContext from '../App/AppContext';
import { Tracks, Track } from '../shared/models/track';
import BuilderSubmit from './BuilderSubmit';

export interface BuilderProps {
    isComplete: boolean;
    playlist: Tracks;
}

const Builder = styled.form`
    border: none;
`;

export const BuilderComponent = (props: BuilderProps) => {
    const { isComplete, playlist } = props;
    return (
        <Builder>
            {isComplete && <BuilderSubmit />}
            {playlist.map((t: Track, i) => (
                <BuilderTrack key={i} index={i} track={t} />
            ))}
        </Builder>
    );
};

export const mapContextToProps = (): BuilderProps => {
    const c = useContext(AppContext);
    return {
        isComplete: Object.keys(c.videoIds).length === c.playlist.length,
        playlist: c.playlist
    };
};

export default () => <BuilderComponent {...mapContextToProps()} />;
