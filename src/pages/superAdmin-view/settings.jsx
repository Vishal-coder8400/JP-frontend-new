import React, { useState } from "react";
import {
  useGetSectoralOptions,
  useDeleteSectoralOption,
} from "../../hooks/superAdmin/useSectoralOption";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import {
  Search,
  Settings,
  Trash2,
  Plus,
  Database,
  Users,
  Mail,
} from "lucide-react";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { data: sectoralOptions } = useGetSectoralOptions();
  const { mutate: deleteSectoralOption } = useDeleteSectoralOption();

  const tabs = [
    {
      id: "general",
      name: "General Settings",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: "database",
      name: "Database Config",
      icon: <Database className="w-4 h-4" />,
    },
    { id: "users", name: "User Settings", icon: <Users className="w-4 h-4" /> },
    { id: "email", name: "Email Config", icon: <Mail className="w-4 h-4" /> },
  ];

  const handleDeleteSectoralOption = (optionId) => {
    if (
      window.confirm("Are you sure you want to delete this sectoral option?")
    ) {
      deleteSectoralOption(optionId);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          System Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Name
            </label>
            <Input defaultValue="GHRIG Job Portal" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Version
            </label>
            <Input defaultValue="v1.0.0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Upload Size (MB)
            </label>
            <Input type="number" defaultValue="10" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <Input type="number" defaultValue="30" />
          </div>
        </div>
        <Button className="mt-6 bg-[#6945ED] hover:bg-[#5A3BC7]">
          Save Settings
        </Button>
      </div>

      {/* Sectoral Options Management */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Sectoral Options
          </h3>
          <Button className="bg-[#6945ED] hover:bg-[#5A3BC7]">
            <Plus className="w-4 h-4 mr-2" />
            Add Sectoral Option
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Option Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sectoralOptions?.data?.options?.map((option) => (
              <TableRow key={option.id}>
                <TableCell className="font-medium">{option.name}</TableCell>
                <TableCell>{option.category}</TableCell>
                <TableCell>
                  <Badge variant={option.isActive ? "default" : "secondary"}>
                    {option.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Sectoral Option</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete "{option.name}"?
                            This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleDeleteSectoralOption(option.id)
                            }
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderDatabaseConfig = () => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Database Configuration
      </h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Database Host
            </label>
            <Input defaultValue="localhost" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Database Port
            </label>
            <Input defaultValue="5432" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Database Name
            </label>
            <Input defaultValue="job_portal" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Connection Pool Size
            </label>
            <Input type="number" defaultValue="20" />
          </div>
        </div>
        <div className="flex space-x-4">
          <Button className="bg-[#6945ED] hover:bg-[#5A3BC7]">
            Test Connection
          </Button>
          <Button variant="outline">Backup Database</Button>
          <Button variant="outline">View Logs</Button>
        </div>
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        User Management Settings
      </h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Minimum Length
            </label>
            <Input type="number" defaultValue="8" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Lock Attempts
            </label>
            <Input type="number" defaultValue="5" />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="requireEmailVerification"
              defaultChecked
            />
            <label
              htmlFor="requireEmailVerification"
              className="text-sm text-gray-700"
            >
              Require email verification for new accounts
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="enableTwoFactor" />
            <label htmlFor="enableTwoFactor" className="text-sm text-gray-700">
              Enable two-factor authentication
            </label>
          </div>
        </div>
        <Button className="bg-[#6945ED] hover:bg-[#5A3BC7]">
          Update User Settings
        </Button>
      </div>
    </div>
  );

  const renderEmailConfig = () => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Email Configuration
      </h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Host
            </label>
            <Input defaultValue="smtp.gmail.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Port
            </label>
            <Input defaultValue="587" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Email
            </label>
            <Input defaultValue="noreply@ghrig.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Name
            </label>
            <Input defaultValue="GHRIG Job Portal" />
          </div>
        </div>
        <div className="flex space-x-4">
          <Button className="bg-[#6945ED] hover:bg-[#5A3BC7]">
            Test Email Configuration
          </Button>
          <Button variant="outline">Send Test Email</Button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "database":
        return renderDatabaseConfig();
      case "users":
        return renderUserSettings();
      case "email":
        return renderEmailConfig();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600 mt-1">
          Configure system-wide settings and parameters
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex space-x-1 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#6945ED] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default SystemSettings;
