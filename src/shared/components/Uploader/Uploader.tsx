import React, { Component } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

import Input, { InputType } from '../Input/Input';
import Field from '../Field/Field';
import Button, { ButtonType } from '../Button/Button';
import { TagKeyName } from './Uploader.model';
import { parseXML } from './xml-parser';
import { Tracks } from '../../models/track';

export interface UploaderProps {
    className?: string;
    label: string;
    onSubmit: (playlist: Tracks) => void;
}

export interface UploaderState {
    file?: string;
    loading?: boolean;
}

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

    public render = () => {
        const { className, label } = this.props;
        const { loading } = this.state;

        return (
            <Form className={classnames('uploader', className)} onSubmit={this.onSubmit}>
                <Field label={label}>
                    <Input onChange={this.onInputChange} type={InputType.File} />
                    <Button label="Upload" disabled={loading} type={ButtonType.Submit} />
                </Field>
            </Form>
        );
    };

    public async storeFile(file: File): Promise<string> {
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

    public clearFile() {
        this.setState({ file: null });
    }

    public async parsePlaylist(): Promise<Tracks> {
        return new Promise((res, rej) => {
            const data = parseXML(this.state.file);
            const tracks = data.get(TagKeyName.Tracks);
            const playlist = data.get(TagKeyName.PlaylistItems).children;
            try {
                res(
                    playlist.map(item => {
                        const id = item.children[1].children[0].text;
                        const track = tracks.get(id);
                        return {
                            album: track.get(TagKeyName.Album).children[0].text,
                            artist: track.get(TagKeyName.Artist).children[0].text,
                            name: track.get(TagKeyName.Name).children[0].text
                        };
                    })
                );
            } catch (e) {
                rej(e);
            }
        });
    }

    public onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0];
        if (file) {
            this.storeFile(file);
        } else {
            this.clearFile();
        }
    }

    public async onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { onSubmit } = this.props;
        try {
            const playlist = await this.parsePlaylist();
            onSubmit(playlist);
        } catch (e) {
            console.error(e);
        }
    }
}
