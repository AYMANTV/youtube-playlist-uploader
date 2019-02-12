import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Uploader from './Uploader';
import XML from '../shared/test/playlist-xml';

configure({ adapter: new Adapter() });

describe('Uploader', () => {
    let wrapper;
    let component: Uploader;

    beforeEach(() => {
        wrapper = shallow(<Uploader label="test" onSubmit={() => {}} />);
        component = wrapper.instance();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Uploader label="test" onSubmit={() => {}} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('parses a playlist', async done => {
        wrapper.setState({ file: XML });
        const playlist = await component.parsePlaylist();
        expect(playlist).toEqual([
            { album: 'Bloom', artist: 'Beach House', name: 'Wishes' },
            { album: 'Late for the Sky', artist: 'Jackson Browne', name: 'Late for the Sky' },
            { album: 'Moon Pix', artist: 'Cat Power', name: 'Cross Bones Style' },
            {
                album: "Let's Get Out Of This Country",
                artist: 'Camera Obscura',
                name: "Lloyd, I'm Ready to Be Heartbroken"
            },
            { album: 'G.P. / Grievous Angel', artist: 'Gram Parsons', name: '$1000 Wedding' },
            { album: 'Odessey & Oracle: 30th Anniversary Edition', artist: 'The Zombies', name: 'Care Of Cell 44' },
            { album: 'Haerts', artist: 'Haerts', name: 'Wings' },
            {
                album: 'All Things Must Pass',
                artist: 'George Harrison',
                name: 'Ballad Of Sir Frankie Crisp (Let It Roll)'
            },
            { album: 'Traveling Wilburys, Vol. 1', artist: 'The Traveling Wilburys', name: 'Handle With Care' },
            { album: 'Luxury Liner', artist: 'Emmylou Harris', name: 'Pancho & Lefty' },
            { album: 'The Suburbs', artist: 'Arcade Fire', name: 'Sprawl II (Mountains Beyond Mountains)' },
            { album: 'Between The Breaks... Live!', artist: 'Stan Rogers', name: 'The Witch Of The Westmorland' },
            { album: 'Emperor Tomato Ketchup', artist: 'Stereolab', name: "Cybele's Reverie" },
            {
                album: "The Fantastic Expedition Of Dillard & Clark '69",
                artist: 'Gene Clark & Doug Dillard',
                name: 'Why Not Your Baby'
            },
            { album: 'Fleetwood Mac', artist: 'Fleetwood Mac', name: 'Landslide' },
            { album: 'Heaven or Las Vegas', artist: 'Cocteau Twins', name: 'Cherry-Coloured Funk' },
            { album: 'The Tigers Have Spoken.', artist: 'Neko Case', name: 'If You Knew' },
            { album: 'Anthology', artist: 'The Flying Burrito Brothers', name: 'Colorado' },
            { album: 'If You See Me, Say Yes', artist: 'Flock of Dimes', name: 'The Joke' },
            { album: "I Don't Want to Let You Down", artist: 'Sharon Van Etten', name: "I Don't Want to Let You Down" },
            { album: 'Out Of The Blue', artist: 'Electric Light Orchestra', name: "Sweet Talkin' Woman" },
            { album: 'Joanna Newsom & The Ys Street Band (EP)', artist: 'Joanna Newsom', name: 'Colleen' },
            { album: "Bee Gees' 1st", artist: 'Bee Gees', name: 'To Love Somebody' },
            { album: 'Into the Great Wide Open', artist: 'Tom Petty and the Heartbreakers', name: 'Learning To Fly' },
            { album: 'The Essential Roy Orbison', artist: 'Roy Orbison', name: 'You Got It' },
            { album: 'Set Yourself On Fire', artist: 'Stars', name: 'Ageless Beauty' },
            { album: 'Anthology', artist: 'The Walker Brothers', name: 'Love Her' },
            { album: 'Ritual In Repeat (Deluxe Edition)', artist: 'Tennis', name: 'Never Work For Free' },
            { album: 'Saturdays = Youth', artist: 'M83', name: 'Kim & Jessie' },
            {
                album: 'Greetings From Michigan: The Great Lakes State',
                artist: 'Sufjan Stevens',
                name: 'Detroit, Lift Up Your Weary Head! (Rebuild! Restore! Reconsider!)'
            },
            { album: 'In Reverie', artist: 'Saves The Day', name: 'In My Waking Life' },
            { album: 'Disco Romance', artist: 'Sally Shapiro', name: "I'll Be By Your Side (Extended Mix)" },
            { album: 'Cold Roses', artist: 'Ryan Adams & The Cardinals', name: 'Mangolia Mountain' },
            { album: 'Let It Bleed', artist: 'The Rolling Stones', name: 'Gimme Shelter' },
            { album: 'The Execution Of All Things', artist: 'Rilo Kiley', name: 'The Execution Of All Things' },
            { album: 'Moon Tides', artist: 'Pure Bathing Culture', name: 'Pendulum' },
            { album: 'Give Up', artist: 'The Postal Service', name: 'Nothing Better' },
            { album: 'Brighten The Corners', artist: 'Pavement', name: 'Stereo' },
            { album: 'Pink Moon', artist: 'Nick Drake', name: 'Pink Moon' },
            { album: 'Brotherhood', artist: 'New Order', name: 'Bizarre Love Triangle' },
            { album: 'Harvest Moon', artist: 'Neil Young', name: 'Harvest Moon' },
            { album: 'It Still Moves', artist: 'My Morning Jacket', name: 'Mahgeeta' },
            { album: 'So Tonight That I Might See', artist: 'Mazzy Star', name: 'Fade Into You' },
            { album: "Midwest Farmer's Daughter", artist: 'Margo Price', name: 'Hands of Time' },
            { album: 'Wounded Rhymes', artist: 'Lykke Li', name: 'I Follow Rivers' },
            { album: 'Car Wheels On A Gravel Road', artist: 'Lucinda Williams', name: 'Right In Time' },
            {
                album: 'The Kinks Are The Village Green Preservation Society',
                artist: 'The Kinks',
                name: 'The Village Green Preservation Society'
            },
            { album: 'Aqualung', artist: 'Jethro Tull', name: 'Up to Me' },
            { album: 'Platinum & Gold Collection: Jefferson Starship', artist: 'Jefferson Starship', name: 'Jane' },
            { album: "The Shepherd's Dog", artist: 'Iron & Wine', name: 'Pagan Angel And A Borrowed Car' },
            { album: 'Fleet Foxes', artist: 'Fleet Foxes', name: 'White Winter Hymnal' },
            { album: 'The Soft Bulletin', artist: 'The Flaming Lips', name: 'Race For The Prize (Remix)' },
            { album: 'Picaresque', artist: 'The Decemberists', name: 'The Sporting Life' },
            { album: 'Transatlanticism', artist: 'Death Cab For Cutie', name: 'The Sound Of Settling' },
            { album: 'Thirteen Tales From Urban Bohemia', artist: 'The Dandy Warhols', name: 'Bohemian Like You' },
            { album: 'Cherry', artist: 'Chromatics', name: 'Cherry' },
            { album: 'Keep It Like A Secret', artist: 'Built To Spill', name: 'Carry The Zero' },
            {
                album: 'Tepid Peppermint Wonderland: A Retrospective',
                artist: 'The Brian Jonestown Massacre',
                name: 'Who?'
            },
            { album: 'Desire', artist: 'Bob Dylan', name: 'One More Cup Of Coffee' },
            { album: 'Post', artist: 'Björk', name: 'Army Of Me' },
            { album: 'Crazy For You', artist: 'Best Coast', name: 'Boyfriend' },
            { album: 'The Life Pursuit', artist: 'Belle & Sebastian', name: 'Sukie In The Graveyard' },
            { album: 'The Rip Tide', artist: 'Beirut', name: 'Santa Fe' },
            { album: 'The Bird of Music', artist: 'Au Revoir Simone', name: 'Lark' },
            { album: 'You’re Dreaming', artist: 'The Cactus Blossoms', name: 'Mississippi' },
            { album: 'Tone Soul Evolution', artist: 'The Apples In Stereo', name: 'Seems So' },
            { album: 'Your Majesty', artist: 'The Anniversary', name: 'Sweet Marie' },
            { album: 'Antisocialites', artist: 'Alvvays', name: 'Dreams Tonite' },
            { album: 'New Favorite', artist: 'Alison Krauss & Union Station', name: 'New Favorite' },
            { album: 'Led Zeppelin IV', artist: 'Led Zeppelin', name: 'Stairway To Heaven' },
            { album: 'LCD Soundsystem', artist: 'LCD Soundsystem', name: 'Daft Punk Is Playing at My House' },
            { album: 'The Warning', artist: 'Hot Chip', name: 'Colours' },
            { album: 'Imagine', artist: 'John Lennon', name: 'Oh Yoko!' },
            { album: 'Anthology 2', artist: 'The Beatles', name: 'Real Love' },
            { album: 'Kill The Moonlight', artist: 'Spoon', name: 'All The Pretty Girls Go To The City' },
            { album: 'Substance 1977-1980', artist: 'Joy Division', name: 'Love Will Tear Us Apart' },
            { album: 'Armchair Theatre', artist: 'Jeff Lynne', name: 'Lift Me Up' },
            { album: 'Emitt Rhodes', artist: 'Emitt Rhodes', name: 'With My Face On The Floor' },
            { album: 'Time', artist: 'The Pozo-Seco Singers', name: 'Time' },
            { album: 'Front Row Seat To Earth', artist: 'Weyes Blood', name: 'Used To Be' },
            { album: 'De Stijl', artist: 'The White Stripes', name: "Truth Doesn't Make a Noise" },
            { album: 'A Deeper Understanding', artist: 'The War On Drugs', name: 'Up All Night' },
            { album: 'Summerteeth', artist: 'Wilco', name: 'ELT' },
            { album: 'Paracosm', artist: 'Washed Out', name: 'It All Feels Right' },
            { album: 'Daydream Nation', artist: 'Sonic Youth', name: 'Teen Age Riot' },
            { album: 'No Pocky For Kitty', artist: 'Superchunk', name: 'Skip Steps 1 & 3' },
            { album: 'Cease to Begin', artist: 'Band Of Horses', name: "No One's Gonna Love You" },
            { album: "What's Up Matador?", artist: 'Bettie Serveert', name: 'Tomboy' },
            { album: "You're Living All Over Me", artist: 'Dinosaur Jr.', name: 'Little Fury Things' },
            { album: 'No Other', artist: 'Gene Clark', name: "Life's Greatest Fool" },
            { album: 'American Beauty', artist: 'Grateful Dead', name: 'Box Of Rain' },
            { album: "b'lieve i'm goin down...", artist: 'Kurt Vile', name: 'Pretty Pimpin' },
            { album: 'OK Computer', artist: 'Radiohead', name: 'Paranoid Android' },
            { album: 'Springtime Carnivore', artist: 'Springtime Carnivore', name: 'Name on a Matchbook' },
            { album: 'Currents', artist: 'Tame Impala', name: 'Let It Happen' },
            { album: 'Sweetheart Of The Rodeo', artist: 'The Byrds', name: 'One Hundred Years From Now' },
            { album: 'Déjà Vu', artist: 'Crosby, Stills, Nash & Young', name: 'Almost Cut My Hair' },
            { album: 'Burst Apart', artist: 'The Antlers', name: "I Don't Want Love" },
            { album: 'The Bones Of What You Believe', artist: 'Chvrches', name: 'The Mother We Share' },
            { album: 'Fancy Footwork', artist: 'Chromeo', name: 'Tenderoni' }
        ]);
        done();
    });
});
