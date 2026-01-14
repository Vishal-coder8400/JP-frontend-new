import { useState } from "react";
import { useGetDropdownValues } from "../../../../hooks/super-admin/useDropdowns";
import { Button } from "../../../ui/button";
import AddValueModal from "./AddValueModal";
import EditValueModal from "./EditValueModal";
import DeleteValueModal from "./DeleteValueModal";
import { PencilIcon, Trash2Icon } from "lucide-react";
import ErrorDisplay from "@/components/common/ErrorDisplay";

const DynamicDropdownTab = ({ dropdown }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

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
      <div className="mt-6 w-full">
        {valuesLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-purple"></div>
          </div>
        ) : valuesError ? (
          <ErrorDisplay error={valuesError} title="Error loading values" />
        ) : valuesData?.data?.values ? (
          <div className="space-y-4 w-full">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full">
              <table className="w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {valuesData.data.values.map((value, index) => (
                    <tr
                      key={value._id || index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap w-1/3">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {value.value}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 w-1/3">
                        <span className="text-sm text-gray-600">
                          {value.description || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-1/3">
                        <div className="flex space-x-6">
                          <PencilIcon
                            className="size-4 cursor-pointer"
                            onClick={() => {
                              setSelectedValue(value);
                              setIsEditModalOpen(true);
                            }}
                          />

                          <Trash2Icon
                            className="size-4 text-danger1 cursor-pointer"
                            onClick={() => {
                              setSelectedValue(value);
                              setIsDeleteModalOpen(true);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setIsAddModalOpen(true)}
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
                onClick={() => setIsAddModalOpen(true)}
                className="bg-primary-purple hover:bg-primary-purple/90 text-white cursor-pointer"
              >
                Add Value
              </Button>
            </div>
          </div>
        )}
      </div>
      <AddValueModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
        }}
        dropdownId={dropdown?.dropdownId}
      />
      <EditValueModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedValue(null);
        }}
        dropdownId={dropdown?.dropdownId}
        value={selectedValue}
      />
      <DeleteValueModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedValue(null);
        }}
        dropdownId={dropdown?.dropdownId}
        value={selectedValue}
      />
    </div>
  );
};

export default DynamicDropdownTab;
