import { Sheet, SheetContent } from "@/components/ui/sheet";

const EditTrainerDrawer = ({ isOpen, setIsOpen, children }) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="
          w-full h-screen 
          lg:max-w-[1000px] 
          md:max-w-full
          sm:max-w-full 
          overflow-y-auto border-transparent [&>button.absolute]:hidden"
      >
        <div className="w-full h-full">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default EditTrainerDrawer;
