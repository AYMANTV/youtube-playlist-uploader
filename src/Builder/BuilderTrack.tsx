import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import yt, { YTSearchResult } from '../shared/services/youtube/youtube.service';
import Button from '../shared/components/Button/Button';
import { Track } from '../shared/models/track';
import AppContext from '../App/AppContext';

export interface BuilderTrackProps {
    index: number;
    isActive: boolean;
    isComplete: boolean;
    track: Track;
    setActiveTrack: (t: number) => void;
    setTrackVideoId: (t: number, id: string) => void;
    setVideoPreviewId: (id: string) => void;
}

const BTrack = styled.div`
    border: none;
`;

const BTrackLabel = styled.span``;

function useSearch(track: Track, isActive: boolean, defaultResults: YTSearchResult[] = []) {
    const [results, updateResults] = useState(defaultResults);
    const search = async (t: Track) => {
        const r = await yt.search(`${t.artist} ${t.name} ${t.album}`);
        updateResults(r);
    };
    useEffect(() => {
        if (isActive) search(track);
    }, [track, isActive]);

    return results;
}

export const BuilderTrackComponent = (props: BuilderTrackProps) => {
    const { track, isActive, isComplete, setActiveTrack, setVideoPreviewId, setTrackVideoId, index } = props;
    const results = useSearch(track, isActive);
    const onTrackClick = () => setActiveTrack(index);
    const onPreviewClick = (r: YTSearchResult) => () => setVideoPreviewId(r.id);
    const onUseClick = (r: YTSearchResult) => () => setTrackVideoId(index, r.id);

    return (
        <BTrack>
            <h2>
                <a onClick={onTrackClick}>
                    {track.artist} - {track.name}
                </a>
                {isComplete && <i>√</i>}
            </h2>
            <ul>
                {isActive &&
                    results.map(r => (
                        <li key={r.id} title={r.description}>
                            <BTrackLabel>{r.title}</BTrackLabel>
                            <Button onClick={onPreviewClick(r)} label="Preview" />
                            <Button onClick={onUseClick(r)} label="Use" />
                        </li>
                    ))}
            </ul>
        </BTrack>
    );
};

export interface BuilderTrackMapProps {
    index: number;
    track: Track;
}

export const mapContextToProps = (p: BuilderTrackMapProps): BuilderTrackProps => {
    const c = useContext(AppContext);
    return {
        index: p.index,
        isActive: p.index === c.activeTrack,
        isComplete: c.videoIds[p.index] ? true : false,
        setActiveTrack: (t: number) => c.setContext({ activeTrack: t }),
        setTrackVideoId: (t: number, id: string) => c.setContext({ videoIds: { ...c.videoIds, [t]: id } }),
        setVideoPreviewId: (id: string) => c.setContext({ videoPreviewId: id }),
        track: p.track
    };
};

export default (p: BuilderTrackMapProps) => <BuilderTrackComponent {...mapContextToProps(p)} />;
