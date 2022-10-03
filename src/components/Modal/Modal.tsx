import { Suspense, useEffect } from 'react';
import styled from 'styled-components';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import ModalPortal from '../Portal/Portal';

function Modal({ children, handleModalToggle, buttonPosition }: any) {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: auto;
      width: 100%;`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <ModalPortal>
      <ModalBackground onClick={handleModalToggle}>
        <ModalContainer
          className="show-modal"
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

  .show-modal {
    animation: motion 0.3s ease-out;
  }

  @keyframes motion {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div<Props>`
  position: sticky;
  width: 38%;
  height: 30%;
  min-width: 500px;
  min-height: 400px;
  left: ${(props) => props.buttonPosition.x}px;
  top: ${(props) => props.buttonPosition.y}px;
  margin: 100px 100px;
  background: rgb(255, 255, 255);
  border-radius: 3px;
  box-shadow: 0px 24px 38px 3px rgb(0 0 0 / 30%), 0px 9px 46px 8px rgb(0 0 0 / 30%),
    0px 11px 15px -7px rgb(0 0 0 / 30%);

  ::-webkit-scrollbar {
    display: none;
    width: 0;
  }

  @media screen and (max-width: 500px) {
    position: relative;
    top: 10%;
    left: -17%;
    min-width: 300px;
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
