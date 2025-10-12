import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditRecruiterForm from "./EditRecruiterForm";
import { updateRecruiter } from "@/api/super-admin/database";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const EditRecruiterDrawer = ({ isOpen, onClose, recruiter, onRevalidate }) => {
  const queryClient = useQueryClient();

  const { mutate: updateRecruiterMutation, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateRecruiter({ id, data }),
    onSuccess: (data, variables) => {
      toast.success("Recruiter updated successfully!");

      // Invalidate and refetch recruiter details
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-recruiter", variables.id],
      });

      // Invalidate and refetch recruiters list
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-recruiters"],
      });

      // Invalidate recruiter details query used in RecruiterDetailsDrawer
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-recruiter-details"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update recruiter"
      );
    },
  });

  const handleSave = async (formData) => {
    try {
      await updateRecruiterMutation({
        id: recruiter._id || recruiter.id,
        data: formData,
      });

      // Revalidate the list data
      if (onRevalidate) {
        await onRevalidate();
      }

      // Close the drawer
      onClose();
    } catch (error) {
      console.error("Error saving recruiter:", error);
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
          {recruiter && (
            <EditRecruiterForm
              recruiter={recruiter}
              onClose={onClose}
              onSave={handleSave}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditRecruiterDrawer;
