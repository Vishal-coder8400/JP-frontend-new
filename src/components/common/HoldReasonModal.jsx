import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const HoldReasonModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  entityType = "application",
}) => {
  const [holdReason, setHoldReason] = useState("");

  const handleConfirm = () => {
    if (!holdReason.trim()) {
      return;
    }
    onConfirm(holdReason.trim());
    setHoldReason("");
    onClose();
  };

  const handleClose = () => {
    setHoldReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Reason for Hold</DialogTitle>
          <DialogDescription>
            Please provide a reason for putting this {entityType} on hold. This
            information will help track the status.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="hold-reason">Hold Reason *</Label>
            <Textarea
              id="hold-reason"
              placeholder="Enter the reason for putting on hold..."
              value={holdReason}
              onChange={(e) => setHoldReason(e.target.value)}
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!holdReason.trim() || isLoading}
          >
            {isLoading ? "Processing..." : "Hold"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HoldReasonModal;
