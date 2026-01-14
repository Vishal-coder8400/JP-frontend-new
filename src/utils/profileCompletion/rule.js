export const profileCompletionRules = {
  recruiter: {
    page1: (user) => !!user?.name,
    page2: (user) => !!user?.kycDetails?.panDetails?.number,
    page3: (user) =>
      Array.isArray(user?.sectorSpecialization) &&
      user.sectorSpecialization.length > 0,
    page4: (user) => !!user?.fatherName,
  },
  corporate: {
    page1: (user) => !!user?.basicInformation?.companyName,
    page2: (user) => !!user?.bankDetails,
  },
  superAdmin: {
    page1: (user) => !!user?.name && !!user?.email && !!user?.phone,
  },
};
export const calculateProfileCompletionPercentage = (completionObject) => {
  const total = Object.keys(completionObject).length;
  const completed = Object.values(completionObject).filter(Boolean).length;
  return Math.round((completed / total) * 100);
};
