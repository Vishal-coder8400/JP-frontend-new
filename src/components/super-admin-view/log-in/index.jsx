import CommonForm from "../../common/form";
import { LoginFields } from "../../../config";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Index = ({ formData, setFormData, handleSubmit, isPending }) => {
  return (
    <div className="h-screen w-full bg-[#F6F4FF] flex items-center justify-center">
      <div className="w-full  h-[90vh] px-16">
        <div className="flex h-full gap-16 items-stretch justify-between">

          {/* LEFT – LOGIN CARD */}
          <div className="flex-1 max-w-[600px] h-full ml-8">
            <div className="w-full h-full rounded-[32px] bg-gradient-to-br from-[#8E2C6D] via-[#7A3FA2] to-[#4B4DB5] p-12 flex flex-col justify-between text-white shadow-2xl">

              <div>
                {/* Logo */}
                <div className="flex justify-center mb-20">
                  <img
                    src="/ghrig_logo.png"
                    alt="GHRIG Logo"
                    className="w-[200px]"
                  />
                </div>

                {/* Headings */}
                <div className="flex flex-col mb-10">
                  <p className="text-lg tracking-wide opacity-90">
                    SUPER ADMIN PANEL
                  </p>
                  <h2 className="text-lg font-medium">
                    Log In to Admin Dashboard
                  </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-7">

                  <CommonForm
                    formControls={LoginFields}
                    formData={formData}
                    setFormData={setFormData}
                    variant="login"
                  />

                  <div className="flex justify-end">
                    <Link className="text-sm opacity-90 hover:underline hover:opacity-100 transition-opacity">
                      Forget Password?
                    </Link>
                  </div>

                  <Button
                    disabled={isPending}
                    className="h-[56px] rounded-xl bg-white text-[#7A3FA2] font-semibold tracking-wide hover:bg-gray-50 text-base shadow-md hover:shadow-lg transition-all"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Please wait
                      </span>
                    ) : (
                      "LOGIN TO ADMIN PANEL"
                    )}
                  </Button>
                </form>
              </div>

              {/* Footer */}
              <p className="text-center text-sm opacity-90 pt-6">
                System Administrator Access Only
              </p>
            </div>
          </div>

          {/* RIGHT – IMAGE CARD */}
  <div className="flex-1 max-w-[580px] h-full py-6">
  <div className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl">
    <img
      src="/admin-login.jpeg"
      alt="Promo"
      className="w-full h-full object-cover"
    />
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Index;