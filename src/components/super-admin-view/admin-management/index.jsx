import React, { useState } from "react";
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
import { mockAdmins } from "./mockData";
import SearchComponent from "@/components/common/searchComponent";

const SuperAdminAdminManagement = () => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [admins, setAdmins] = useState(mockAdmins);

  const handleCreateAdmin = () => {
    setSelectedAdmin(null);
    setIsEditDrawerOpen(true);
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setIsEditDrawerOpen(true);
  };

  const handleDelete = (adminId) => {
    // Delete functionality to be implemented later
    console.log("Delete admin with ID:", adminId);
    // For now, just show confirmation
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins(admins.filter((admin) => admin.id !== adminId));
    }
  };

  const handleSaveAdmin = (adminData) => {
    if (selectedAdmin) {
      // Update existing admin
      setAdmins(
        admins.map((admin) =>
          admin.id === selectedAdmin.id
            ? {
                ...admin,
                owner: { ...admin.owner, name: adminData.name },
                email: adminData.email,
                phone: adminData.phone,
                features: adminData.features,
              }
            : admin
        )
      );
    } else {
      // Create new admin
      const newAdmin = {
        id: Math.max(...admins.map((a) => a.id)) + 1,
        owner: {
          name: adminData.name,
          image: "/public/person.png",
        },
        email: adminData.email,
        phone: adminData.phone,
        features: adminData.features,
      };
      setAdmins([...admins, newAdmin]);
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
              {admins.map((admin) => (
                <AdminTableRow
                  key={admin.id}
                  admin={admin}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditAdminDrawer
        open={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        admin={selectedAdmin}
        onSave={handleSaveAdmin}
      />
    </div>
  );
};

export default SuperAdminAdminManagement;
