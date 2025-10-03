export const generateMasterDataTabs = (dropdownsData) => {
  if (!dropdownsData?.data?.dropdowns) {
    return [];
  }

  return dropdownsData.data.dropdowns.map((dropdown) => ({
    id: dropdown.dropdownId,
    name: dropdown.name,
    icon: null,
    description: dropdown.description,
    category: dropdown.category,
    activeValuesCount: dropdown.activeValuesCount,
    totalValuesCount: dropdown.totalValuesCount,
    isActive: dropdown.isActive,
    version: dropdown.version,
  }));
};
