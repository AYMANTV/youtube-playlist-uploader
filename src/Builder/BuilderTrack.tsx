import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import { Track } from '../Uploader/Uploader';
import yt, { SearchResult } from '../shared/youtube.service';
import Button from '../shared/Button/Button';

export interface BuilderTrackProps {
    track: Track;
}

const BTrack = styled.div`
    border: none;
`;

const BTrackLabel = styled.span``;

function useSearch(track: Track, defaultResults: SearchResult[] = []) {
    const [results, updateResults] = useState(defaultResults);
    const search = async (t: Track) => {
        const results = await yt.search(`${track.artist} ${track.name} ${track.album}`);
        updateResults(results);
    };
    useEffect(() => {
        search(track);
    }, [track]);

    return results;
}

export default (props: BuilderTrackProps) => {
    const { track } = props;
    const results = useSearch(track);
    const [videoId, updateVideoId] = useState(null);

    // @todo: what's going on with this `any` typing?
    const onPreviewClick = (r: SearchResult): any => (e: MouseEvent) => {
        e.preventDefault();
        updateVideoId(r.id);
    };

    return (
        <BTrack>
            <h2>
                {track.artist} - {track.name}
            </h2>
            <ul>
                {results.map(r => (
                    <li key={r.id} title={r.description}>
                        <BTrackLabel>{r.title}</BTrackLabel>
                        <Button onClick={onPreviewClick(r)} label="Preview" />
                        <Button onClick={r => console.log(r)} label="Use" />
                    </li>
                ))}
            </ul>
            {videoId && <YouTube videoId={videoId} />}
        </BTrack>
    );
};
