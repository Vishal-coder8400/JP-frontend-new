import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditCompanyForm from "./EditCompanyForm";
import { useUpdateCompany } from "@/hooks/super-admin/useUpdateCompany";

const EditCompanyDrawer = ({ isOpen, onClose, company, onRevalidate }) => {
  const { mutate: updateCompany, isPending } = useUpdateCompany();

  const handleSave = async (formData) => {
    try {
      await updateCompany({
        id: company._id || company.id,
        data: formData,
      });

      // Revalidate the list data
      if (onRevalidate) {
        await onRevalidate();
      }

      // Close the drawer
      onClose();
    } catch (error) {
      console.error("Error saving company:", error);
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
          {company && (
            <EditCompanyForm
              company={company}
              onClose={onClose}
              onSave={handleSave}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditCompanyDrawer;
