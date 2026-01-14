import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const Address = ({ setFormData, formData }) => {
  return (
    <div className="w-full flex flex-col gap-[18px]">
      <div className="flex flex-col gap-[8px] relative">
        <div className="absolute top-0 right-0 flex items-center gap-2">
          <Checkbox
            onCheckedChange={() =>
              setFormData((prev) => ({
                ...prev,
                sameAs: !formData.sameAs,
              }))
            }
            className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer"
          />
          <span className="text-xs font-medium">Same as Current Address?</span>
        </div>
        <Label className="gap-1 text-base text-[#20102B] font-semibold">
          Permanent Address
          <span className="text-red-500 text-[14px]">*</span>
        </Label>
        <Textarea
          disabled={formData?.sameAs}
          value={
            formData?.sameAs
              ? formData?.currentAddress?.address
              : formData?.permanentAddress?.address
          }
          row={4}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              permanentAddress: {
                ...prev.permanentAddress,
                address: e.target.value,
              },
            }))
          }
          placeholder="Enter Permanent address"
          className="flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
        />
      </div>
      <div className="flex gap-[8px] flex-wrap justify-end items-end">
        <Input
          value={
            formData?.sameAs
              ? formData?.currentAddress?.city
              : formData?.permanentAddress?.city
          }
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              permanentAddress: {
                ...prev.permanentAddress,
                city: e.target.value,
              },
            }))
          }
          disabled={formData?.sameAs}
          placeholder="Enter City"
          className=" flex-1 placeholder:translate-y-[1px] text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
        />
        <Input
          value={
            formData?.sameAs
              ? formData?.currentAddress?.state
              : formData?.permanentAddress?.state
          }
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              permanentAddress: {
                ...prev.permanentAddress,
                state: e.target.value,
              },
            }))
          }
          disabled={formData?.sameAs}
          placeholder="Enter State"
          className="flex-1 placeholder:translate-y-[1px] text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
        />
        <Input
          value={
            formData?.sameAs
              ? formData?.currentAddress?.pincode
              : formData?.permanentAddress?.pincode
          }
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              permanentAddress: {
                ...prev.permanentAddress,
                pincode: e.target.value,
              },
            }))
          }
          disabled={formData?.sameAs}
          placeholder="Enter Pincode"
          className="flex-1 placeholder:translate-y-[1px] text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
        />
      </div>
    </div>
  );
};

export default Address;
