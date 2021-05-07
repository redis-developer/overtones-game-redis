import React from "react";
import Modal from "components/modal";
import {
  PrimaryActionProps,
  SecondaryActionProps,
} from "components/modal/components/Footer";

interface ConfirmProps {
  title: string;
  children: React.ReactNode;
  secondaryAction: SecondaryActionProps;
  primaryAction: PrimaryActionProps;
}

const Confirm: React.FC<ConfirmProps> = ({
  title,
  children,
  secondaryAction,
  primaryAction,
}) => (
  <Modal size="small">
    <Modal.Header title={title} />
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer
      secondaryAction={secondaryAction}
      primaryAction={primaryAction}
    />
  </Modal>
);

export default Confirm;
