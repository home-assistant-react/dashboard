import React from "react";

export const useDragDetect = () => {
  const [isDragging, setIsDragging] = React.useState(false);
  let dragEnterCounter = 0;

  React.useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragEnterCounter++;

      const draggedItems = e.dataTransfer?.items;

      if (
        draggedItems &&
        Array.from(draggedItems).every((item) => item.kind === "file")
      ) {
        setIsDragging(true);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragEnterCounter--;
      if (dragEnterCounter <= 0) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dragEnterCounter = 0;
      setIsDragging(false);
    };

    window.addEventListener("dragenter", handleDragEnter, true);
    window.addEventListener("dragover", handleDragOver, true);
    window.addEventListener("dragleave", handleDragLeave, true);
    window.addEventListener("drop", handleDrop, true);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter, true);
      window.removeEventListener("dragover", handleDragOver, true);
      window.removeEventListener("dragleave", handleDragLeave, true);
      window.removeEventListener("drop", handleDrop, true);
    };
  }, []);

  return isDragging;
};
