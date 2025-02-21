"use client";

import * as React from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ImageCarousel from "./components/ImageCarousel";
import Navbar from "./components/Navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/ModalContext";

const Page = () => {
  const { isModalOpen, closeModal } = useModal();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div>
        <Hero />
        <ImageCarousel />
        <Footer />
      </div>

      {/* Modal Pemberitahuan */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Info Terbaru!</DialogTitle>
            <DialogDescription>🚀 Kami baru saja memperbarui fitur di website ini! Jangan lupa cek halaman utama untuk melihat yang baru.</DialogDescription>
          </DialogHeader>
          <Button onClick={closeModal}>Tutup</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
