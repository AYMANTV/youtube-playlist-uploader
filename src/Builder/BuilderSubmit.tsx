import React, { useContext, useState, ChangeEvent } from 'react';
import styled from 'styled-components';

import yt from '../YouTube/youtube.service';
import AppContext, { VideoIds } from '../App/AppContext';
import Button from '../shared/components/Button/Button';
import Modal from '../shared/components/Modal/Modal';
import Field from '../shared/components/Field/Field';
import Input from '../shared/components/Input/Input';

export interface BuilderSubmitProps {
    className?: string;
    isComplete?: boolean;
    videoIds?: VideoIds;
}

export const BuilderSubmitComponent = (props: BuilderSubmitProps) => {
    const { className, isComplete, videoIds } = props;
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [successModalId, setSuccessModalId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const onDoneClick = async () => {
        if (!name) return alert('Please enter a playlist name.');
        const id = await yt.savePlaylist(Object.keys(videoIds), name, description);
        setSaveModalOpen(false);
        setSuccessModalId(id);
    };
    const onSaveClick = () => {
        setSaveModalOpen(true);
    };
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };
    const onModalClose = () => {
        setSaveModalOpen(false);
    };
    const onStartOverClick = () => {
        window.location.reload();
    };
    return (
        <div className={className}>
            <Modal open={saveModalOpen} onClose={onModalClose}>
                <Field label="Playlist Name">
                    <Input onChange={onNameChange} />
                </Field>
                <Field label="Playlist Description">
                    <Input onChange={onDescriptionChange} />
                </Field>
                <nav>
                    <Button label="Done" onClick={onDoneClick} />
                </nav>
            </Modal>
            <Modal open={successModalId ? true : false} onClose={onModalClose}>
                <h2>Playlist Created Successfully</h2>
                <p>
                    <a
                        href={`https://www.youtube.com/playlist?index=1&list=${successModalId}&playnext=1`}
                        target="_blank"
                    >
                        Click here to view it.
                    </a>
                </p>
                <p>
                    <Button label="Start Over" onClick={onStartOverClick} />
                </p>
            </Modal>
            <Button disabled={!isComplete} label="Save Playlist to YouTube" onClick={onSaveClick} />
        </div>
    );
};

export const mapContextToProps = (p: BuilderSubmitProps): BuilderSubmitProps => {
    const c = useContext(AppContext);
    return {
        isComplete:
            c.playlist.length && Object.keys(c.videoIds).filter(id => c.videoIds[id]).length === c.playlist.length,
        videoIds: c.videoIds,
        ...p
    };
};

export default styled((p: BuilderSubmitProps) => <BuilderSubmitComponent {...mapContextToProps(p)} />)`
    ${Modal} {
        text-align: left;

        h2 {
            font-size: 2.5rem;
            line-height: 3rem;
            margin-bottom: 1rem;
        }

        p {
            font-size: 2rem;
            line-height: 3rem;
            margin-bottom: 2rem;
        }
    }

    ${Field} {
        display: block;
        margin-bottom: 2rem;
    }

    ${Input} {
        width: 100%;
    }
`;
