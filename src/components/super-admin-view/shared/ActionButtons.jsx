import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SquarePenIcon } from "lucide-react";

const ActionButtons = ({
  context,
  onEdit,
  onApprove,
  onReject,
  onHold,
  isLoading = false,
  entityName = "Item",
  editButtonVariant = "outline",
  editButtonSize = "sm",
  showApprovalButtons = true,
  layout = "horizontal",
  className = "",
  approvalStatus,
}) => {
  const isApprovalsContext =
    (context === "approvals" || context === "approval") && showApprovalButtons;
  const normalizedStatus =
    typeof approvalStatus === "string"
      ? approvalStatus.trim().toLowerCase()
      : undefined;
  const isApproved = isApprovalsContext && normalizedStatus === "approved";

  const layoutClass = layout === "vertical" ? "flex-col" : "items-center";
  const gapClass = layout === "vertical" ? "space-y-3" : "gap-2";

  return (
    <div className={`flex ${layoutClass} ${gapClass} ${className}`}>
      <Button
        variant={editButtonVariant}
        size={editButtonSize}
        onClick={onEdit}
        className="flex items-center gap-2"
      >
        <SquarePenIcon className="w-4 h-4" />
        Edit {entityName}
      </Button>
      {isApprovalsContext && !isApproved && (
        <>
          <Button
            variant="purple"
            size={editButtonSize}
            onClick={onApprove}
            disabled={isLoading}
            className={layout === "vertical" ? "w-full" : ""}
          >
            {isLoading ? "Processing..." : `Approve ${entityName}`}
          </Button>
          <Button
            variant="destructive"
            size={editButtonSize}
            onClick={onReject}
            disabled={isLoading}
            className={layout === "vertical" ? "w-full" : ""}
          >
            {isLoading ? "Processing..." : `Reject ${entityName}`}
          </Button>
          <Button
            variant="black"
            size={editButtonSize}
            onClick={onHold}
            disabled={isLoading}
            className={layout === "vertical" ? "w-full" : ""}
          >
            {isLoading ? "Processing..." : `Hold ${entityName}`}
          </Button>
        </>
      )}
      {isApproved && (
        <Badge className="bg-success2 text-success1 text-sm capitalize">
          Approved
        </Badge>
      )}
    </div>
  );
};

export default ActionButtons;
