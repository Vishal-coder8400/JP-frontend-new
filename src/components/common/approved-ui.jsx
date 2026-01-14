import React from "react";

const ApprovedUi = () => {
  return (
    <div className="flex items-center gap-6 px-6 py-4 bg-[#f1ffe8] w-full min-w-[862px] min-h-28 border-0">
      <div className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#171923] text-6xl tracking-[-2.40px] leading-[60px] whitespace-nowrap">
        🎉
      </div>

      <div className="flex flex-col w-[730px] items-start gap-3">
        <div className="mt-0 [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#171923] text-xl tracking-[-0.80px] leading-5 whitespace-nowrap">
          Profile Approved by Admin!
        </div>

        <div className="w-[725px] [font-family:'Inter',Helvetica] font-normal text-[#141414b2] text-base tracking-[-0.48px] leading-6">
          Your Profile has been approved by admin Mollit in laborum tempor Lorem
          incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa
        </div>
      </div>
    </div>
  );
};

export default ApprovedUi;
