import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { validateFormData } from "@/utils/commonFunctions";
import { z } from "zod";
import { toast } from "sonner";

// Validation schemas
const editTrainerSchema = z
  .object({
    // Personal Information (all optional)
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z
      .string()
      .email("Please enter a valid email")
      .optional()
      .or(z.literal("")),
    phoneNumber: z.string().optional(),
    profileImage: z.string().optional(),
    location: z.string().optional(),

    // Professional Information (all optional)
    bio: z.string().optional(),
    specialization: z.string().optional(),
    experience: z.number().optional(),
    skills: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
    linkedinProfile: z
      .string()
      .url("Please enter a valid LinkedIn URL")
      .optional()
      .or(z.literal("")),
    portfolio: z
      .string()
      .url("Please enter a valid URL")
      .optional()
      .or(z.literal("")),
    website: z
      .string()
      .url("Please enter a valid URL")
      .optional()
      .or(z.literal("")),

    // Training Information (all optional)
    teachingExperience: z.number().optional(),
    teachingStyle: z.string().optional(),
    certifications: z
      .array(
        z.object({
          name: z.string().optional(),
          issuer: z.string().optional(),
          date: z.string().optional(),
        })
      )
      .optional(),
    education: z
      .array(
        z.object({
          institution: z.string().optional(),
          degree: z.string().optional(),
          graduationYear: z.number().optional(),
        })
      )
      .optional(),
    socialMedia: z
      .object({
        linkedin: z
          .string()
          .url("Please enter a valid LinkedIn URL")
          .optional()
          .or(z.literal("")),
        twitter: z
          .string()
          .url("Please enter a valid Twitter URL")
          .optional()
          .or(z.literal("")),
        youtube: z
          .string()
          .url("Please enter a valid YouTube URL")
          .optional()
          .or(z.literal("")),
      })
      .optional(),

    // Availability and Rates (all optional)
    isAvailableForTraining: z.boolean().optional(),
    hourlyRate: z.number().optional(),
    currency: z.string().optional(),
    preferredTrainingTypes: z.array(z.string()).optional(),

    // Password Update (optional - if provided, all three fields required)
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // If any password field is provided, all three must be provided
      const passwordFields = [
        data.currentPassword,
        data.newPassword,
        data.confirmPassword,
      ];
      const hasPasswordFields = passwordFields.some(
        (field) => field && field.trim() !== ""
      );

      if (hasPasswordFields) {
        return passwordFields.every((field) => field && field.trim() !== "");
      }
      return true;
    },
    {
      message: "If updating password, all password fields are required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      // If password fields are provided, newPassword and confirmPassword must match
      if (data.newPassword && data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "New password and confirm password must match",
      path: ["confirmPassword"],
    }
  );

const EditTrainerForm = ({ trainer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
    location: "",

    // Professional Information
    bio: "",
    specialization: "",
    experience: "",
    skills: [],
    languages: [],
    linkedinProfile: "",
    portfolio: "",
    website: "",

    // Training Information
    teachingExperience: "",
    teachingStyle: "",
    certifications: [
      {
        name: "",
        issuer: "",
        date: "",
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        graduationYear: "",
      },
    ],
    socialMedia: {
      linkedin: "",
      twitter: "",
      youtube: "",
    },

    // Availability and Rates
    isAvailableForTraining: true,
    hourlyRate: "",
    currency: "USD",
    preferredTrainingTypes: [],

    // Password Update
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form with trainer data
  useEffect(() => {
    if (trainer) {
      setFormData({
        // Personal Information
        firstName: trainer.firstName || "",
        lastName: trainer.lastName || "",
        email: trainer.email || "",
        phoneNumber: trainer.phoneNumber || trainer.phone || "",
        profileImage: trainer.profileImage || trainer.profilePicture || "",
        location: trainer.location || "",

        // Professional Information
        bio: trainer.bio || "",
        specialization: trainer.specialization || "",
        experience: trainer.experience || "",
        skills: trainer.skills || [],
        languages: trainer.languages || [],
        linkedinProfile: trainer.linkedinProfile || trainer.linkedin || "",
        portfolio: trainer.portfolio || "",
        website: trainer.website || "",

        // Training Information
        teachingExperience: trainer.teachingExperience || "",
        teachingStyle: trainer.teachingStyle || "",
        certifications: trainer.certifications || [
          {
            name: "",
            issuer: "",
            date: "",
          },
        ],
        education: trainer.education || [
          {
            institution: "",
            degree: "",
            graduationYear: "",
          },
        ],
        socialMedia: trainer.socialMedia || {
          linkedin: "",
          twitter: "",
          youtube: "",
        },

        // Availability and Rates
        isAvailableForTraining:
          trainer.isAvailableForTraining !== undefined
            ? trainer.isAvailableForTraining
            : true,
        hourlyRate: trainer.hourlyRate || "",
        currency: trainer.currency || "USD",
        preferredTrainingTypes: trainer.preferredTrainingTypes || [],

        // Password Update
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [trainer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Transform form data to match API structure
      const payload = {
        // Personal Information
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        email: formData.email || undefined,
        phoneNumber: formData.phoneNumber || undefined,
        profileImage: formData.profileImage || undefined,
        location: formData.location || undefined,

        // Professional Information
        bio: formData.bio || undefined,
        specialization: formData.specialization || undefined,
        experience: formData.experience
          ? parseInt(formData.experience)
          : undefined,
        skills: formData.skills.length > 0 ? formData.skills : undefined,
        languages:
          formData.languages.length > 0 ? formData.languages : undefined,
        linkedinProfile: formData.linkedinProfile || undefined,
        portfolio: formData.portfolio || undefined,
        website: formData.website || undefined,

        // Training Information
        teachingExperience: formData.teachingExperience
          ? parseInt(formData.teachingExperience)
          : undefined,
        teachingStyle: formData.teachingStyle || undefined,
        certifications:
          formData.certifications.filter(
            (cert) => cert.name || cert.issuer || cert.date
          ).length > 0
            ? formData.certifications.filter(
                (cert) => cert.name || cert.issuer || cert.date
              )
            : undefined,
        education:
          formData.education.filter(
            (edu) => edu.institution || edu.degree || edu.graduationYear
          ).length > 0
            ? formData.education
                .filter(
                  (edu) => edu.institution || edu.degree || edu.graduationYear
                )
                .map((edu) => ({
                  institution: edu.institution || undefined,
                  degree: edu.degree || undefined,
                  graduationYear: edu.graduationYear
                    ? parseInt(edu.graduationYear)
                    : undefined,
                }))
            : undefined,
        socialMedia: {
          linkedin: formData.socialMedia.linkedin || undefined,
          twitter: formData.socialMedia.twitter || undefined,
          youtube: formData.socialMedia.youtube || undefined,
        },

        // Availability and Rates
        isAvailableForTraining: formData.isAvailableForTraining,
        hourlyRate: formData.hourlyRate
          ? parseFloat(formData.hourlyRate)
          : undefined,
        currency: formData.currency || undefined,
        preferredTrainingTypes:
          formData.preferredTrainingTypes.length > 0
            ? formData.preferredTrainingTypes
            : undefined,

        // Password Update (only include if provided)
        ...(formData.currentPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }),
      };

      // Remove undefined values
      Object.keys(payload).forEach((key) => {
        if (payload[key] === undefined) {
          delete payload[key];
        }
      });

      // Remove empty socialMedia object
      if (
        payload.socialMedia &&
        !payload.socialMedia.linkedin &&
        !payload.socialMedia.twitter &&
        !payload.socialMedia.youtube
      ) {
        delete payload.socialMedia;
      }

      const isValid = validateFormData(editTrainerSchema, payload);
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      // Call the save function passed from parent
      if (onSave) {
        await onSave(payload);
      }

      toast.success("Trainer updated successfully!");
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error updating trainer:", error);
      toast.error("Failed to update trainer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Trainer</h2>
          <p className="text-gray-600 mt-1">Update trainer information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="profileImage">Profile Image URL</Label>
                <Input
                  id="profileImage"
                  value={formData.profileImage}
                  onChange={(e) =>
                    setFormData({ ...formData, profileImage: e.target.value })
                  }
                  placeholder="Enter profile image URL"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter location"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">
              Professional Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Enter your bio"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    placeholder="Enter specialization"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    placeholder="Enter years of experience"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                  <Input
                    id="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        linkedinProfile: e.target.value,
                      })
                    }
                    placeholder="Enter LinkedIn profile URL"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio</Label>
                  <Input
                    id="portfolio"
                    value={formData.portfolio}
                    onChange={(e) =>
                      setFormData({ ...formData, portfolio: e.target.value })
                    }
                    placeholder="Enter portfolio URL"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    placeholder="Enter website URL"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  value={formData.skills.join(", ")}
                  onChange={(e) => {
                    const skillsArray = e.target.value
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter((skill) => skill);
                    setFormData({ ...formData, skills: skillsArray });
                  }}
                  placeholder="Enter skills separated by commas"
                />
              </div>
              <div>
                <Label htmlFor="languages">Languages (comma-separated)</Label>
                <Input
                  id="languages"
                  value={formData.languages.join(", ")}
                  onChange={(e) => {
                    const languagesArray = e.target.value
                      .split(",")
                      .map((lang) => lang.trim())
                      .filter((lang) => lang);
                    setFormData({ ...formData, languages: languagesArray });
                  }}
                  placeholder="Enter languages separated by commas"
                />
              </div>
            </div>
          </div>

          {/* Training Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Training Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teachingExperience">
                    Teaching Experience (years)
                  </Label>
                  <Input
                    id="teachingExperience"
                    type="number"
                    value={formData.teachingExperience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teachingExperience: e.target.value,
                      })
                    }
                    placeholder="Enter teaching experience"
                  />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      setFormData({ ...formData, hourlyRate: e.target.value })
                    }
                    placeholder="Enter hourly rate"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) =>
                      setFormData({ ...formData, currency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isAvailableForTraining"
                    checked={formData.isAvailableForTraining}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        isAvailableForTraining: checked,
                      })
                    }
                  />
                  <Label htmlFor="isAvailableForTraining">
                    Available for Training
                  </Label>
                </div>
              </div>
              <div>
                <Label htmlFor="teachingStyle">Teaching Style</Label>
                <Textarea
                  id="teachingStyle"
                  value={formData.teachingStyle}
                  onChange={(e) =>
                    setFormData({ ...formData, teachingStyle: e.target.value })
                  }
                  placeholder="Describe your teaching style"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="preferredTrainingTypes">
                  Preferred Training Types (comma-separated)
                </Label>
                <Input
                  id="preferredTrainingTypes"
                  value={formData.preferredTrainingTypes.join(", ")}
                  onChange={(e) => {
                    const typesArray = e.target.value
                      .split(",")
                      .map((type) => type.trim())
                      .filter((type) => type);
                    setFormData({
                      ...formData,
                      preferredTrainingTypes: typesArray,
                    });
                  }}
                  placeholder="e.g., online, workshop, bootcamp"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Social Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialMedia: {
                        ...formData.socialMedia,
                        linkedin: e.target.value,
                      },
                    })
                  }
                  placeholder="LinkedIn URL"
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={formData.socialMedia.twitter}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialMedia: {
                        ...formData.socialMedia,
                        twitter: e.target.value,
                      },
                    })
                  }
                  placeholder="Twitter URL"
                />
              </div>
              <div>
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={formData.socialMedia.youtube}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialMedia: {
                        ...formData.socialMedia,
                        youtube: e.target.value,
                      },
                    })
                  }
                  placeholder="YouTube URL"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            <div className="space-y-4">
              {formData.education.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  {index > 0 && (
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Education {index + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newEducation = [...formData.education];
                          newEducation.splice(index, 1);
                          setFormData({ ...formData, education: newEducation });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`education-${index}-institution`}>
                        Institution
                      </Label>
                      <Input
                        id={`education-${index}-institution`}
                        value={item.institution}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].institution = e.target.value;
                          setFormData({ ...formData, education: newEducation });
                        }}
                        placeholder="Enter institution name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`education-${index}-degree`}>
                        Degree
                      </Label>
                      <Input
                        id={`education-${index}-degree`}
                        value={item.degree}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].degree = e.target.value;
                          setFormData({ ...formData, education: newEducation });
                        }}
                        placeholder="Enter degree"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`education-${index}-graduationYear`}>
                        Graduation Year
                      </Label>
                      <Input
                        id={`education-${index}-graduationYear`}
                        type="number"
                        value={item.graduationYear}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].graduationYear = e.target.value;
                          setFormData({ ...formData, education: newEducation });
                        }}
                        placeholder="Enter graduation year"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    ...formData,
                    education: [
                      ...formData.education,
                      {
                        institution: "",
                        degree: "",
                        graduationYear: "",
                      },
                    ],
                  });
                }}
              >
                Add Education
              </Button>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            <div className="space-y-4">
              {formData.certifications.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  {index > 0 && (
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Certificate {index + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newCertifications = [
                            ...formData.certifications,
                          ];
                          newCertifications.splice(index, 1);
                          setFormData({
                            ...formData,
                            certifications: newCertifications,
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`cert-${index}-name`}>
                        Certificate Name
                      </Label>
                      <Input
                        id={`cert-${index}-name`}
                        value={item.name}
                        onChange={(e) => {
                          const newCertifications = [
                            ...formData.certifications,
                          ];
                          newCertifications[index].name = e.target.value;
                          setFormData({
                            ...formData,
                            certifications: newCertifications,
                          });
                        }}
                        placeholder="Enter certificate name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`cert-${index}-issuer`}>Issuer</Label>
                      <Input
                        id={`cert-${index}-issuer`}
                        value={item.issuer}
                        onChange={(e) => {
                          const newCertifications = [
                            ...formData.certifications,
                          ];
                          newCertifications[index].issuer = e.target.value;
                          setFormData({
                            ...formData,
                            certifications: newCertifications,
                          });
                        }}
                        placeholder="Enter issuer name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`cert-${index}-date`}>Date</Label>
                      <Input
                        id={`cert-${index}-date`}
                        type="date"
                        value={item.date}
                        onChange={(e) => {
                          const newCertifications = [
                            ...formData.certifications,
                          ];
                          newCertifications[index].date = e.target.value;
                          setFormData({
                            ...formData,
                            certifications: newCertifications,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    ...formData,
                    certifications: [
                      ...formData.certifications,
                      {
                        name: "",
                        issuer: "",
                        date: "",
                      },
                    ],
                  });
                }}
              >
                Add Certificate
              </Button>
            </div>
          </div>

          {/* Password Update */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">
              Password Update (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pb-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrainerForm;
