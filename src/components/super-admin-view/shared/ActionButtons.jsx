import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SquarePenIcon } from "lucide-react";

const ActionButtons = ({
  context,
  onEdit,
  onApprove,
  onReject,
  onHold,
  onBlock, // Added onBlock prop
  isLoading = false,
  entityName = "Item",
  editButtonVariant = "outline",
  editButtonSize = "sm",
  layout = "horizontal",
  className = "",
  approvalStatus,
}) => {
  const isApprovalsContext =
    context === "approvals" ||
    context === "approval" ||
    context === "application";
  
  const normalizedStatus =
    typeof approvalStatus === "string"
      ? approvalStatus.trim().toLowerCase()
      : "";
  
  const isApproved = normalizedStatus === "approved";
  const isRejected = normalizedStatus === "rejected";
  const isHold = normalizedStatus === "hold";
  const isPending = normalizedStatus === "pending";

  const layoutClass = layout === "vertical" ? "flex-col" : "items-center";
  const gapClass = layout === "vertical" ? "space-y-3" : "gap-2";

  // Function to determine which buttons to show based on status
  const getButtonConfig = () => {
    switch (normalizedStatus) {
      case 'pending':
        return {
          showEdit: true,
          showApprove: isApprovalsContext,
          showReject: isApprovalsContext,
          showHold: isApprovalsContext,
          showBlock: false,
        };
      case 'approved':
        return {
          showEdit: true,
          showApprove: false,
          showReject: false,
          showHold: false,
          showBlock: true,
        };
      case 'hold':
        return {
          showEdit: true,
          showApprove: isApprovalsContext,
          showReject: isApprovalsContext,
          showHold: false,
          showBlock: false,
        };
      case 'rejected':
        return {
          showEdit: true,
          showApprove: true,
          showReject: false,
          showHold: true,
          showBlock: false,
        };
      default:
        return {
          showEdit: true,
          showApprove: false,
          showReject: false,
          showHold: false,
          showBlock: false,
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className={`flex ${layoutClass} ${gapClass} ${className}`}>
      {/* Edit Button */}
      {buttonConfig.showEdit && onEdit && (
        <Button
          variant={editButtonVariant}
          size={editButtonSize}
          onClick={onEdit}
          className="flex items-center gap-2"
        >
          <SquarePenIcon className="w-4 h-4" />
          Edit {entityName}
        </Button>
      )}

      {/* Approve Button */}
      {buttonConfig.showApprove && onApprove && (
        <Button
          variant="purple"
          size={editButtonSize}
          onClick={onApprove}
          disabled={isLoading}
          className={layout === "vertical" ? "w-full" : ""}
        >
          {isLoading ? "Processing..." : `Approve ${entityName}`}
        </Button>
      )}

      {/* Reject Button */}
      {buttonConfig.showReject && onReject && (
        <Button
          variant="destructive"
          size={editButtonSize}
          onClick={onReject}
          disabled={isLoading}
          className={layout === "vertical" ? "w-full" : ""}
        >
          {isLoading ? "Processing..." : `Reject ${entityName}`}
        </Button>
      )}

      {/* Hold Button */}
      {buttonConfig.showHold && onHold && (
        <Button
          variant="black"
          size={editButtonSize}
          onClick={onHold}
          disabled={isLoading}
          className={layout === "vertical" ? "w-full" : ""}
        >
          {isLoading ? "Processing..." : `Hold ${entityName}`}
        </Button>
      )}

      {/* Block Button */}
      {buttonConfig.showBlock && onBlock && (
        <Button
          variant="destructive"
          size={editButtonSize}
          onClick={onBlock}
          disabled={isLoading}
          className={layout === "vertical" ? "w-full" : ""}
        >
          {isLoading ? "Processing..." : `Block ${entityName}`}
        </Button>
      )}

      {/* Status Badges (when no actions available) */}
      {isApproved && !buttonConfig.showBlock && (
        <Badge className="bg-success2 text-success1 text-sm capitalize">
          Approved
        </Badge>
      )}
      {isRejected && (
        <Badge className="bg-destructive/10 text-destructive text-sm capitalize">
          Rejected
        </Badge>
      )}
      {isHold && !buttonConfig.showApprove && !buttonConfig.showReject && (
        <Badge className="bg-warning2 text-warning1 text-sm capitalize">
          On Hold
        </Badge>
      )}
    </div>
  );
};

export default ActionButtons;