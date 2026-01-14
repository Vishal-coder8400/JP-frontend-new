import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Textarea } from "../../../ui/textarea";
import { useUpdateDropdown } from "../../../../hooks/super-admin/useDropdowns";

const EditDropdownModal = ({ isOpen, onClose, dropdown }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const updateDropdownMutation = useUpdateDropdown();

  const generateDropdownId = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  useEffect(() => {
    if (dropdown) {
      setFormData({
        name: dropdown.name || "",
        description: dropdown.description || "",
        category: dropdown.category || "",
      });
    }
  }, [dropdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      return;
    }

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
      };

      await updateDropdownMutation.mutateAsync({
        dropdownId: dropdown.dropdownId,
        payload,
      });
      onClose();
    } catch (error) {
      console.error("Failed to update dropdown:", error);
    }
  };

  const handleClose = () => {
    if (dropdown) {
      setFormData({
        name: dropdown.name || "",
        description: dropdown.description || "",
        category: dropdown.category || "",
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} className="bg-white">
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle>Edit Dropdown</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dropdownId">Dropdown ID</Label>
            <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-600">
              {dropdown?.dropdownId || "N/A"}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter dropdown name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="Enter category"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateDropdownMutation.isPending}
              className="cursor-pointer"
            >
              {updateDropdownMutation.isPending
                ? "Updating..."
                : "Update Dropdown"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDropdownModal;
