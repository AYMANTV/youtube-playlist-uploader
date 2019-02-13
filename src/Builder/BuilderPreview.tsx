import React, { useContext } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

import AppContext from '../App/AppContext';

export interface BuilderPreviewProps {
    videoId: string;
}

const BuilderPreview = styled.div`
    border: none;
`;

export const BuilderPreviewComponent = (props: BuilderPreviewProps) => {
    const { videoId } = props;
    return (
        <BuilderPreview>
            {videoId && <YouTube videoId={videoId} opts={{ playerVars: { autoplay: 1 } }} />}
        </BuilderPreview>
    );
};

export const mapContextToProps = (): BuilderPreviewProps => {
    const c = useContext(AppContext);
    return {
        videoId: c.videoPreviewId
    };
};

export default () => <BuilderPreviewComponent {...mapContextToProps()} />;
