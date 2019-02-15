import { createContext } from 'react';
import { Tracks } from '../shared/models/track';
import { YTSearchResult } from '../YouTube/youtube.service';

export interface VideoIds {
    [i: number]: string;
}

export interface AppContextModel {
    activeTrack?: number;
    initializing?: boolean;
    initialized?: boolean;
    playlist?: Tracks;
    videoIds?: VideoIds;
    videoPreview?: YTSearchResult;
    initialize?: () => void;
    setActiveTrack?: (t: number) => void;
    setContext?: (fn: (m: AppContextModel) => AppContextModel) => void;
    setNextActiveTrack?: () => void;
    setTrackVideoId?: (t: number, id: string) => void;
    setVideoPreview?: (r: YTSearchResult) => void;
}

export default createContext({} as AppContextModel);
