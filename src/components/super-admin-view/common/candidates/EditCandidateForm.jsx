import { useEffect, useState } from "react";
import CommonForm from "@/components/common/form";
import ButtonComponent from "@/components/common/button";
import { useUploadFile } from "@/hooks/super-admin/useUploadFile";
import {
  editCandidateBasicDetails,
  editCandidateWorkExperience,
  editCandidateWorkExperienceSummary,
  editCandidateRoleExpertise,
  editCandidateAdditionalDetails,
  editCandidateAdditionalDetails2,
  editCandidateAdditionalDetails3,
  editCandidateEducation,
  editCandidateCertifications,
} from "./editCandidateSchema";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

const EditCandidateForm = ({ candidate, onSave, onClose }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workExperiences, setWorkExperiences] = useState([{}]);
  const [educationEntries, setEducationEntries] = useState([{}]);
  const [certificationEntries, setCertificationEntries] = useState([{}]);
  const { mutate: uploadFile } = useUploadFile();

  useEffect(() => {
    if (!candidate) return;

    const birthDate = candidate?.dob || "";
    const formattedBirthDate = birthDate
      ? (() => {
          const parts = birthDate.split("-");
          if (parts.length === 3) {
            if (parts[0].length === 4) {
              return birthDate;
            }
            return `${parts[2]}-${parts[0]}-${parts[1]}`;
          }
          return birthDate;
        })()
      : "";

    setFormData({
      // Basic Details
      name: candidate?.name || "",
      birthDate: formattedBirthDate,
      phone: candidate?.phone || { countryCode: "+91", number: "" },
      email: candidate?.email || "",
      about: candidate?.about,
      profilePicture: candidate?.profilePicture || "",
      currentAddress: candidate?.currentAddress
        ? {
            address: candidate?.currentAddress?.address || "",
            city: candidate?.currentAddress?.city || "",
            state: candidate?.currentAddress?.state || "",
            pincode: candidate?.currentAddress?.pincode || "",
          }
        : {
            address: "",
            city: "",
            state: "",
            pincode: "",
          },
      permanentAddress: candidate?.permanentAddress || {
        address: "",
        city: "",
        state: "",
        pincode: "",
      },
      gender: candidate?.gender || "",
      resume: candidate?.resume || "",
      currentWorkingStatus: candidate?.currentWorkingStatus || "",

      // Working Details Summary
      totalExperience: candidate?.totalExperience || "",
      skillSet: Array.isArray(candidate?.skills)
        ? (candidate?.skills).join(", ")
        : candidate?.skills || "",

      // Role & Expertise
      roleLookingFor: candidate?.roleLookingFor || "",
      currentIndustry: candidate?.currentIndustry || "",
      areaOfExpertise: candidate?.areaOfExpertise || [],
      functionalAreas: candidate?.functionalAreas || [],
      location: candidate?.location || candidate?.preferredLocation || [],

      // Additional Details
      maritalStatus: candidate?.maritalStatus || "",
      handleTeam: candidate?.handleTeam || "",
      willingTo6DayWork: candidate?.willingTo6DayWork || "",
      willingToRelocate: candidate?.willingToRelocate || "",
      earlyStageStartup: candidate?.earlyStageStartup || "",
      differentlyAbled: candidate?.differentlyAbled || "",
      medicalProblem: candidate?.medicalProblem || "",
      willingToTravel: candidate?.willingToTravel || "",
      languages: candidate?.data?.languages || candidate?.languages || [],

      // Salary & Notice Period
      noticePeriod: candidate?.noticePeriod || "",
      currentSalary: candidate?.currentSalary || "",
      expectedSalary: candidate?.expectedSalary || "",
    });

    // Initialize work experiences
    if (
      candidate?.experienceDetails &&
      Array.isArray(candidate.experienceDetails)
    ) {
      const mappedExperiences = candidate.experienceDetails.map((exp) => ({
        companyName: exp.companyName || "",
        employmentType: exp.employmentType || "",
        startingYear: exp.startDate || "",
        endingYear: exp.currentlyWorking ? "" : exp.endDate || "",
      }));
      setWorkExperiences(
        mappedExperiences.length > 0 ? mappedExperiences : [{}]
      );
    } else {
      setWorkExperiences([{}]);
    }

    // Initialize education entries
    if (candidate?.education && Array.isArray(candidate.education)) {
      setEducationEntries(
        candidate.education.length > 0 ? candidate.education : [{}]
      );
    } else {
      setEducationEntries([{}]);
    }

    // Initialize certification entries
    if (candidate?.certifications && Array.isArray(candidate.certifications)) {
      setCertificationEntries(
        candidate.certifications.length > 0 ? candidate.certifications : [{}]
      );
    } else {
      setCertificationEntries([{}]);
    }
  }, [candidate]);

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

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, {}]);
  };

  const removeWorkExperience = (index) => {
    if (workExperiences.length > 1) {
      setWorkExperiences(workExperiences.filter((_, i) => i !== index));
    }
  };

  const addEducation = () => {
    setEducationEntries([...educationEntries, {}]);
  };

  const removeEducation = (index) => {
    if (educationEntries.length > 1) {
      setEducationEntries(educationEntries.filter((_, i) => i !== index));
    }
  };

  const addCertification = () => {
    setCertificationEntries([...certificationEntries, {}]);
  };

  const removeCertification = (index) => {
    if (certificationEntries.length > 1) {
      setCertificationEntries(
        certificationEntries.filter((_, i) => i !== index)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Filter out empty entries
      const filterEmptyEntries = (entries) => {
        return entries.filter((entry) => {
          return Object.values(entry).some((value) => {
            if (Array.isArray(value)) return value.length > 0;
            if (typeof value === "object" && value !== null)
              return Object.keys(value).length > 0;
            return value !== "" && value !== null && value !== undefined;
          });
        });
      };

      const filteredWork = filterEmptyEntries(workExperiences);
      const filteredEdu = filterEmptyEntries(educationEntries);
      const filteredCert = filterEmptyEntries(certificationEntries);

      // Map work experience fields to backend format
      const mappedExperience = filteredWork.map((exp) => ({
        companyName: exp.companyName,
        employmentType: exp.employmentType,
        startDate: exp.startingYear,
        endDate: exp.endingYear,
        currentlyWorking: !exp.endingYear || exp.endingYear === "",
      }));

      // Map education fields to backend format
      const mappedEducation = filteredEdu.map((edu) => ({
        institution: edu.institution,
        degree: edu.degree,
        graduationYear: edu.endDate || edu.graduationYear,
        fieldOfStudy: edu.fieldOfStudy,
        grade: edu.grade,
      }));

      // Map certification fields to backend format
      const mappedCertifications = filteredCert.map((cert) => ({
        name: cert.title,
        issuer: cert.issuingOrganization,
        date: cert.issueDate,
      }));

      let payload = {
        ...formData,
      };

      // Map fields to backend format
      const backendPayload = {};

      // Basic fields
      if (payload.name) backendPayload.name = payload.name;
      if (payload.email) backendPayload.email = payload.email;
      if (payload.gender) backendPayload.gender = payload.gender;
      if (payload.profilePicture)
        backendPayload.profilePicture = payload.profilePicture;
      if (payload.resume) backendPayload.resume = payload.resume;
      if (payload.about) backendPayload.about = payload.about;

      // Phone mapping
      if (payload.phone) {
        if (typeof payload.phone === "object" && payload.phone.number) {
          backendPayload.phone = {
            number: payload.phone.number,
            countryCode: payload.phone.countryCode || "+91",
          };
        } else if (typeof payload.phone === "string") {
          backendPayload.phone = {
            number: payload.phone,
            countryCode: "+91",
          };
        }
      }

      // DOB mapping
      if (payload.birthDate) {
        const date = new Date(payload.birthDate);
        if (!isNaN(date.getTime())) {
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const year = date.getFullYear();
          backendPayload.dob = `${month}-${day}-${year}`;
        }
      }

      // Address mapping
      if (
        payload.currentAddress &&
        typeof payload.currentAddress === "object"
      ) {
        const { address, city, state, pincode } = payload.currentAddress;
        if (address || city || state || pincode) {
          backendPayload.address = {};
          if (address) backendPayload.address.street = address;
          if (city) backendPayload.address.city = city;
          if (state) backendPayload.address.state = state;
          if (pincode) backendPayload.address.zipCode = pincode;
        }
      }

      // Skills mapping
      if (payload.skillSet) {
        if (typeof payload.skillSet === "string") {
          backendPayload.skills = payload.skillSet
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0);
        } else if (Array.isArray(payload.skillSet)) {
          backendPayload.skills = payload.skillSet;
        }
      }

      // Total Experience
      if (payload.totalExperience) {
        backendPayload.totalExperience = payload.totalExperience;
      }

      // Experience, Education, Certifications
      if (mappedExperience.length > 0)
        backendPayload.experienceDetails = mappedExperience;
      if (mappedEducation.length > 0)
        backendPayload.education = mappedEducation;
      if (mappedCertifications.length > 0)
        backendPayload.certifications = mappedCertifications;

      // Job preferences
      if (
        payload.location &&
        Array.isArray(payload.location) &&
        payload.location.length > 0
      ) {
        backendPayload.preferredLocations = payload.location;
      }
      if (
        payload.expectedSalary !== undefined &&
        payload.expectedSalary !== ""
      ) {
        backendPayload.expectedSalary = payload.expectedSalary;
      }
      if (payload.noticePeriod)
        backendPayload.noticePeriod = payload.noticePeriod;

      payload = backendPayload;

      // Remove empty fields from payload
      const cleanPayload = Object.entries(payload).reduce(
        (acc, [key, value]) => {
          // Skip empty strings
          if (value === "" || value === null || value === undefined) {
            return acc;
          }
          // Skip empty arrays
          if (Array.isArray(value) && value.length === 0) {
            return acc;
          }
          // Skip empty objects (but not Date objects)
          if (
            typeof value === "object" &&
            value !== null &&
            !Array.isArray(value) &&
            !(value instanceof Date) &&
            Object.keys(value).length === 0
          ) {
            return acc;
          }
          acc[key] = value;
          return acc;
        },
        {}
      );

      await onSave(cleanPayload);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Edit Candidate
          </h2>
          <p className="text-gray-600">Update candidate profile information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
            <div className="space-y-4">
              <CommonForm
                formControls={editCandidateBasicDetails}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Work Experience Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">
              Professional Experience Summary
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={editCandidateWorkExperienceSummary}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Work Experience Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Work Experience Details</h3>
              <Button
                type="button"
                onClick={addWorkExperience}
                variant={"purple"}
              >
                Add Experience
              </Button>
            </div>
            <div className="space-y-6">
              {workExperiences.map((experience, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-700">
                      Experience #{index + 1}
                    </h4>
                    {workExperiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWorkExperience(index)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <CommonForm
                    formControls={editCandidateWorkExperience}
                    formData={experience}
                    setFormData={(updater) => {
                      const updated =
                        typeof updater === "function"
                          ? updater(experience)
                          : updater;
                      const newExperience = { ...experience, ...updated };
                      const updatedExperiences = [...workExperiences];
                      updatedExperiences[index] = newExperience;
                      setWorkExperiences(updatedExperiences);
                    }}
                    handleUpload={handleUpload}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Role & Expertise */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Role & Expertise</h3>
            <div className="space-y-4">
              <CommonForm
                formControls={editCandidateRoleExpertise}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={editCandidateAdditionalDetails}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
              <CommonForm
                formControls={editCandidateAdditionalDetails2}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
              <CommonForm
                formControls={editCandidateAdditionalDetails3}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Education</h3>
              <Button type="button" onClick={addEducation} variant={"purple"}>
                Add Education
              </Button>
            </div>
            <div className="space-y-6">
              {educationEntries.map((education, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-700">
                      Education #{index + 1}
                    </h4>
                    {educationEntries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <CommonForm
                    formControls={editCandidateEducation}
                    formData={education}
                    setFormData={(updater) => {
                      const updated =
                        typeof updater === "function"
                          ? updater(education)
                          : updater;
                      const newEducation = { ...education, ...updated };
                      const updatedEducations = [...educationEntries];
                      updatedEducations[index] = newEducation;
                      setEducationEntries(updatedEducations);
                    }}
                    handleUpload={handleUpload}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Certifications</h3>
              <Button
                type="button"
                onClick={addCertification}
                variant={"purple"}
              >
                Add Certification
              </Button>
            </div>
            <div className="space-y-6">
              {certificationEntries.map((certification, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-700">
                      Certification #{index + 1}
                    </h4>
                    {certificationEntries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <CommonForm
                    formControls={editCandidateCertifications}
                    formData={certification}
                    setFormData={(updater) => {
                      const updated =
                        typeof updater === "function"
                          ? updater(certification)
                          : updater;
                      const newCertification = { ...certification, ...updated };
                      const updatedCertifications = [...certificationEntries];
                      updatedCertifications[index] = newCertification;
                      setCertificationEntries(updatedCertifications);
                    }}
                    handleUpload={handleUpload}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <ButtonComponent
              type="button"
              color="gray"
              buttonText="Cancel"
              onClick={onClose}
              className="px-6 py-2"
            />
            <ButtonComponent
              type="submit"
              color="#6945ED"
              buttonText={isSubmitting ? "Updating..." : "Update Candidate"}
              isPending={isSubmitting}
              className="px-6 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCandidateForm;
