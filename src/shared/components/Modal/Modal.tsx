import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import Colors from '../../common/colors';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    open: boolean;
    onClose: () => void;
}

const Modal = styled.div`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    padding: 3rem;
    position: fixed;
    top: 0;
    width: 100%;
`;

const ModalContent = styled.div`
    background: ${Colors.White};
    border: 1px solid ${Colors.Gray._400};
    min-width: 40rem;
    max-width: 100%;
    padding: 5rem 3rem 3rem;
    position: relative;
    z-index: 5;
`;

const ModalBackground = styled.div`
    background: rgba(0, 0, 0, 0.25);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

const ModalClose = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 3rem;
    line-height: 3rem;
    position: absolute;
    top: 0;
    right: 0;

    ::before {
        content: '𝘅';
    }
`;

export default styled(({ children, open, onClose, className, ...p }: ModalProps) =>
    open ? (
        <Modal className={classnames('modal', className)} {...p}>
            <ModalBackground onClick={onClose} />
            <ModalContent>
                <ModalClose onClick={onClose} />
                {children}
            </ModalContent>
        </Modal>
    ) : null
)``;
