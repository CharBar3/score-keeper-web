"use client";

import { FC, ReactNode, createContext, useContext, useState } from "react";

type ToastSeverity = "error" | "warning" | "info" | "success";

interface ToastContextProps {
  message: string | null;
  severity: ToastSeverity;
  isOpen: boolean;
  handleClose: Function;
  showToast: (message: string, severity: ToastSeverity) => void;
}

const ToastContext = createContext<ToastContextProps>({
  message: null,
  severity: "info",
  isOpen: false,
  handleClose: () => {
    console.log("Make sure to add handleClose function to value prop");
  },
  showToast: () => {
    console.log("Make sure to add showToast function to value prop");
  },
});

interface ToastContextProviderProps {
  children: ReactNode;
}

export const ToastProvider: FC<ToastContextProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<ToastSeverity>("info");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const showToast = (message: string, severity: ToastSeverity) => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => {
        setMessage(message);
        setSeverity(severity);
        setIsOpen(true);
      }, 300);
    } else {
      setMessage(message);
      setSeverity(severity);
      setIsOpen(true);
    }
  };

  return (
    <ToastContext.Provider
      value={{ message, severity, isOpen, handleClose, showToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext<ToastContextProps>(ToastContext);
};
