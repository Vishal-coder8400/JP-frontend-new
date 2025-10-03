import { useState, useEffect } from "react";
import { UploadIcon, CheckCircle } from "lucide-react";
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
import {
  useCreateAdmin,
  useUpdateAdmin,
  useGetFeatures,
  useProfileImageUpload,
} from "@/hooks/super-admin/useAdminManagement";

const EditAdminDrawer = ({ open, onClose, admin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
    allowedFeatures: [],
    password: "",
    confirmPassword: "",
  });
  const [uploadStatus, setUploadStatus] = useState({
    isUploaded: false,
    fileName: "",
  });

  const createAdminMutation = useCreateAdmin();
  const updateAdminMutation = useUpdateAdmin();
  const profileImageUploadMutation = useProfileImageUpload();
  const {
    data: featuresData,
    isLoading: featuresLoading,
    error: featuresError,
  } = useGetFeatures();

  const availableFeatures = featuresData?.data?.data?.availableFeatures || [];

  useEffect(() => {
    if (admin) {
      setFormData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        profileImage: admin.profileImage || "",
        allowedFeatures: admin.allowedFeatures || [],
        password: "",
        confirmPassword: "",
      });
      setUploadStatus({
        isUploaded: !!admin.profileImage,
        fileName: admin.profileImage ? "Existing image" : "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        profileImage: "",
        allowedFeatures: [],
        password: "",
        confirmPassword: "",
      });
      setUploadStatus({
        isUploaded: false,
        fileName: "",
      });
    }
  }, [admin, open]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureToggle = (featureObj) => {
    setFormData((prev) => ({
      ...prev,
      allowedFeatures: prev.allowedFeatures.includes(featureObj.feature)
        ? prev.allowedFeatures.filter((f) => f !== featureObj.feature)
        : [...prev.allowedFeatures, featureObj.feature],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend password validation
    if (!admin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!admin && formData.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    try {
      if (admin) {
        // Update existing admin
        await updateAdminMutation.mutateAsync({
          adminId: admin._id,
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            profileImage: formData.profileImage,
            allowedFeatures: formData.allowedFeatures,
            // Only include password if it's provided
            ...(formData.password && { password: formData.password }),
          },
        });
      } else {
        // Create new admin
        await createAdminMutation.mutateAsync({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          profileImage: formData.profileImage,
          allowedFeatures: formData.allowedFeatures,
          isVerified: formData.password === formData.confirmPassword,
        });
      }

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleReset = () => {
    if (admin) {
      setFormData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        profileImage: admin.profileImage || "",
        allowedFeatures: admin.allowedFeatures || [],
        password: "",
        confirmPassword: "",
      });
      setUploadStatus({
        isUploaded: !!admin.profileImage,
        fileName: admin.profileImage ? "Existing image" : "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        profileImage: "",
        allowedFeatures: [],
        password: "",
        confirmPassword: "",
      });
      setUploadStatus({
        isUploaded: false,
        fileName: "",
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
                  <Label htmlFor="firstName" className={"mb-2"}>
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="ex: John"
                    className={`p-2 placeholder:text-gray1/75 ${
                      formData.firstName ? "text-black" : "text-gray1/75"
                    }`}
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="lastName" className={"mb-2"}>
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="ex: Doe"
                    className={`p-2 placeholder:text-gray1/75 ${
                      formData.lastName ? "text-black" : "text-gray1/75"
                    }`}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="profile-picture" className="mb-2">
                    Profile Picture
                  </Label>
                  <div className="flex items-center gap-2">
                    {uploadStatus.isUploaded ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <UploadIcon className="w-6 h-6 text-gray1" />
                    )}
                    <label
                      htmlFor="profile-picture"
                      className={`cursor-pointer flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 w-52 ${
                        profileImageUploadMutation.isPending
                          ? "opacity-50 cursor-not-allowed border-gray-300"
                          : uploadStatus.isUploaded
                          ? "border-green-300 bg-green-50"
                          : "border-gray-300"
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          uploadStatus.isUploaded
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        {profileImageUploadMutation.isPending
                          ? "Uploading..."
                          : uploadStatus.isUploaded
                          ? `✓ ${uploadStatus.fileName}`
                          : "Choose File"}
                      </span>
                    </label>
                    <Input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={profileImageUploadMutation.isPending}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          try {
                            // Upload file to server and get URL
                            const response =
                              await profileImageUploadMutation.mutateAsync(
                                file
                              );
                            if (response?.data?.url) {
                              handleInputChange(
                                "profileImage",
                                response.data.url
                              );
                              setUploadStatus({
                                isUploaded: true,
                                fileName: file.name,
                              });
                            }
                          } catch (error) {
                            console.error(
                              "Error uploading profile image:",
                              error
                            );
                            setUploadStatus({
                              isUploaded: false,
                              fileName: "",
                            });
                          }
                        }
                      }}
                    />
                  </div>
                  {formData.profileImage && (
                    <div className="mt-2">
                      <img
                        src={formData.profileImage}
                        alt="Profile preview"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="mb-1 text-sm">Contact Information</p>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  placeholder="ex: (123) 456-7890"
                  className={`p-2 placeholder:text-gray1/75 ${
                    formData.phoneNumber ? "text-black" : "text-gray1/75"
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

                {featuresLoading ? (
                  <div className="text-sm text-gray-500">
                    Loading features...
                  </div>
                ) : featuresError ? (
                  <div className="text-sm text-red-500">
                    Error loading features
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {availableFeatures.map((featureObj) => (
                      <div
                        key={featureObj.feature}
                        className="flex items-start space-x-3 border border-gray2 p-3 rounded-lg text-gray1 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox
                          id={featureObj.feature}
                          checked={formData.allowedFeatures.includes(
                            featureObj.feature
                          )}
                          onCheckedChange={() =>
                            handleFeatureToggle(featureObj)
                          }
                          className="mt-1"
                        />
                        {featureObj.feature
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="border border-gray-2 rounded-lg p-4 space-y-6">
              <h3 className="text-lg font-semibold border-b border-gray2 pb-1">
                Password Information
              </h3>

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
                  placeholder={
                    admin
                      ? "Leave blank to keep current password"
                      : "Enter password"
                  }
                  className={`p-2 placeholder:text-gray1/75 ${
                    formData.password ? "text-black" : "text-gray1/75"
                  }`}
                  required={!admin}
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className={"mb-2"}>
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  placeholder={
                    admin
                      ? "Leave blank to keep current password"
                      : "Confirm Password"
                  }
                  className={`p-2 placeholder:text-gray1/75 ${
                    formData.confirmPassword ? "text-black" : "text-gray1/75"
                  }`}
                  required={!admin}
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
          <Button
            variant={"purple"}
            onClick={handleSubmit}
            disabled={
              createAdminMutation.isPending || updateAdminMutation.isPending
            }
          >
            {createAdminMutation.isPending || updateAdminMutation.isPending
              ? "Processing..."
              : admin
              ? "Update Admin"
              : "Create Admin"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditAdminDrawer;
