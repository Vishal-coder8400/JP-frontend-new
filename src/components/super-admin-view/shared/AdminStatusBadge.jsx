import { Badge } from "@/components/ui/badge";

const AdminStatusBadge = ({ status }) => {
  return (
    <Badge
      className={`${
        status === "approved"
          ? "bg-success2 text-success1"
          : status === "rejected"
          ? "bg-danger2 text-danger1"
          : status === "hold"
          ? "bg-orange-100 text-orange-800"
          : "bg-warning2 text-warning1"
      } text-sm`}
    >
      {status}
    </Badge>
  );
};

export default AdminStatusBadge;
