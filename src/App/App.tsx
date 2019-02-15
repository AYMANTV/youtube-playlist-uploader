import React, { Component } from 'react';
import styled from 'styled-components';

import AppContext, { AppContextModel } from './AppContext';
import Builder from '../Builder/Builder';
import GetStarted from '../GetStarted/GetStarted';
import yt, { YTSearchResult } from '../YouTube/youtube.service';
import UploadPlaylist from '../UploadPlaylist/UploadPlaylist';

const App = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
`;

export default class AppComponent extends Component<{}, AppContextModel> {
    constructor(props) {
        super(props);
        const setContext = (fn: (m: AppContextModel) => AppContextModel) => this.setState(s => ({ ...s, ...fn(s) }));
        this.state = {
            activeTrack: 0,
            initialize: this.initializeApi.bind(this),
            initialized: false,
            initializing: false,
            playlist: [],
            setActiveTrack: (t: number) => setContext(() => ({ activeTrack: t })),
            setContext,
            setNextActiveTrack: () =>
                setContext(c => ({ activeTrack: Math.min(c.activeTrack + 1, c.playlist.length - 1) })),
            setTrackVideoId: (t: number, id: string) => setContext(c => ({ videoIds: { ...c.videoIds, [t]: id } })),
            setVideoPreview: (r: YTSearchResult) => setContext(() => ({ videoPreview: r })),
            videoIds: {},
            videoPreview: null
        };
        setTimeout(() => this.initializeApi(), 1);
    }

    public async initializeApi() {
        this.setState(s => ({ ...s, initializing: true }));
        await yt.initialize();
        this.setState(s => ({ ...s, initialized: true, initializing: false }));
    }

    public render() {
        return (
            <AppContext.Provider value={this.state}>
                <App>{this.renderView()}</App>
            </AppContext.Provider>
        );
    }

    public renderView() {
        const { initialized, playlist } = this.state;
        if (!initialized) return <GetStarted />;
        // @todo: add header at this point
        if (!playlist.length) return <UploadPlaylist />;
        return <Builder />;
    }
}
