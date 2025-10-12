import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditAdminForm from "./EditAdminForm";
import {
  useCreateAdmin,
  useUpdateAdmin,
} from "@/hooks/super-admin/useAdminManagement";
import { useQueryClient } from "@tanstack/react-query";

const EditAdminDrawer = ({ open, onClose, admin }) => {
  const queryClient = useQueryClient();
  const createAdminMutation = useCreateAdmin();
  const updateAdminMutation = useUpdateAdmin();

  const isSubmitting =
    createAdminMutation.isPending || updateAdminMutation.isPending;

  const handleSave = async (formData) => {
    try {
      if (admin) {
        await updateAdminMutation.mutateAsync({
          adminId: admin._id,
          data: formData,
        });
      } else {
        await createAdminMutation.mutateAsync(formData);
      }

      queryClient.invalidateQueries({ queryKey: ["superAdmin-admins"] });

      onClose();
    } catch (error) {
      console.error("Error saving admin:", error);
      throw error;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
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
          <EditAdminForm
            admin={admin}
            onClose={onClose}
            onSave={handleSave}
            isSubmitting={isSubmitting}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditAdminDrawer;
