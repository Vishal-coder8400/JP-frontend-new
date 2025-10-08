import { ClockIcon } from "lucide-react";

const PendingApprove = () => {
  return (
    <div className="flex items-center gap-6 px-6 py-4 bg-[#ffffe5] border-none min-h-28">
      <div className="flex-shrink-0">
        <ClockIcon className="w-[60px] h-[60px] text-red-500" strokeWidth={2} />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#171923] text-xl tracking-[-0.80px] leading-5 m-0">
          Approval Pending by admin!
        </div>

        <div className="[font-family:'Inter',Helvetica] font-normal text-[#141414b2] text-base tracking-[-0.48px] leading-6 m-0">
          Your Profile has been approved by admin Mollit in laborum tempor Lorem
          incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa
        </div>
      </div>
    </div>
  );
};

export default PendingApprove;
