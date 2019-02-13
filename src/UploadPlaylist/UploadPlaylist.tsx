import React, { useContext, Fragment } from 'react';

import AppContext, { VideoIds } from '../App/AppContext';
import Uploader from '../shared/components/Uploader/Uploader';
import { Tracks, Track } from '../shared/models/track';

export interface UploadPlaylistProps {
    setPlaylist: (playlist: Tracks) => void;
}

export const UploadPlaylistComponent = (props: UploadPlaylistProps) => {
    const { setPlaylist } = props;

    // @todo: expand this to allow for M3U files
    return (
        <Fragment>
            <Uploader label="Upload iTunes XML" onSubmit={setPlaylist} />;
        </Fragment>
    );
};

export const mapContextToProps = (): UploadPlaylistProps => {
    const c = useContext(AppContext);
    return {
        setPlaylist: (playlist: Tracks) => {
            c.setContext({
                playlist,
                videoIds: playlist.reduce((acc: VideoIds, _: Track, i: number) => {
                    acc[i] = null;
                    return acc;
                }, {})
            });
        }
    };
};

export default () => <UploadPlaylistComponent {...mapContextToProps()} />;
