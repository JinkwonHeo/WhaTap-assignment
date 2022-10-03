import { Suspense } from 'react';
import styled from 'styled-components';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import ModalPortal from '../Portal/Portal';

function Modal({ children, handleModalToggle, buttonPosition }: any) {
  return (
    <ModalPortal>
      <ModalBackground onClick={handleModalToggle}>
        <ModalContainer
          onClick={(e) => {
            e.stopPropagation();
          }}
          buttonPosition={buttonPosition}
        >
          <CloseButtonWrapper>
            <CloseButton onClick={handleModalToggle} />
          </CloseButtonWrapper>
          <Suspense fallback={<LoadingCircle />}>{children}</Suspense>
        </ModalContainer>
      </ModalBackground>
    </ModalPortal>
  );
}

export default Modal;

interface Props {
  buttonPosition: { x: number; y: number };
}

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ModalContainer = styled.div<Props>`
  position: relative;
  width: 500px;
  height: 450px;
  left: ${(props) => props.buttonPosition.x}px;
  top: ${(props) => props.buttonPosition.y}px;
  background: rgb(255, 255, 255);
  border-radius: 3px;
  box-shadow: 0px 24px 38px 3px rgb(0 0 0 / 30%), 0px 9px 46px 8px rgb(0 0 0 / 30%),
    0px 11px 15px -7px rgb(0 0 0 / 30%);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

const CloseButtonWrapper = styled.div`
  position: relative;
  top: 1.2em;
  right: 0.8em;
`;

const CloseButton = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  width: 1.2em;
  height: 1.2em;
  cursor: pointer;

  ::before,
  ::after {
    position: absolute;
    height: 1.2em;
    width: 2px;
    margin-left: 0.75em;
    background-color: black;
    content: ' ';
  }

  ::before {
    transform: rotate(45deg);
  }

  ::after {
    transform: rotate(-45deg);
  }
`;
