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

const ApplicationActionModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  actionType = "approve",
  entityType = "application",
  showFeedback = false,
}) => {
  const [notes, setNotes] = useState("");
  const [feedback, setFeedback] = useState("");

  const getActionConfig = () => {
    switch (actionType) {
      case "approve":
      case "approved":
        return {
          title: "Approve Application",
          description: `Please provide notes and feedback for approving this ${entityType}.`,
          buttonText: "Approve",
          buttonVariant: "purple",
          loadingText: "Approving...",
        };
      case "reject":
      case "rejected":
        return {
          title: "Reject Application",
          description: `Please provide notes and feedback for rejecting this ${entityType}.`,
          buttonText: "Reject",
          buttonVariant: "destructive",
          loadingText: "Rejecting...",
        };
      case "hold":
        return {
          title: "Hold Application",
          description: `Please provide notes and feedback for putting this ${entityType} on hold.`,
          buttonText: "Hold",
          buttonVariant: "default",
          loadingText: "Processing...",
        };
      default:
        return {
          title: "Update Application",
          description: `Please provide notes and feedback for this ${entityType}.`,
          buttonText: "Submit",
          buttonVariant: "default",
          loadingText: "Processing...",
        };
    }
  };

  const config = getActionConfig();

  const handleConfirm = () => {
    if (!notes.trim()) {
      return;
    }
    onConfirm({ notes: notes.trim(), feedback: feedback.trim() });
    setNotes("");
    setFeedback("");
  };

  const handleClose = () => {
    setNotes("");
    setFeedback("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes *</Label>
            <Textarea
              id="notes"
              placeholder="Enter notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>

          {showFeedback && (
            <div className="grid gap-2">
              <Label htmlFor="feedback">Feedback (Optional)</Label>
              <Textarea
                id="feedback"
                placeholder="Enter feedback for the applicant..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px]"
                disabled={isLoading}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant={config.buttonVariant}
            onClick={handleConfirm}
            disabled={!notes.trim() || isLoading}
          >
            {isLoading ? config.loadingText : config.buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationActionModal;
