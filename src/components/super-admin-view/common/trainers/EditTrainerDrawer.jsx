import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditTrainerForm from "./EditTrainerForm";

const EditTrainerDrawer = ({ isOpen, onClose, trainer, onRevalidate }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="
          w-full h-screen 
          lg:max-w-[750px] 
          md:max-w-full
          sm:max-w-full 
          overflow-y-auto border-transparent [&>button.absolute]:hidden"
      >
        <div className="w-full h-full">
          {trainer && (
            <EditTrainerForm
              trainer={trainer}
              onClose={onClose}
              onRevalidate={onRevalidate}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditTrainerDrawer;
