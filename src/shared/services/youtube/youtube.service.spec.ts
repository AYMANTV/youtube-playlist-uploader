import { YouTubeService } from './youtube.service';

describe('YouTube service', () => {
    let gapi;

    beforeAll(() => {
        // @ts-ignore
        gapi = global.gapi;
    });

    afterAll(() => {
        // @ts-ignore
        global.gapi = gapi;
    });

    beforeEach(() => {
        // @ts-ignore
        global.gapi = {};
    });

    it('should create without crashing', () => {
        expect(new YouTubeService()).toBeInstanceOf(YouTubeService);
    });
});
