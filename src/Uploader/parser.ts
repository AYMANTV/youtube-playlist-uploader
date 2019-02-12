import parseXml from '@rgrove/parse-xml';
import { Tag, TagKeyName } from './Uploader.model';

function findRecursive(children, key) {
    if (!children) return;
    let match;
    children.find(c => {
        if (c.text === key) {
            match = c;
            return match;
        }
        if ((match = findRecursive(c.children, key))) {
            return match;
        }
    });
    return match;
}

export class ParsedXMLNode {
    name: Tag;
    attributes: object;
    parent?: ParsedXMLNode;
    children?: ParsedXMLNode[];
    text?: string;
    type: string;
    get(key: TagKeyName): any {
        const match = findRecursive(this.children, key);
        if (!match) {
            return null;
        }
        const matchIndex = match.parent.parent.children.indexOf(match.parent);
        return match.parent.parent.children[matchIndex + 1];
    }

    constructor(node, parent = null) {
        this.name = node.name;
        this.attributes = node.attributes;
        this.text = node.text;
        this.type = node.type;
        this.parent = parent;
        this.children = (node.children || [])
            .filter(c => (c.text ? c.text.trim().replace(/[\\n\\t]{1,}/g, '') !== '' : true))
            .map(c => new ParsedXMLNode(c, this));
    }
}

export function parse(xml: string): ParsedXMLNode {
    const data = parseXml(xml);
    return new ParsedXMLNode(data.children.find(c => c.name === Tag.Playlist));
}
