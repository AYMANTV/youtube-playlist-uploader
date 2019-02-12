import React, { Component } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

import Input, { InputType } from '../shared/Input/Input';
import Field from '../shared/Field/Field';
import Button from '../shared/Button/Button';
import { Tag, TagKeyName } from './Uploader.model';
import { parse } from './parser';

export interface UploaderProps {
    label: string;
    onSubmit: (playlist: Playlist) => void;
    className?: string;
}

export interface UploaderState {
    file?: string;
    loading?: boolean;
}

export interface Track {
    name: string;
    artist: string;
    album?: string;
}

export type Playlist = Track[];

const Form = styled.form`
    border: none;
`;

export default class Uploader extends Component<UploaderProps, UploaderState> {
    public state: UploaderState = {
        loading: false
    };

    constructor(props: UploaderProps, state?: UploaderState) {
        super(props, state);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render = () => {
        const { className, label } = this.props;
        const { loading } = this.state;

        return (
            <Form className={classnames('uploader', className)} onSubmit={this.onSubmit}>
                <Field label={label}>
                    <Input onChange={this.onInputChange} type={InputType.File} />
                    <Button label="Upload" disabled={loading} />
                </Field>
            </Form>
        );
    };

    async storeFile(file: File): Promise<string> {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = t => {
                const result = reader.result as string;
                res(result);
                this.setState({ file: result });
            };
            reader.onerror = rej;
            reader.readAsText(file);
        });
    }

    clearFile() {
        this.setState({ file: null });
    }

    async parsePlaylist(): Promise<Playlist> {
        return new Promise((res, rej) => {
            const data = parse(this.state.file);
            const tracks = data.get(TagKeyName.Tracks);
            const playlist = data.get(TagKeyName.PlaylistItems).children;
            try {
                res(
                    playlist.map(item => {
                        const id = item.children[1].children[0].text;
                        const track = tracks.get(id);
                        return {
                            artist: track.get(TagKeyName.Artist).children[0].text,
                            name: track.get(TagKeyName.Name).children[0].text,
                            album: track.get(TagKeyName.Album).children[0].text
                        };
                    })
                );
            } catch (e) {
                rej(e);
            }
        });
    }

    onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0];
        if (file) {
            this.storeFile(file);
        } else {
            this.clearFile();
        }
    }

    async onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { onSubmit } = this.props;
        const playlist = await this.parsePlaylist();
        onSubmit(playlist);
    }
}
