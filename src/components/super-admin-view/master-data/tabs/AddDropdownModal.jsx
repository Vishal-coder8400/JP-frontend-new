import { useState } from "react";
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
import { useCreateDropdown } from "../../../../hooks/super-admin/useDropdowns";
import { PlusIcon, TrashIcon } from "lucide-react";

const AddDropdownModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    dropdownId: "",
    name: "",
    description: "",
    category: "",
    values: [{ id: 1, value: "", label: "", description: "" }],
  });

  const createDropdownMutation = useCreateDropdown();

  const generateValue = (label) => {
    return label.toLowerCase().replace(/\s+/g, "-");
  };

  const generateDropdownId = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const addValue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData((prev) => ({
      ...prev,
      values: [
        ...prev.values,
        { id: Date.now(), value: "", label: "", description: "" },
      ],
    }));
  };

  const removeValue = (index) => {
    if (formData.values.length > 1) {
      setFormData((prev) => ({
        ...prev,
        values: prev.values.filter((_, i) => i !== index),
      }));
    }
  };

  const updateValue = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      return;
    }

    // Filter out empty values
    const validValues = formData.values.filter((v) => v.label.trim() !== "");

    if (validValues.length === 0) {
      return;
    }

    try {
      const generatedDropdownId = generateDropdownId(formData.name);
      const payload = {
        dropdownId: generatedDropdownId,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        values: validValues.map((value) => ({
          value: generateValue(value.label),
          label: value.label,
          description: value.description,
        })),
      };

      await createDropdownMutation.mutateAsync(payload);
      setFormData({
        dropdownId: "",
        name: "",
        description: "",
        category: "",
        values: [{ id: 1, value: "", label: "", description: "" }],
      });
      onClose();
    } catch (error) {
      console.error("Failed to create dropdown:", error);
    }
  };

  const handleClose = () => {
    setFormData({
      dropdownId: "",
      name: "",
      description: "",
      category: "",
      values: [{ value: "", label: "", description: "" }],
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} className="bg-white">
      <DialogContent className="sm:max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Dropdown</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter dropdown name (e.g., Job Types)"
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
                placeholder="Enter category (e.g., jobs)"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Dropdown ID</Label>
            <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-600">
              {formData.name
                ? generateDropdownId(formData.name)
                : "Dropdown ID will be generated from name"}
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
              placeholder="Enter description (e.g., Available job types for job postings)"
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Values *</Label>
              <Button
                type="button"
                onClick={(e) => addValue(e)}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Value
              </Button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {formData.values.map((value, index) => (
                <div
                  key={value.id}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Value {index + 1}
                    </span>
                    {formData.values.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeValue(index)}
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Label *</Label>
                      <Input
                        type="text"
                        value={value.label}
                        onChange={(e) =>
                          updateValue(index, "label", e.target.value)
                        }
                        placeholder="Enter label (e.g., Full Time)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-600">
                        {value.label
                          ? generateValue(value.label)
                          : "Value will be generated from label"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={value.description}
                      onChange={(e) =>
                        updateValue(index, "description", e.target.value)
                      }
                      placeholder="Enter description (e.g., Full-time employment)"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
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
              disabled={createDropdownMutation.isPending}
              className="cursor-pointer"
            >
              {createDropdownMutation.isPending
                ? "Creating..."
                : "Create Dropdown"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDropdownModal;
