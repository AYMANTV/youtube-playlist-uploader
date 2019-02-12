import { parseXML, ParsedXMLNode } from './xml-parser';
import { TagKeyName } from './Uploader.model';
import XML from '../test/playlist-xml';

describe('XML Parser', () => {
    let data;

    beforeEach(() => {
        data = parseXML(XML);
    });

    it('parses XML', () => {
        expect(data).toBeInstanceOf(ParsedXMLNode);
    });

    it('gets a child by name', () => {
        expect(data.get(TagKeyName.Tracks).children).toHaveLength(200);
        expect(data.get(TagKeyName.Playlists).children[0].children[11].children).toHaveLength(100);
    });
});
