import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const ButtonComponent = ({ isPending, buttonText, color }) => {
  return (
    <Button
      disabled={isPending}
      className={`cursor-pointer px-10 py-2.5 bg-[${color}] rounded-3xl inline-flex justify-center items-center gap-2.5`}
    >
      <div className="justify-start text-white text-sm font-medium capitalize">
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin h-2 w-2" /> Please wait
          </span>
        ) : (
          "Continue"
        )}
      </div>
    </Button>
  );
};

export default ButtonComponent;
