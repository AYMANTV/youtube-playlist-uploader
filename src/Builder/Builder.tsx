import React, { useContext } from 'react';
import styled from 'styled-components';

import BuilderTrack from './BuilderTrack';
import AppContext from '../App/AppContext';
import { Tracks, Track } from '../shared/models/track';
import BuilderPreview from './BuilderPreview';
import BuilderNav from './BuilderNav';

export interface BuilderProps {
    playlist: Tracks;
}

const Builder = styled.form`
    display: flex;
    min-height: 100%;
    padding: 2rem;
    width: 100%;
`;

const BuilderTracks = styled.div``;

const BuilderTrackList = styled.ul``;

export const BuilderComponent = (props: BuilderProps) => {
    const { playlist } = props;
    return (
        <Builder>
            <BuilderTracks>
                <BuilderTrackList>
                    {playlist.map((t: Track, i: number) => (
                        <li key={i}>
                            <BuilderTrack index={i} track={t} />
                        </li>
                    ))}
                </BuilderTrackList>
            </BuilderTracks>
            <BuilderPreview />
            <BuilderNav />
        </Builder>
    );
};

export const mapContextToProps = (): BuilderProps => {
    const c = useContext(AppContext);
    return {
        playlist: c.playlist
    };
};

export default () => <BuilderComponent {...mapContextToProps()} />;
