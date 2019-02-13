import { createContext } from 'react';
import { Tracks } from '../shared/models/track';

export interface VideoIds {
    [i: number]: string;
}

export interface AppContextModel {
    activeTrack?: number;
    initializing?: boolean;
    initialized?: boolean;
    playlist?: Tracks;
    videoIds?: VideoIds;
    videoPreviewId?: string;
    initialize?: () => void;
    setContext?: (m: AppContextModel) => void;
}

const defaultContext: AppContextModel = {
    playlist: [],
    videoIds: {}
};

export default createContext(defaultContext);
