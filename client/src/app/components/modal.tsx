import React from "react";
import ReactDOM from "react-dom";
import Header from "./header";
import { X } from "lucide-react";

type IModalProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

function Modal({
  children,
  isOpen = false,
  onClose = () => {},
  name = "Modal",
}: IModalProps) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex size-full items-center justify-center overflow-y-auto bg-gray-600/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
        <Header
          name={name}
          buttonComponent={
            <button
              className="flex size-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600"
              onClick={onClose}
            >
              <X className="size-18" />
            </button>
          }
        />
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
