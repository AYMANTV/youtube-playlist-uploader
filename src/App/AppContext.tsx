import { createContext } from 'react';
import { Tracks } from '../shared/models/track';

export interface VideoIds {
    [i: number]: string;
}

export interface AppContextModel {
    activeTrack?: number;
    playlist?: Tracks;
    videoIds?: VideoIds;
    videoPreviewId?: string;
    setContext?: (m: AppContextModel) => void;
}

const defaultContext: AppContextModel = {
    playlist: [],
    videoIds: {}
};

export default createContext(defaultContext);
