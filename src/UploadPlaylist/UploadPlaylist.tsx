import React, { useContext } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

import AppContext, { VideoIds } from '../App/AppContext';
import Uploader from '../shared/components/Uploader/Uploader';
import { Tracks, Track } from '../shared/models/track';

export interface UploadPlaylistProps {
    setPlaylist: (playlist: Tracks) => void;
}

const UploadPlaylist = styled(
    posed.div({
        enter: { opacity: 1 },
        exit: { opacity: 2 }
    })
)``;

export const UploadPlaylistComponent = (props: UploadPlaylistProps) => {
    const { setPlaylist } = props;

    // @todo: expand this to allow for M3U files
    return (
        <UploadPlaylist>
            <Uploader label="Upload iTunes XML" onSubmit={setPlaylist} />;
        </UploadPlaylist>
    );
};

const mapPlaylistToVideoIds = (tracks: Tracks): VideoIds => {
    return tracks.reduce((acc: VideoIds, _: Track, i: number) => {
        acc[i] = null;
        return acc;
    }, {});
};

export const mapContextToProps = (): UploadPlaylistProps => {
    const c = useContext(AppContext);
    return {
        setPlaylist: (playlist: Tracks) => {
            c.setContext(() => ({
                playlist,
                videoIds: mapPlaylistToVideoIds(playlist)
            }));
        }
    };
};

export default () => <UploadPlaylistComponent {...mapContextToProps()} />;
