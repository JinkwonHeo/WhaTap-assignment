import reactDom from 'react-dom';

export default function ModalPortal({ children }: any) {
  const el = document.getElementById('modal')!;

  return reactDom.createPortal(children, el);
}
