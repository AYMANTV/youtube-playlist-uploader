import addTrack from '../shared/test/yt-add-track-response.json';
import create from '../shared/test/yt-create-playlist-response.json';
import search from '../shared/test/yt-search-response.json';

// @ts-ignore
window.gapi = {
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
                insert: () => Promise.resolve(addTrack)
            },
            playlists: {
                insert: () => Promise.resolve(create)
            },
            search: {
                list: () => Promise.resolve(search)
            }
        }
    },
    load: (_, cb) => cb()
};
