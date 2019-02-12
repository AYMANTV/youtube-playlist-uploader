import React, { useContext } from 'react';
import yt from '../YouTube/youtube.service';

import AppContext, { VideoIds } from '../App/AppContext';
import Button from '../shared/components/Button/Button';

export interface BuilderSubmitProps {
    videoIds: VideoIds;
}

export const BuilderSubmitComponent = (props: BuilderSubmitProps) => {
    const { videoIds } = props;
    const savePlaylist = () => yt.savePlaylist(Object.keys(videoIds).filter(id => videoIds[id]), 'Test', 'Testing123');
    return <Button label="Save Playlist to YouTube" onClick={savePlaylist} />;
};

export const mapContextToProps = (): BuilderSubmitProps => {
    const c = useContext(AppContext);
    return {
        videoIds: c.videoIds
    };
};

export default () => <BuilderSubmitComponent {...mapContextToProps()} />;
