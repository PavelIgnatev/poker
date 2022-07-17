import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
  rootClassName?: string;
}

export const Modal = ({ children, rootClassName = 'root-portal' }: Props) => {
  const [container] = React.useState(() => document.getElementById('modal-root'));

  if (!container) {
    return null;
  }

  React.useEffect(() => {
    container.classList.add(rootClassName);
    return () => {
      container.classList.remove(rootClassName);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};
