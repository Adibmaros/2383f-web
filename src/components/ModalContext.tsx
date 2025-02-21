"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("hasVisited");
      if (!hasVisited) {
        setIsModalOpen(true);
        localStorage.setItem("hasVisited", "true"); // Set status sudah pernah berkunjung
      }
    }
  }, []);

  const closeModal = () => setIsModalOpen(false);

  return <ModalContext.Provider value={{ isModalOpen, closeModal }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal harus digunakan di dalam ModalProvider");
  }
  return context;
};
