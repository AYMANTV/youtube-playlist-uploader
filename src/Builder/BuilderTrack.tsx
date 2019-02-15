import React, { useState, useEffect, useContext, Fragment } from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import yt, { YTSearchResult } from '../YouTube/youtube.service';
import Button, { ButtonSize, ButtonKind } from '../shared/components/Button/Button';
import { Track } from '../shared/models/track';
import AppContext, { VideoIds, AppContextModel } from '../App/AppContext';
import Colors from '../shared/common/colors';

export interface BuilderTrackProps {
    className?: string;
    index?: number;
    isActive?: boolean;
    isComplete?: boolean;
    track?: Track;
    trackDigits?: number;
    videoIds?: VideoIds;
    videoPreview?: YTSearchResult;
    setActiveTrack?: (t: number) => void;
    setNextActiveTrack?: () => void;
    setTrackVideoId?: (t: number, id: string) => void;
    setVideoPreview?: (r: YTSearchResult) => void;
}

const BTrackItem = styled.li`
    box-sizing: border-box;
    display: flex;
    padding-left: 1rem;
    width: 100%;

    h3 {
        font-size: 1.5rem;
        flex: 1 1 auto;
        line-height: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    nav {
        flex: 0 0 auto;
        margin-left: 1rem;

        ${Button} {
            :not(:last-child) {
                margin-right: 0.5rem;
            }
        }
    }

    :not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const BTrackList = styled(
    posed.ul({
        closed: { height: 0 },
        open: { height: 'auto' }
    })
)`
    margin-top: 1rem;
    overflow: hidden;
`;

function useSearch(track: Track, isActive: boolean, defaultResults: YTSearchResult[] = []) {
    const [results, updateResults] = useState(defaultResults);
    const search = async (t: Track) => {
        if (results.length) return;
        const r = await yt.search(`${t.artist} ${t.name} ${t.album}`);
        updateResults(r);
    };
    useEffect(() => {
        if (isActive) search(track);
    }, [track && isActive && !results.length]);

    return results;
}

export const BuilderTrackComponent = (props: BuilderTrackProps) => {
    const {
        className,
        track,
        isActive,
        isComplete,
        setActiveTrack,
        setVideoPreview,
        setTrackVideoId,
        setNextActiveTrack,
        index,
        videoIds,
        videoPreview
    } = props;
    const results = useSearch(track, isActive);
    const onTrackClick = () => setActiveTrack(index);
    const onPreviewClick = (r: YTSearchResult) => () => setVideoPreview(r);
    const onUseClick = (r: YTSearchResult) => () => {
        setTrackVideoId(index, r.id);
        setNextActiveTrack();
    };
    return (
        <div className={className}>
            <h2>
                <a onClick={onTrackClick}>
                    <i>{index + 1}.</i> {track.artist} - {track.name}
                    {isComplete && <em>✓</em>}
                </a>
            </h2>
            <BTrackList pose={isActive && results.length ? 'open' : 'closed'}>
                {results.map(r => (
                    <BTrackItem key={r.id} title={r.description}>
                        <h3>{r.title}</h3>
                        <nav>
                            <Button
                                size={ButtonSize.Small}
                                active={videoPreview && videoPreview.id === r.id}
                                kind={ButtonKind.Secondary}
                                onClick={onPreviewClick(r)}
                                label="Preview"
                            />
                            <Button
                                size={ButtonSize.Small}
                                active={videoIds[index] === r.id}
                                onClick={onUseClick(r)}
                                label="Use"
                            />
                        </nav>
                    </BTrackItem>
                ))}
            </BTrackList>
        </div>
    );
};

export const mapContextToProps = (p: BuilderTrackProps): BuilderTrackProps => {
    const c = useContext(AppContext);
    return {
        className: p.className,
        index: p.index,
        isActive: p.index === c.activeTrack,
        isComplete: c.videoIds[p.index] ? true : false,
        setActiveTrack: (t: number) => c.setActiveTrack(t),
        setNextActiveTrack: () => c.setNextActiveTrack(),
        setTrackVideoId: (t: number, id: string) => c.setTrackVideoId(t, id),
        setVideoPreview: (r: YTSearchResult) => c.setVideoPreview(r),
        track: p.track,
        trackDigits: p.trackDigits,
        videoIds: c.videoIds,
        videoPreview: c.videoPreview
    };
};

export default styled((p: BuilderTrackProps) => <BuilderTrackComponent {...mapContextToProps(p)} />).attrs(
    (props: BuilderTrackProps) => ({
        countWidth: props.trackDigits + 'rem'
    })
)`
    font-size: 2rem;
    padding: 2rem 2rem 1rem 2rem;

    h2 {
        cursor: pointer;
        font-size: 2rem;
        font-weight: 500;
        line-height: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        a {
            display: block;
        }

        i {
            display: inline-block;
            font-size: 1.25rem;
            font-weight: 300;
            line-height: 3rem;
            margin-right: 0.5rem;
            position: relative;
            text-align: right;
            top: -0.25rem;
            white-space: nowrap;
            width: ${props => props.countWidth};
        }

        em {
            color: ${Colors.Green._400};
            font-size: 2rem;
            margin-left: 1rem;
        }
    }
`;
