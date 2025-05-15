import React, { useState } from "react";
import CommonForm from "../../common/form";
import { LoginFields } from "../../../config";
import { Button } from "../../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { useLogin } from "../../../hooks/useAuth";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberme: false,
  });
  const { mutate, isPending, isError, error } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };
  return (
    <div className="flex max-sm:flex-col max-sm:gap-[40px] justify-between p-[20px] pt-[100px] max-sm:p-[24px] max-sm:pt-[100px] w-full pb-[90px] items-center">
      <div className="w-1/2 max-sm:w-full lg:flex lg:items-center lg:justify-end lg:pr-[100px]">
        <div className="w-full max-w-[554px] bg-neutral-50 rounded-tl-[28.91px] rounded-tr-[28.91px] flex flex-col gap-[25px] p-[20px] lg:p-[47px]">
          <div className="flex flex-col gap-0">
            <div className="text-black text-base">WELCOME BACK</div>
            <div className="text-black text-3xl font-medium">
              Log In to your Account
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={formData.rememberme}
                    onCheckedChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        rememberme: !prev.rememberme,
                      }))
                    }
                    id="terms"
                    className="cursor-pointer w-[20px] h-[20px]"
                  />
                </div>
                <label htmlFor="terms" className="text-base text-black">
                  Remember me
                </label>
              </div>
              <Link className="text-[#424242] text-base font-medium">
                Forget Password?
              </Link>
            </div>
            <Button className="cursor-pointer h-[50px] rounded-[10px] bg-[#6945ED] text-white font-bold py-[9px] px-[58px] flex">
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-2 w-2" /> Please wait
                </span>
              ) : (
                "CONTINUE"
              )}
            </Button>
          </form>
          <div className="flex items-center justify-center text-base text-[#212121]">
            New User?
            <Link
              to={"/recruiter/profile-setup/basic-details"}
              className="pl-[2px] font-bold underline"
            >
              SIGN UP HERE
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 max-sm:w-full">
        <div className="bg-[#ccc] rounded-[24px] sm:max-w-[622px] w-full flex items-center justify-center py-[12px] px-[15px]">
          <div className="grid grid-cols-2 grid-rows-4 gap-[10px] w-full h-full">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="relative max-w-[289.646px] max-sm:max-w-[187.151px] w-full h-[214.61px] max-sm:h-[138.667px] rounded-[15px] overflow-hidden bg-black"
              >
                <img
                  src={item.imageUrl}
                  alt="Card"
                  className="w-full h-full object-cover"
                />
                {item.text && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-center text-md p-2">
                    {item.text}
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
