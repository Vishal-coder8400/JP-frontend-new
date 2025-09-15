import React, { useState, useEffect } from "react";
import { UploadIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { availableFeatures } from "./mockData";

const EditAdminDrawer = ({ open, onClose, admin, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    features: [],
    userId: "",
    password: "",
  });

  useEffect(() => {
    if (admin) {
      // Edit mode - populate with admin data
      setFormData({
        name: admin.owner.name,
        email: admin.email,
        phone: admin.phone,
        features: admin.features,
        userId: admin.userId || "",
        password: "",
      });
    } else {
      // Create mode - reset to empty form
      setFormData({
        name: "",
        email: "",
        phone: "",
        features: [],
        userId: "",
        password: "",
      });
    }
  }, [admin, open]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleReset = () => {
    if (admin) {
      // Edit mode - reset to original admin data
      setFormData({
        name: admin.owner.name,
        email: admin.email,
        phone: admin.phone,
        features: admin.features,
        userId: admin.userId || "",
        password: "",
      });
    } else {
      // Create mode - reset to empty form
      setFormData({
        name: "",
        email: "",
        phone: "",
        features: [],
        userId: "",
        password: "",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md lg:max-w-[700px] bg-white p-6">
        <SheetHeader>
          <SheetTitle className={"text-2xl"}>
            {admin ? "Edit Admin" : "Create Admin"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border border-gray-2 rounded-lg p-4 space-y-6">
              <h3 className="text-lg font-semibold border-b border-gray2 pb-1">
                Basic Information
              </h3>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex-1">
                  <Label htmlFor="name" className={"mb-2"}>
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="ex: John Doe"
                    className={`p-2 placeholder:text-gray1/75 ${
                      formData.name ? "text-black" : "text-gray1/75"
                    }`}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="profile-picture" className="mb-2">
                    Profile Picture
                  </Label>
                  <div className="flex items-center gap-2">
                    <UploadIcon className="w-6 h-6 text-gray1" />
                    <label
                      htmlFor="profile-picture"
                      className="cursor-pointer flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 w-52"
                    >
                      <span className="text-sm text-gray-600">Choose File</span>
                    </label>
                    <Input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="mb-1 text-sm">Contact Information</p>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="ex: (123) 456-7890"
                  className={`p-2 placeholder:text-gray1/75 ${
                    formData.phone ? "text-black" : "text-gray1/75"
                  }`}
                  required
                />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="ex: john.doe@example.com"
                  className={`p-2 placeholder:text-gray1/75 ${
                    formData.email ? "text-black" : "text-gray1/75"
                  }`}
                  required
                />
              </div>

              <div className="space-y-2">
                <p className="mb-2 text-sm">Assigned Features</p>

                {availableFeatures.slice(0, 8).map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-2 border border-gray2 p-3 rounded max-w-xs text-gray1 cursor-pointer"
                  >
                    <Checkbox
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <label htmlFor={feature} className="text-sm font-medium">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-2 rounded-lg p-4 space-y-6">
              <h3 className="text-lg font-semibold border-b border-gray2 pb-1">
                Create ID and Password
              </h3>

              <div>
                <Label htmlFor="user-id" className={"mb-2"}>
                  User ID
                </Label>
                <Input
                  id="user-id"
                  value={formData.userId}
                  onChange={(e) => handleInputChange("userId", e.target.value)}
                  placeholder="ex: johndoe123"
                  className={`p-2 placeholder:text-gray1/75 ${
                    formData.userId ? "text-black" : "text-gray1/75"
                  }`}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className={"mb-2"}>
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Enter password"
                  className={`p-2 placeholder:text-gray1/75 ${
                    formData.password ? "text-black" : "text-gray1/75"
                  }`}
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <SheetFooter className="flex flex-row items-center justify-end w-full gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className={"rounded-3xl"}
          >
            Reset
          </Button>
          <Button variant={"purple"} onClick={handleSubmit}>
            Continue
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditAdminDrawer;
