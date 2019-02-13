import './mock-gapi'; // remove this when you want to use the real GAPI

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_YOUTUBE_CLIENT_ID;

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];

// Authorization scopes required by the API. If using multiple scopes,
// separated them with spaces.
const SCOPES = 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly';

export interface YTSearchResult {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
}

export interface YTPlaylist {
    id: string;
}

export interface YTPlaylistItem {}

export enum PrivacyStatus {
    Private = 'private',
    Protected = 'protected',
    Public = 'public'
}

export class YouTubeService {
    public isSignedIn = false;
    private api;
    private initialized = false;
    private queuedActions = [];

    public async initialize(): Promise<void> {
        return new Promise(async (res, rej) => {
            try {
                await this.loadLibrary();
                await this.initLibrary();
                this.initialized = true;
                this.queuedActions.map(a => a());
                res();
            } catch (e) {
                rej(e);
            }
        });
    }

    public async loadLibrary(): Promise<void> {
        return new Promise((res, rej) => {
            return (this.api = gapi) && res(); // remove this when you want to use the real API
            const script = document.createElement('script');
            script.onload = () => {
                this.api = gapi;
                res();
            };
            script.onerror = () => rej();
            script.src = 'https://apis.google.com/js/api.js';
            document.body.append(script);
        });
    }

    public async initLibrary(): Promise<void> {
        return new Promise((res, rej) => {
            try {
                this.api.load('client:auth2', async () => {
                    await this.initClient();
                    res();
                });
            } catch (e) {
                rej(e);
            }
        });
    }

    public async initClient(): Promise<void> {
        return new Promise(async (res, rej) => {
            await this.api.client
                .init({
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    immediate: true,
                    scope: SCOPES
                })
                .catch(rej);

            this.api.auth2.getAuthInstance().isSignedIn.listen(s => (this.isSignedIn = s));
            this.isSignedIn = this.api.auth2.getAuthInstance().isSignedIn.get();

            if (!this.isSignedIn) {
                this.api.auth2.getAuthInstance().signIn();
            }

            res();
        });
    }

    public async search(str: string): Promise<YTSearchResult[]> {
        return new Promise(async (res, rej) => {
            try {
                if (!this.initialized) {
                    this.queuedActions.push(() => this.search(str).then(res, rej));
                    return;
                }

                const resp = await this.api.client.youtube.search.list({
                    maxResults: '10',
                    part: 'snippet',
                    q: str,
                    type: 'video'
                });

                res(
                    resp.result.items.map(i => ({
                        description: i.snippet.description,
                        id: i.id.videoId,
                        thumbnail: i.snippet.thumbnails.high.url,
                        title: i.snippet.title
                    }))
                );
            } catch (e) {
                rej(e);
            }
        });
    }

    public async createPlaylist(
        title: string = '',
        description: string = '',
        privacyStatus: PrivacyStatus = PrivacyStatus.Private
    ): Promise<YTPlaylist> {
        return new Promise(async (res, rej) => {
            try {
                const req = this.api.client.youtube.playlists.insert({
                    part: 'snippet,status',
                    resource: {
                        snippet: {
                            description,
                            title
                        },
                        status: {
                            privacyStatus
                        }
                    }
                });

                req.execute(resp => {
                    if (!resp) {
                        rej(new Error('Could not create playlist.'));
                    }
                    res(resp);
                });
            } catch (e) {
                rej(e);
            }
        });
    }

    public async addTracks(playlistId: string, videoIds: string[]): Promise<YTPlaylistItem[]> {
        return new Promise(async (res, rej) => {
            try {
                Promise.all(videoIds.map(id => this.addTrack(playlistId, id)))
                    .then(res)
                    .catch(rej);
            } catch (e) {
                rej(e);
            }
        });
    }

    public async addTrack(playlistId: string, videoId: string): Promise<YTPlaylistItem[]> {
        return new Promise(async (res, rej) => {
            const req = this.api.client.youtube.playlistItems.insert({
                part: 'snippet',
                resource: {
                    snippet: {
                        playlistId,
                        resourceId: {
                            kind: 'youtube#video',
                            videoId
                        }
                    }
                }
            });
            req.execute(resp => {
                if (!resp) {
                    rej(new Error('Could not add tracks to the created playlist.'));
                }
                res();
            });
        });
    }

    public async savePlaylist(
        ids: string[],
        title: string = '',
        description: string = '',
        privacyStatus: PrivacyStatus = PrivacyStatus.Private
    ): Promise<void> {
        return new Promise(async (res, rej) => {
            try {
                if (!this.initialized) {
                    this.queuedActions.push(() =>
                        this.savePlaylist(ids, title, description, privacyStatus).then(res, rej)
                    );
                    return;
                }

                const { id } = await this.createPlaylist(title, description, privacyStatus);
                await this.addTracks(id, ids);
                res();
            } catch (e) {
                rej(e);
            }
        });
    }
}

export default new YouTubeService();
