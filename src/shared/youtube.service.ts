// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_YOUTUBE_CLIENT_ID;

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];

// Authorization scopes required by the API. If using multiple scopes,
// separated them with spaces.
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

export interface SearchResult {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
}
export class YouTubeService {
    private api;
    private initialized = false;
    private queuedActions = [];
    public isSignedIn = false;

    constructor() {
        this.init();
    }

    async init() {
        try {
            await this.loadLibrary();
            await this.initLibrary();
            this.initialized = true;
            this.queuedActions.map(a => a());
        } catch (e) {
            console.error(e);
        }
    }

    async loadLibrary(): Promise<void> {
        return new Promise((res, rej) => {
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

    async initLibrary(): Promise<void> {
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

    async initClient(): Promise<void> {
        return new Promise(async (res, rej) => {
            await this.api.client
                .init({
                    discoveryDocs: DISCOVERY_DOCS,
                    clientId: CLIENT_ID,
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

    async search(str: string): Promise<SearchResult[]> {
        return new Promise(async (res, rej) => {
            try {
                if (!this.initialized) {
                    this.queuedActions.push(() => this.search(str).then(res, rej));
                    return;
                }

                const resp = await this.api.client.youtube.search.list({
                    part: 'snippet',
                    maxResults: '25',
                    q: str,
                    type: 'video'
                });

                res(
                    resp.result.items.map(i => ({
                        id: i.id.videoId,
                        title: i.snippet.title,
                        description: i.snippet.description,
                        thumbnail: i.snippet.thumbnails.high.url
                    }))
                );
            } catch (e) {
                rej(e);
            }
        });
    }
}

export default new YouTubeService();
