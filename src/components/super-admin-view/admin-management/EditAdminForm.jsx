import { useState, useEffect } from "react";
import CommonForm from "../../common/form";
import ButtonComponent from "../../common/button";
import { useGetFeatures } from "@/hooks/super-admin/useAdminManagement";
import { useUploadFile } from "@/hooks/super-admin/useUploadFile";
import { Checkbox } from "@/components/ui/checkbox";

const EditAdminForm = ({ admin, onSave, onClose, isSubmitting }) => {
  const [formData, setFormData] = useState({});
  const { mutate: uploadFile } = useUploadFile();
  const {
    data: featuresData,
    isLoading: featuresLoading,
    error: featuresError,
  } = useGetFeatures();

  const availableFeatures = featuresData?.data?.availableFeatures || [];

  const basicInfoFields = [
    {
      row: [
        {
          name: "firstName",
          label: "First Name",
          placeholder: "ex: John",
          componentType: "input",
          type: "text",
          width: "2/3",
        },
        {
          name: "lastName",
          label: "Last Name",
          placeholder: "ex: Doe",
          componentType: "input",
          type: "text",
          width: "2/3",
        },
        {
          name: "profileImage",
          label: "",
          placeholder: "Profile Picture",
          componentType: "file",
          type: "file",
          width: "1/3",
          accept: "image",
        },
      ],
    },
    {
      name: "phoneNumber",
      label: "Contact Information",
      placeholder: "ex: (123) 456-7890",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "ex: john.doe@example.com",
      componentType: "input",
      type: "email",
    },
  ];

  const passwordFields = admin
    ? [
        {
          name: "password",
          label: "Password",
          placeholder: "Leave blank to keep current password",
          componentType: "input",
          type: "password",
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          placeholder: "Leave blank to keep current password",
          componentType: "input",
          type: "password",
        },
      ]
    : [
        {
          name: "password",
          label: "Password",
          placeholder: "Enter password",
          componentType: "input",
          type: "password",
          required: true,
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          placeholder: "Confirm Password",
          componentType: "input",
          type: "password",
          required: true,
        },
      ];

  useEffect(() => {
    if (admin) {
      setFormData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        email: admin.email || "",
        phoneNumber: admin.phoneNumber || "",
        profileImage: admin.profileImage || "",
        allowedFeatures: admin.allowedFeatures || [],
        password: "",
        confirmPassword: "",
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
    }
  }, [admin]);

  const handleFeatureToggle = (featureObj) => {
    setFormData((prev) => ({
      ...prev,
      allowedFeatures: prev.allowedFeatures.includes(featureObj.feature)
        ? prev.allowedFeatures.filter((f) => f !== featureObj.feature)
        : [...prev.allowedFeatures, featureObj.feature],
    }));
  };

  const handleUpload = (file, callback) => {
    uploadFile(
      { file, role: "super-admin", folder: "documents" },
      {
        onSuccess: (data) => {
          const fileUrl = data?.data?.fileUrl;
          const fileName = data?.data?.fileName;
          if (callback) {
            callback(fileUrl, fileName);
          }
        },
        onError: (error) => {
          console.error("Upload error:", error);
        },
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!admin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!admin && formData.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        profileImage: formData.profileImage,
        allowedFeatures: formData.allowedFeatures,
        ...(formData.password && { password: formData.password }),
      };

      if (!admin) {
        payload.isVerified = formData.password === formData.confirmPassword;
      }

      await onSave(payload);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleReset = () => {
    if (admin) {
      setFormData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        email: admin.email || "",
        phoneNumber: admin.phoneNumber || "",
        profileImage: admin.profileImage || "",
        allowedFeatures: admin.allowedFeatures || [],
        password: "",
        confirmPassword: "",
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
    }
  };

  return (
    <div className="w-full h-screen p-6 bg-white overflow-y-auto overscroll-contain">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {admin ? "Edit Admin" : "Create Admin"}
          </h2>
          <p className="text-gray-600">
            {admin
              ? "Update admin information and details"
              : "Create a new admin account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={basicInfoFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assigned Features
            </h3>
            <div className="space-y-4">
              {featuresLoading ? (
                <div className="text-sm text-gray-500">Loading features...</div>
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
                        checked={formData.allowedFeatures?.includes(
                          featureObj.feature
                        )}
                        onCheckedChange={() => handleFeatureToggle(featureObj)}
                        className="mt-1"
                      />
                      <label
                        htmlFor={featureObj.feature}
                        className="cursor-pointer"
                      >
                        {featureObj.feature
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Password Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={passwordFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <ButtonComponent
              type="button"
              color="gray"
              buttonText="Reset"
              onClick={handleReset}
              className="px-6 py-2"
            />
            <ButtonComponent
              type="submit"
              color="#6945ED"
              buttonText={
                isSubmitting
                  ? "Processing..."
                  : admin
                  ? "Update Admin"
                  : "Create Admin"
              }
              isPending={isSubmitting}
              className="px-6 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdminForm;
