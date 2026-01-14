import { useState, useMemo } from "react";
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
import ErrorDisplay from "@/components/common/ErrorDisplay";
import { useDebounce } from "@/hooks/common/useDebounce";

const SuperAdminAdminManagement = () => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebounce(searchText, 500);

  const { data: adminsResponse, isLoading, error } = useGetAllAdmins();
  const deleteAdminMutation = useDeleteAdmin();

  const allAdmins = adminsResponse?.data?.admins || [];

  const admins = useMemo(() => {
    if (!debouncedSearch) return allAdmins;

    const searchLower = debouncedSearch.toLowerCase();
    return allAdmins.filter((admin) => {
      const firstName = admin.firstName?.toLowerCase() || "";
      const lastName = admin.lastName?.toLowerCase() || "";
      const fullName = `${firstName} ${lastName}`;
      const email = admin.email?.toLowerCase() || "";
      const phone = admin.phoneNumber?.toLowerCase() || "";

      return (
        firstName.includes(searchLower) ||
        lastName.includes(searchLower) ||
        fullName.includes(searchLower) ||
        email.includes(searchLower) ||
        phone.includes(searchLower)
      );
    });
  }, [allAdmins, debouncedSearch]);

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
    <div className="w-full space-y-6 flex-1">
      {/* Header */}
      <div className="flex justify-between items-center border-b py-4 border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin Management</h1>
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

      {/* Search */}
      <div>
        {error ? (
          <ErrorDisplay error={error} title="Error loading admins" />
        ) : (
          <SearchComponent
            value={searchText}
            handleSearch={setSearchText}
            placeholder={"Search by name, email, phone"}
          />
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
        {!error && (
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
              ) : admins.length === 0 ? (
                <TableRow>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    {debouncedSearch
                      ? `No admins found matching "${debouncedSearch}"`
                      : "No admins found"}
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
        )}
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
