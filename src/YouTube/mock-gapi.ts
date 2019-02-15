import addTrack from '../shared/test/yt-add-track-response.json';
import create from '../shared/test/yt-create-playlist-response.json';
import search from '../shared/test/yt-search-response.json';

export const mockGapi = {
    auth2: {
        getAuthInstance: () => ({
            isSignedIn: {
                get: () => true,
                listen: () => {}
            },
            signIn: () => {}
        })
    },
    client: {
        init: () => new Promise(res => setTimeout(res, 250)), // Promise.resolve(),
        youtube: {
            playlistItems: {
                insert: () => ({ execute: cb => cb(addTrack) })
            },
            playlists: {
                insert: () => ({ execute: cb => cb(create) })
            },
            search: {
                list: () => new Promise(res => setTimeout(() => res(search), 500))
                // list: () => Promise.resolve(search)
            }
        }
    },
    load: (_, cb) => cb()
};
