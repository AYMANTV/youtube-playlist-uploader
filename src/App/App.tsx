import React, { Component } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

import AppContext, { AppContextModel, VideoIds } from './AppContext';
import Builder from '../Builder/Builder';
import Uploader from '../shared/components/Uploader/Uploader';
import { Track } from '../shared/models/track';

const App = styled.div``;

export default class AppComponent extends Component<{}, AppContextModel> {
    constructor(props) {
        super(props);
        this.state = {
            activeTrack: 0,
            // @todo: remove this fixed data
            playlist: [
                { album: 'Depression Cherry', artist: 'Beach House', name: 'Levitation' } as Track
                // { album: 'The Life Pursuit', artist: 'Belle & Sebastian', name: 'Sukie In The Graveyard' } as Track
            ],
            setContext: (m: AppContextModel) => this.setState({ ...this.state, ...m }),
            videoIds: {},
            videoPreviewId: null
        };
    }

    public render() {
        // When the upload is submitted, set the playlist data and create an empty playlist.
        const onUploadSubmit = playlist =>
            this.setState(s => ({
                ...s,
                playlist,
                videoIds: playlist.reduce((acc: VideoIds, _: Track, i: number) => {
                    acc[i] = null;
                    return acc;
                }, {})
            }));

        return (
            // @todo: add a YouTube login button to init the youtube service
            <AppContext.Provider value={this.state}>
                <App>
                    {/* @todo: expand this to allow for M3U files */}
                    <Uploader label="Upload iTunes XML" onSubmit={onUploadSubmit} />
                    <Builder />
                    {/* @todo: put this preview into a panel */}
                    {this.state.videoPreviewId && (
                        <YouTube videoId={this.state.videoPreviewId} opts={{ playerVars: { autoplay: 1 } }} />
                    )}
                </App>
            </AppContext.Provider>
        );
    }
}
