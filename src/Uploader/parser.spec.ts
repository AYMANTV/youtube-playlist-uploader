import { parse, ParsedXMLNode } from './parser';
import { TagKeyName } from './Uploader.model';
import XML from '../shared/test/playlist-xml';

describe('XML Parser', () => {
    let data;

    beforeEach(() => {
        data = parse(XML);
    });

    it('parses XML', () => {
        expect(data).toBeInstanceOf(ParsedXMLNode);
    });

    it('gets a child by name', () => {
        expect(data.get(TagKeyName.Tracks).children).toHaveLength(200);
        expect(data.get(TagKeyName.Playlists).children[0].children[11].children).toHaveLength(100);
    });
});
