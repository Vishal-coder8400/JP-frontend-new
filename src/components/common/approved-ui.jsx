import React from "react";
import { X } from "lucide-react";

const ApprovedUi = ({ onClose }) => {
  return (
    <div className="relative flex items-center gap-6 px-6 py-4 bg-[#f1ffe8] w-full min-w-[862px] min-h-28 border-0">
      <div className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#171923] text-6xl tracking-[-2.40px] leading-[60px] whitespace-nowrap">
        🎉
      </div>

      <div className="flex flex-col w-[730px] items-start gap-3">
        <div className="mt-0 [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#171923] text-xl tracking-[-0.80px] leading-5 whitespace-nowrap">
          Profile Approved by Admin!
        </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default ApprovedUi;
