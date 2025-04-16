"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import styles from "../app/page.module.css";
import {
  Button,
  Modal,
  Box,
  Fade,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [images, setImages] = useState<string[]>([
    "/Images/bg3.avif",
    "/Images/bg1.webp",
    "/Images/bg2.jpg",
    "/Images/bg3.avif",
    "/Images/bg3.avif",
    "/Images/bg1.webp",
    "/Images/bg2.jpg",
    "/Images/bg3.avif",
  ]);

  const handleOpen = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleDeleteCancel = () => {
    setConfirmOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedImage) {
      setImages(images.filter((img) => img !== selectedImage));
      setConfirmOpen(false);
      handleClose();
    }
  };

  return (
    <div className={styles.page}>
      <main>
        <div className={styles.navbar}>
          <Navbar />
        </div>

        <div className={styles.background}>
          <div className={styles.home}>
            <FileUploadOutlinedIcon className={styles.upload} />
            <h2>Drag and drop Images Here to Upload</h2>
            <h3>Or</h3>
            <Button variant="contained">Select Images to Upload</Button>
          </div>
        </div>

        <div className={styles.galleryImage}>
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => handleOpen(src)}
              style={{ cursor: "pointer" }}
            >
              <Image
                className={styles.image}
                src={src}
                alt={`Gallery image ${index}`}
                width={390}
                height={380}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Modal for image preview */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              outline: "none",
              borderRadius: 2,
              maxWidth: "90vw",
              maxHeight: "90vh",
              textAlign: "center",
            }}
          >
            {/* Close button */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0,0,0,0.4)",
                color: "white",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
              }}
            >
              <CloseIcon />
            </IconButton>

            {selectedImage && (
              <>
                <Image
                  src={selectedImage}
                  alt="Preview"
                  width={800}
                  height={600}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "70vh",
                    borderRadius: "12px",
                    marginBottom: "20px",
                  }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteClick}
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this image?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </div>
  );
}
