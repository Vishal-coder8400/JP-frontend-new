import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditTrainerForm from "./EditTrainerForm";
import { useUpdateTrainer } from "@/hooks/super-admin/useTrainers";

const EditTrainerDrawer = ({ isOpen, onClose, trainer, onRevalidate }) => {
  const { mutate: updateTrainer, isPending } = useUpdateTrainer();

  const handleSave = async (formData) => {
    try {
      await updateTrainer({
        id: trainer._id || trainer.id,
        data: formData,
      });

      // Revalidate the list data
      if (onRevalidate) {
        await onRevalidate();
      }

      // Close the drawer
      onClose();
    } catch (error) {
      console.error("Error saving trainer:", error);
      throw error; // Re-throw to let the form handle the error
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="
          w-full h-screen 
          lg:max-w-[1000px] 
          md:max-w-full
          sm:max-w-full 
          overflow-y-auto border-transparent [&>button.absolute]:hidden"
      >
        <div className="w-full h-full">
          {trainer && (
            <EditTrainerForm
              trainer={trainer}
              onClose={onClose}
              onSave={handleSave}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditTrainerDrawer;
