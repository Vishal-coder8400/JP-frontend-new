import { useEffect, useState } from "react";
import { generateMasterDataTabs } from "./utils";
import useMasterDataTabStore from "./zustand";
import DynamicDropdownTab from "./tabs/DynamicDropdownTab";
import { useGetDropdowns } from "../../../hooks/super-admin/useDropdowns";
import AddDropdownModal from "./tabs/AddDropdownModal";
import EditDropdownModal from "./tabs/EditDropdownModal";
import { Button } from "../../ui/button";
import { PencilIcon } from "lucide-react";

const SuperAdminMasterData = () => {
  const { activeTab, setActiveTab, initializeFirstTab } =
    useMasterDataTabStore();
  const { data: dropdownsData, isLoading, error } = useGetDropdowns();
  const [isAddDropdownModalOpen, setIsAddDropdownModalOpen] = useState(false);
  const [isEditDropdownModalOpen, setIsEditDropdownModalOpen] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState(null);

  const masterDataTabs = generateMasterDataTabs(dropdownsData);

  // Initialize first tab when data is loaded
  useEffect(() => {
    if (masterDataTabs.length > 0 && !activeTab) {
      initializeFirstTab(masterDataTabs[0].id);
    }
  }, [masterDataTabs, activeTab, initializeFirstTab]);

  const handleEditDropdown = (dropdown) => {
    setSelectedDropdown(dropdown);
    setIsEditDropdownModalOpen(true);
  };

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-purple"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-medium">
            Error loading dropdown data
          </h3>
          <p className="text-red-600 mt-1">{error.message}</p>
        </div>
      );
    }

    if (!dropdownsData?.data?.dropdowns?.length) {
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-gray-800 font-medium">No dropdowns found</h3>
          <p className="text-gray-600 mt-1">
            No dropdown data available at the moment.
          </p>
        </div>
      );
    }

    const activeDropdown = dropdownsData.data.dropdowns.find(
      (dropdown) => dropdown.dropdownId === activeTab
    );

    if (!activeDropdown) {
      // Set first tab as active if current activeTab is not found
      const firstTab = masterDataTabs[0];
      if (firstTab) {
        setActiveTab(firstTab.id);
        return null;
      }
      return <div>No tabs available</div>;
    }

    return <DynamicDropdownTab dropdown={activeDropdown} />;
  };

  return (
    <div className="w-full space-y-6 min-w-0">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between min-w-0">
        <div className="flex p-1 min-w-0 overflow-x-auto flex-1 lg:max-w-3xl">
          {masterDataTabs.map((tab) => {
            const dropdown = dropdownsData?.data?.dropdowns?.find(
              (d) => d.dropdownId === tab.id
            );
            return (
              <div
                key={tab.id}
                className={`flex items-center px-4 py-2 transition-colors font-medium border-b-[1px] cursor-pointer whitespace-nowrap group ${
                  activeTab === tab.id
                    ? "border-b-primary-purple text-primary-purple"
                    : "text-gray1 border-b-gray1"
                }`}
              >
                <div
                  className="flex items-center"
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon && <span className="mr-2">{tab.icon}</span>}
                  <span className="">{tab.name}</span>
                </div>
                {dropdown && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditDropdown(dropdown);
                    }}
                    className="ml-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded-md"
                  >
                    <PencilIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end items-center space-x-4 ml-4">
          <Button
            onClick={() => setIsAddDropdownModalOpen(true)}
            className="bg-primary-purple hover:bg-primary-purple/90 text-white cursor-pointer"
          >
            Add Dropdown
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-w-0">{renderTabContent()}</div>

      {/* Add Dropdown Modal */}
      <AddDropdownModal
        isOpen={isAddDropdownModalOpen}
        onClose={() => setIsAddDropdownModalOpen(false)}
      />

      {/* Edit Dropdown Modal */}
      <EditDropdownModal
        isOpen={isEditDropdownModalOpen}
        onClose={() => setIsEditDropdownModalOpen(false)}
        dropdown={selectedDropdown}
      />
    </div>
  );
};

export default SuperAdminMasterData;
