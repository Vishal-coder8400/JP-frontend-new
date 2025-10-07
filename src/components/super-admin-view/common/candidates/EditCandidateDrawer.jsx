import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditCandidateForm from "./EditCandidateForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCandidate as updateCandidateApi } from "@/api/super-admin/database";
import { toast } from "sonner";

const EditCandidateDrawer = ({ isOpen, onClose, candidate }) => {
  const queryClient = useQueryClient();

  const { mutate: updateCandidate, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateCandidateApi({ id, data }),
    onSuccess: (data, variables) => {
      toast.success("Candidate updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-applicant", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["superAdmin-applicants"] });
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-candidate-details"],
      });
      onClose();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update candidate"
      );
    },
  });

  const handleSave = async (formData) => {
    const source = candidate?.data || candidate;
    const id =
      source?._id ||
      source?.id ||
      source?.jobseekerId ||
      source?.userId ||
      source?.candidateId;

    if (!id) {
      toast.error("Candidate id not found for update");
      return;
    }

    const payload = {};

    // Personal Information
    if (formData?.name) payload.name = formData.name;
    if (formData?.phone) {
      const primary =
        typeof formData.phone === "string"
          ? formData.phone
          : [formData.phone.countryCode, formData.phone.number]
              .filter(Boolean)
              .join(" ");
      payload.phone = {};
      if (primary) payload.phone.primary = primary;
      if (formData?.secondaryPhone)
        payload.phone.secondary = formData.secondaryPhone;
      if (Object.keys(payload.phone).length === 0) delete payload.phone;
    }
    if (formData?.bio || formData?.about)
      payload.about = formData.bio || formData.about;
    if (formData?.profilePicture)
      payload.profilePicture = formData.profilePicture;
    if (formData?.birthDate || formData?.dob)
      payload.dob = formData.birthDate || formData.dob;
    if (
      formData?.currentAddress?.address ||
      formData?.currentAddress?.city ||
      formData?.currentAddress?.state ||
      formData?.currentAddress?.pincode ||
      formData?.currentAddress?.country
    ) {
      payload.address = {};
      if (formData.currentAddress.address)
        payload.address.street = formData.currentAddress.address;
      if (formData.currentAddress.city)
        payload.address.city = formData.currentAddress.city;
      if (formData.currentAddress.state)
        payload.address.state = formData.currentAddress.state;
      if (formData.currentAddress.pincode)
        payload.address.zipCode = formData.currentAddress.pincode;
      if (formData.currentAddress.country)
        payload.address.country = formData.currentAddress.country;
    }

    // Professional Information
    if (Array.isArray(formData.skillSet) && formData.skillSet.length > 0)
      payload.skills = formData.skillSet;
    if (Array.isArray(formData.skills) && formData.skills.length > 0)
      payload.skills = formData.skills;

    if (Array.isArray(formData.experience) && formData.experience.length > 0) {
      payload.experience = formData.experience.map((e) => ({
        company: e.company,
        position: e.position,
        startDate: e.startDate,
        endDate: e.endDate,
        description: e.description,
      }));
    } else if (
      formData?.position ||
      formData?.startingYear ||
      formData?.endingYear
    ) {
      payload.experience = [
        {
          company: formData?.company,
          position: formData?.position,
          startDate: formData?.startingYear,
          endDate: formData?.endingYear,
          description: formData?.experienceDescription,
        },
      ];
    }

    if (Array.isArray(formData.education) && formData.education.length > 0) {
      payload.education = formData.education.map((e) => ({
        institution: e.institution,
        degree: e.degree,
        graduationYear: e.graduationYear || e.endDate,
      }));
    }

    if (
      Array.isArray(formData.certifications) &&
      formData.certifications.length > 0
    ) {
      payload.certifications = formData.certifications.map((c) => ({
        name: c.title || c.name,
        issuer: c.organisation || c.issuer,
        date: c.issueDate || c.date,
      }));
    }

    // Professional Documents
    if (formData?.resume) payload.resume = formData.resume;
    if (formData?.linkedinProfile)
      payload.linkedinProfile = formData.linkedinProfile;
    if (formData?.portfolio) payload.portfolio = formData.portfolio;

    // Job Preferences
    if (Array.isArray(formData.preferredJobTypes))
      payload.preferredJobTypes = formData.preferredJobTypes;
    if (Array.isArray(formData.location) && formData.location.length > 0)
      payload.preferredLocations = formData.location;
    if (Array.isArray(formData.preferredLocations))
      payload.preferredLocations = formData.preferredLocations;
    if (formData?.expectedSalary !== undefined)
      payload.expectedSalary = formData.expectedSalary;
    if (formData?.salaryCurrency)
      payload.salaryCurrency = formData.salaryCurrency;
    if (formData?.availabilityDate)
      payload.availabilityDate = formData.availabilityDate;
    if (formData?.noticePeriod !== undefined)
      payload.noticePeriod = formData.noticePeriod;
    if (typeof formData?.isAvailableForWork === "boolean")
      payload.isAvailableForWork = formData.isAvailableForWork;

    // Password Update (all-or-none)
    if (
      formData?.currentPassword &&
      formData?.newPassword &&
      formData?.confirmPassword
    ) {
      payload.currentPassword = formData.currentPassword;
      payload.newPassword = formData.newPassword;
      payload.confirmPassword = formData.confirmPassword;
    }

    await updateCandidate({ id, data: payload });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full h-screen lg:max-w-[1000px] md:max-w-full sm:max-w-full overflow-hidden border-transparent [&>button.absolute]:hidden"
      >
        <div className="w-full h-full overflow-y-auto">
          {candidate && (
            <EditCandidateForm
              candidate={candidate?.data || candidate}
              onSave={handleSave}
              onClose={onClose}
              isPending={isPending}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditCandidateDrawer;
