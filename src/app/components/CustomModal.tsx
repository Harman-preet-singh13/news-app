import { ReactNode } from "react";
import Modal from "react-modal";

type customModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: ReactNode;
};

export default function CustomModal({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
}: customModalProps) {
  return(
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel={contentLabel}
    overlayClassName="modal-overlay"
    className="modal-content"
  >
    {children}
  </Modal>
  )
  
}