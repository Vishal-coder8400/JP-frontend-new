import { Edit, Trash2, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

const AdminTableRow = ({ admin, onEdit, onDelete }) => {
  const fullName = `${admin.firstName} ${admin.lastName}`;

  return (
    <TableRow>
      <TableCell className="font-medium">{admin._id}</TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          {admin.profileImage ? (
            <img
              src={admin.profileImage}
              alt={fullName}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.target.src = "/public/person.png";
              }}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <span className="font-medium text-gray-900">{fullName}</span>
        </div>
      </TableCell>
      <TableCell className="text-gray-600">{admin.email}</TableCell>
      <TableCell className="text-gray-600">{admin.phoneNumber}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {admin.allowedFeatures.map((feature, index) => (
            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {feature
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              {index < admin.allowedFeatures.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(admin)}
            className="h-8 w-8"
            title="Edit Admin"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(admin._id)}
            className="h-8 w-8 text-red-600 hover:text-red-700 hover:border-red-300"
            title="Delete Admin"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AdminTableRow;
