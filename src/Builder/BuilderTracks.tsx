import React, { useContext } from 'react';
import styled from 'styled-components';

import BuilderTrack from './BuilderTrack';
import AppContext from '../App/AppContext';
import { Tracks, Track } from '../shared/models/track';
import Colors from '../shared/common/colors';

export interface BuilderTracksProps {
    className?: string;
    playlist?: Tracks;
}

const BuilderTracks = styled.div`
    border-right: 1px solid ${Colors.Gray._400};
    display: flex;
    height: 100%;
`;

const BuilderTrackList = styled.ul`
    flex: 1 1 auto;
    overflow: auto;

    > li:not(:last-child) {
        border-bottom: 1px solid ${Colors.Gray._700};
    }
`;

export const BuilderComponent = (props: BuilderTracksProps) => {
    const { className, playlist } = props;
    const trackDigits = (playlist.length + '').length;
    return (
        <BuilderTracks className={className}>
            <BuilderTrackList>
                {playlist.map((t: Track, i: number) => (
                    <li key={i}>
                        <BuilderTrack index={i} track={t} trackDigits={trackDigits} />
                    </li>
                ))}
            </BuilderTrackList>
        </BuilderTracks>
    );
};

export const mapContextToProps = (p: BuilderTracksProps): BuilderTracksProps => {
    const c = useContext(AppContext);
    return {
        playlist: c.playlist,
        ...p
    };
};

export default styled((p: BuilderTracksProps) => <BuilderComponent {...mapContextToProps(p)} />)``;
