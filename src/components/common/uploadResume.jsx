import { Input } from "../ui/input";
import { ResumeSlateIcon } from "../../utils/icon";
import { setNestedValue } from "../../utils/commonFunctions";

const UploadResume = ({
  setFormData,
  formData,
  handleRemoveFile,
  fileName,
  setFileName,
  handleUpload,
}) => {
  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-10">
      <div className="inline-flex justify-start items-start gap-2.5">
        <div className="gap-1 justify-start text-gray-900 text-base font-semibold leading-normal">
          Upload Resume
          <span className="text-red-500 text-[14px] ml-1">*</span>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-center items-center gap-4">
        <div className="self-stretch h-32 relative bg-white rounded-lg outline-[1.50px] outline-offset-[-1.50px] outline-gray-200 overflow-hidden">
          <div className="lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute inline-flex flex-col justify-start items-center gap-1">
            <ResumeSlateIcon />
            <div className="justify-start text-gray-900 lg:text-base text-sm font-medium leading-normal">
              {fileName ? fileName : "No files Uploaded yet!"}
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-center gap-2">
          <div className="relative w-60 inline-flex justify-start items-start">
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // stops file dialog from opening
                if (fileName !== "") handleRemoveFile();
              }}
              className={`flex-1 px-4 py-2.5 ${
                fileName ? "bg-[#e64d4d]" : "bg-[#6945ED1A]"
              } rounded-[100px] shadow-[0px_1px_2px_0px_rgba(5,32,81,0.05)] outline-1 outline-offset-[-1px] outline-white flex justify-center items-center gap-2.5 cursor-pointer`}
            >
              <div
                className={`justify-center   ${
                  fileName ? "text-[#fff]" : "text-[#6945ED]"
                } text-base font-semibold leading-normal`}
              >
                {fileName ? "Delete" : "Upload"}
              </div>
            </div>
            {!fileName && (
              <Input
                type="file"
                accept="application/pdf"
                className="absolute inset-0 opacity-0 cursor-pointer z-0 h-full w-full"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const isValidSize = file.size <= 5 * 1024 * 1024;
                  if (!file.type === "application/pdf") {
                    alert("Only PDF files are allowed.");
                    return;
                  }

                  if (!isValidSize) {
                    alert("File must be smaller than 5MB.");
                    return;
                  }
                  handleUpload(file, (uploadedFileUrl, fileName) => {
                    setFormData((prev) =>
                      setNestedValue(prev, "resume", uploadedFileUrl)
                    );
                    setFileName(fileName);
                  });
                }}
              />
            )}
          </div>
          <div className="justify-start text-stone-500 text-sm font-normal leading-tight">
            Format: pdf & Max file size: 5 MB
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
