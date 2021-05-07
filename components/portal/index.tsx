import * as React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  disable?: boolean;
  container?: Element;
}

const Portal: React.FC<PortalProps> = ({ disable, children, container }) =>
  disable ? (
    <>{children}</>
  ) : (
    createPortal(children, container || document.body)
  );

export default Portal;
