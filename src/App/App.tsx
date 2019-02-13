import React, { Component } from 'react';
import styled from 'styled-components';

import AppContext, { AppContextModel } from './AppContext';
import Builder from '../Builder/Builder';
import GetStarted from '../GetStarted/GetStarted';
import yt from '../YouTube/youtube.service';
import UploadPlaylist from '../UploadPlaylist/UploadPlaylist';
import { Track } from '../shared/models/track';

const App = styled.div`
    align-items: center;
    display: flex;
    min-height: 100vh;
    height: 100%;
    justify-content: center;
    width: 100%;
`;

export default class AppComponent extends Component<{}, AppContextModel> {
    constructor(props) {
        super(props);
        this.state = {
            activeTrack: 0,
            initialize: this.initializeApi.bind(this),
            // initialized: false,
            initialized: true,
            initializing: false,
            // playlist: [],
            // @todo: remove this fixed data
            playlist: [
                { album: 'Depression Cherry', artist: 'Beach House', name: 'Levitation' } as Track,
                { album: 'Depression Cherry', artist: 'Beach House', name: 'Levitation' } as Track,
                { album: 'Depression Cherry', artist: 'Beach House', name: 'Levitation' } as Track,
                { album: 'Depression Cherry', artist: 'Beach House', name: 'Levitation' } as Track,
                { album: 'Depression Cherry', artist: 'Beach House', name: 'Levitation' } as Track,
                { album: 'The Life Pursuit', artist: 'Belle & Sebastian', name: 'Sukie In The Graveyard' } as Track
            ],
            setContext: (m: AppContextModel) => this.setState(s => ({ ...s, ...m })),
            videoIds: {},
            videoPreviewId: null
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
        // @todo: add header
        if (!initialized) return <GetStarted />;
        else if (!playlist.length) return <UploadPlaylist />;
        return <Builder />;
    }
}
