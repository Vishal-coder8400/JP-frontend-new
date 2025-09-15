import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

const AdminTableRow = ({ admin, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{admin.id}</TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <img
            src={admin.owner.image}
            alt={admin.owner.name}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              e.target.src = "/public/person.png";
            }}
          />
          <span className="font-medium text-gray-900">{admin.owner.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-gray-600">{admin.email}</TableCell>
      <TableCell className="text-gray-600">{admin.phone}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {admin.features.map((feature, index) => (
            <span key={index} className="">
              {feature} {index < admin.features.length - 1 ? "," : ""}
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
            onClick={() => onDelete(admin.id)}
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
