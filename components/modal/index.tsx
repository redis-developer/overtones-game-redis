import * as React from "react";
import Portal from "components/portal";
import Backdrop from "./components/Backdrop";
import Container from "./components/Container";
import Header, { HeaderProps } from "./components/Header";
import Body from "./components/Body";
import Footer, { FooterProps } from "./components/Footer";

interface ModalProps {
  children: JSX.Element[];
  size?: "small" | "default";
}

interface Composition {
  Header: React.FC<HeaderProps>;
  Body: React.FC;
  Footer: React.FC<FooterProps>;
}

const Modal: React.FC<ModalProps> & Composition = ({
  children,
  size = "default",
}) => {
  //useDisableScroll(true);

  return (
    <Portal>
      <Backdrop>
        <Container size={size}>{children}</Container>
      </Backdrop>
    </Portal>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
