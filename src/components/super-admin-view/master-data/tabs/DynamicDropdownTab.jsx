import { useState } from "react";
import { useGetDropdownValues } from "../../../../hooks/super-admin/useDropdowns";
import { Button } from "../../../ui/button";
import AddValueModal from "./AddValueModal";

const DynamicDropdownTab = ({ dropdown }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: valuesData,
    isLoading: valuesLoading,
    error: valuesError,
  } = useGetDropdownValues(dropdown?.dropdownId);

  if (!dropdown) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-600">No dropdown data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mt-6">
        {valuesLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-purple"></div>
          </div>
        ) : valuesError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-red-800 font-medium">Error loading values</h4>
            <p className="text-red-600 text-sm mt-1">{valuesError.message}</p>
          </div>
        ) : valuesData?.data?.values ? (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {valuesData.data.values.map((value, index) => (
                    <tr
                      key={value._id || index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {value.value}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {value.description || "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary-purple hover:bg-primary-purple/90 text-white cursor-pointer"
              >
                Add Value
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-600 text-center">
                No values found for this dropdown.
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary-purple hover:bg-primary-purple/90 text-white cursor-pointer"
              >
                Add Value
              </Button>
            </div>
          </div>
        )}
      </div>
      <AddValueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dropdownId={dropdown?.dropdownId}
      />
    </div>
  );
};

export default DynamicDropdownTab;
