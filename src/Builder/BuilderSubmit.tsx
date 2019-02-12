import React, { useContext } from 'react';

import AppContext, { VideoIds } from '../App/AppContext';
import Button from '../shared/components/Button/Button';
import yt from '../shared/services/youtube/youtube.service';

export interface BuilderSubmitProps {
    videoIds: VideoIds;
}

export const BuilderSubmitComponent = (props: BuilderSubmitProps) => {
    const { videoIds } = props;
    const savePlaylist = () => yt.savePlaylist(videoIds, 'Test', 'Testing123');
    return <Button label="Save Playlist to YouTube" onClick={savePlaylist} />;
};

export const mapContextToProps = (): BuilderSubmitProps => {
    const c = useContext(AppContext);
    return {
        videoIds: c.videoIds
    };
};

export default () => <BuilderSubmitComponent {...mapContextToProps()} />;
