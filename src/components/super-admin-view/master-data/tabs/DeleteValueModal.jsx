import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { useDeleteDropdownValue } from "../../../../hooks/super-admin/useDropdowns";

const DeleteValueModal = ({ isOpen, onClose, dropdownId, value }) => {
  const deleteValueMutation = useDeleteDropdownValue(dropdownId);

  const handleDelete = async () => {
    try {
      await deleteValueMutation.mutateAsync(value.value || value._id);
      onClose();
    } catch (error) {
      console.error("Failed to delete dropdown value:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Delete Value</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete "{value?.label || value?.value}"?
            This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteValueMutation.isPending}
            className="cursor-pointer"
          >
            {deleteValueMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteValueModal;
