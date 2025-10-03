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
import { useUpdateDropdownValue } from "../../../../hooks/super-admin/useDropdowns";

const EditValueModal = ({ isOpen, onClose, dropdownId, value }) => {
  const [formData, setFormData] = useState({
    label: "",
    description: "",
  });

  const updateValueMutation = useUpdateDropdownValue(dropdownId);

  const generateValue = (label) => {
    return label.toLowerCase().replace(/\s+/g, "-");
  };

  useEffect(() => {
    if (value && isOpen) {
      setFormData({
        label: value.label || value.value || "",
        description: value.description || "",
      });
    }
  }, [value, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.label) {
      return;
    }

    try {
      const generatedNewValue = generateValue(formData.label);
      const payload = {
        value: value.value, // old value
        newValue: generatedNewValue, // new value
        label: formData.label,
        description: formData.description,
      };

      await updateValueMutation.mutateAsync(payload);
      setFormData({ label: "", description: "" });
      onClose();
    } catch (error) {
      console.error("Failed to update dropdown value:", error);
    }
  };

  const handleClose = () => {
    setFormData({ label: "", description: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} className="bg-white">
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Edit Value</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Label *</Label>
            <Input
              id="label"
              type="text"
              value={formData.label}
              onChange={(e) =>
                setFormData({ ...formData, label: e.target.value })
              }
              placeholder="Enter label (e.g., Internship)"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Value</Label>
            <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-600">
              {formData.label
                ? generateValue(formData.label)
                : "Value will be generated from label"}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter description (e.g., Internship position)"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-2">
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
              disabled={updateValueMutation.isPending}
              className="cursor-pointer"
            >
              {updateValueMutation.isPending ? "Updating..." : "Update Value"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditValueModal;
