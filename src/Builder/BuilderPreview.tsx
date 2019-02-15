import React, { useContext } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

import AppContext from '../App/AppContext';
import { YTSearchResult } from '../YouTube/youtube.service';

export interface BuilderPreviewProps {
    className?: string;
    video?: YTSearchResult;
}

const BuilderPreviewPlayer = styled.div`
    overflow: hidden;
    padding-top: 56.25%;
    position: relative;

    iframe {
        border: 0;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }
`;

export const BuilderPreviewComponent = (props: BuilderPreviewProps) => {
    const { className, video } = props;
    return (
        <div className={className}>
            <BuilderPreviewPlayer>
                <YouTube videoId={video && video.id} opts={{ playerVars: { autoplay: 1 } }} />
            </BuilderPreviewPlayer>
        </div>
    );
};

export const mapContextToProps = (p: BuilderPreviewProps): BuilderPreviewProps => {
    const c = useContext(AppContext);
    return {
        video: c.videoPreview,
        ...p
    };
};

export default styled((p: BuilderPreviewProps) => <BuilderPreviewComponent {...mapContextToProps(p)} />)`
    padding: 3rem;
`;
