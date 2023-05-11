"use client";

import uniqid from "uniqid";
import { FC, ReactNode, createContext, useContext, useState } from "react";

type ToastSeverity = "error" | "warning" | "info" | "success";

interface ToastContextProps {
  toastQueue: ToaseQueueItem[];
  handleCloseToast: (id: string) => void;
  showToast: (message: string, severity: ToastSeverity) => void;
}

const ToastContext = createContext<ToastContextProps>({
  toastQueue: [],
  handleCloseToast: () => {
    console.log("Make sure to add handleClose function to value prop");
  },
  showToast: () => {
    console.log("Make sure to add showToast function to value prop");
  },
});

interface ToaseQueueItem {
  id: string;
  message: string;
  severity: ToastSeverity;
  isOpen: boolean;
}
interface ToastContextProviderProps {
  children: ReactNode;
}

export const ToastProvider: FC<ToastContextProviderProps> = ({ children }) => {
  const [toastQueue, setToastQueue] = useState<ToaseQueueItem[]>([]);

  const showToast = (message: string, severity: ToastSeverity) => {
    const newToast = { id: uniqid(), message, severity, isOpen: true };

    setToastQueue((prevState) => {
      let updatedQueue = [newToast, ...prevState.slice(0, 2)];

      if (updatedQueue[2]) {
        updatedQueue[2].isOpen = false;
      }

      return [...updatedQueue];
    });

    setTimeout(() => {
      handleCloseToast(newToast.id);
    }, 6000);
  };

  const handleCloseToast = (id: string) => {
    let shouldCleanup = false;

    setToastQueue((prevState) => {
      const newState = prevState.map((toast) =>
        toast.id === id ? { ...toast, isOpen: false } : toast
      );

      if (newState.every((toast) => !toast.isOpen)) {
        shouldCleanup = true;
      }

      return [...newState];
    });

    if (shouldCleanup) {
      setTimeout(() => {
        handleQueueCleanup();
      }, 1000);
    }
  };

  const handleQueueCleanup = () => {
    setToastQueue((prevState) => {
      return [];
    });
  };

  return (
    <ToastContext.Provider
      value={{
        toastQueue,
        handleCloseToast,
        showToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext<ToastContextProps>(ToastContext);
};
