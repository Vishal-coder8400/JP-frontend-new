import CommonForm from "../../common/form";
import { LoginFields } from "../../../config";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Index = ({ formData, setFormData, handleSubmit, isPending }) => {
  return (
    <div className="flex max-sm:flex-col max-sm:gap-[40px] justify-between p-[20px] pt-[60px] max-sm:p-[24px] max-sm:pt-[100px] w-full pb-[90px] items-center">
      <div className="w-1/2 max-sm:w-full lg:flex lg:items-center lg:justify-end lg:pr-[100px]">
        <div className="w-full max-w-[554px] bg-neutral-50 rounded-tl-[28.91px] rounded-tr-[28.91px] flex flex-col gap-[25px] p-[20px] lg:p-[47px]">
          <div className="flex justify-center mb-4">
            <img
              src="/ghrig_logo.png"
              alt="GHRIG Logo"
              className="h-auto w-48 mx-auto"
            />
          </div>
          <div className="flex flex-col gap-0">
            <div className="text-black text-base">SUPER ADMIN PANEL</div>
            <div className="text-black text-3xl font-medium">
              Log In to Admin Dashboard
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] ">
            <div className="w-full">
              <CommonForm
                formControls={LoginFields}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            <div className="flex items-center justify-end">
              <Link className="text-[#424242] text-base font-medium">
                Forget Password?
              </Link>
            </div>
            <Button
              disabled={isPending}
              className="cursor-pointer h-[50px] rounded-[10px] bg-[#6945ED] text-white font-bold py-[9px] px-[58px] flex"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-2 w-2" /> Please wait
                </span>
              ) : (
                "LOGIN TO ADMIN PANEL"
              )}
            </Button>
          </form>
          <div className="flex items-center justify-center text-base text-[#212121]">
            System Administrator Access Only
          </div>
        </div>
      </div>
      <div className="w-[50%] max-sm:w-full flex justify-center items-end">
        <div className="bg-[#ccc] rounded-[24px] sm:max-w-[622px] w-full lg:w-[75%] flex items-center justify-center py-[12px] px-[15px]">
          <div className="grid grid-cols-2 grid-rows-4 gap-[10px] w-full h-full">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="relative max-w-[287px] max-sm:max-w-[187.151px] w-full h-[170.61px] max-sm:h-[138.667px] rounded-[15px] overflow-hidden bg-black"
              >
                <img
                  src="/image.png"
                  alt="Admin Dashboard"
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-center text-md p-2">
                    System Administration
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
