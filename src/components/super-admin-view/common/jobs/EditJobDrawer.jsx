import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditJobForm from "./EditJobForm";
import { useUpdateJob } from "@/hooks/super-admin/useJob";

const EditJobDrawer = ({ isOpen, onClose, job, onRevalidate }) => {
  const { mutateAsync: updateJob, isPending } = useUpdateJob();

  const handleSave = async (formData) => {
    try {
      await updateJob({
        id: job._id || job.id,
        data: formData,
      });

      // Revalidate the list data
      if (onRevalidate) {
        await onRevalidate();
      }

      // Close the drawer
      onClose();
    } catch (error) {
      console.error("Error saving job:", error);
      throw error; // Re-throw to let the form handle the error
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
          overflow-y-auto border-transparent [&>button.absolute]:hidden"
      >
        <div className="w-full h-full">
          {job && (
            <EditJobForm job={job} onClose={onClose} onSave={handleSave} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditJobDrawer;
