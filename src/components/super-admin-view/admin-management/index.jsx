import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditAdminDrawer from "./EditAdminDrawer";
import AdminTableRow from "./AdminTableRow";
import SearchComponent from "@/components/common/searchComponent";
import {
  useGetAllAdmins,
  useDeleteAdmin,
} from "@/hooks/super-admin/useAdminManagement";

const SuperAdminAdminManagement = () => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // API hooks
  const { data: adminsResponse, isLoading, error } = useGetAllAdmins();
  const deleteAdminMutation = useDeleteAdmin();

  const admins = adminsResponse?.data?.data?.admins || [];

  const handleCreateAdmin = () => {
    setSelectedAdmin(null);
    setIsEditDrawerOpen(true);
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setIsEditDrawerOpen(true);
  };

  const handleDelete = (adminId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      deleteAdminMutation.mutate(adminId);
    }
  };

  return (
    <div className="p-6 border-1 border-gray2 rounded-xl">
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray2">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Candidates Management
          </h1>
        </div>
        <Button
          className="flex items-center gap-2"
          variant={"black"}
          onClick={handleCreateAdmin}
        >
          <Plus className="h-4 w-4" />
          Create Admin
        </Button>
      </div>

      <div className="space-y-4">
        <SearchComponent />

        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead className="min-w-[200px]">Owner</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Features</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <td colSpan={6} className="text-center py-8">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      <span className="ml-2">Loading admins...</span>
                    </div>
                  </td>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <td colSpan={6} className="text-center py-8 text-red-500">
                    Error loading admins: {error.message}
                  </td>
                </TableRow>
              ) : admins.length === 0 ? (
                <TableRow>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No admins found
                  </td>
                </TableRow>
              ) : (
                admins.map((admin) => (
                  <AdminTableRow
                    key={admin.id}
                    admin={admin}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditAdminDrawer
        open={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        admin={selectedAdmin}
      />
    </div>
  );
};

export default SuperAdminAdminManagement;
