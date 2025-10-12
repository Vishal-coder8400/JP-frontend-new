import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditTrainingForm from "./EditTrainingForm";
import { useUpdateTraining } from "@/hooks/super-admin/useTraining";

const EditTrainingDrawer = ({ isOpen, onClose, training, onRevalidate }) => {
  const { mutateAsync: updateTraining, isPending } = useUpdateTraining();

  const handleSave = async (formData) => {
    try {
      await updateTraining({
        id: training._id || training.id,
        data: formData,
      });

      if (onRevalidate) {
        await onRevalidate();
      }

      onClose();
    } catch (error) {
      console.error("Error saving training:", error);
      throw error;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="
          w-full h-screen 
          lg:max-w-[750px]
          md:max-w-full
          sm:max-w-full 
          overflow-y-auto border-transparent [&>button.absolute]:hidden bg-white"
      >
        {training && (
          <EditTrainingForm
            training={training}
            onClose={onClose}
            onSave={handleSave}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditTrainingDrawer;
