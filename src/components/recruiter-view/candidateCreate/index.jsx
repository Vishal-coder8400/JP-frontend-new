import React, { useState } from "react";
import CommonForm from "../../common/form";
import {
  candiadateCreationformControls,
  highestQualification,
} from "../../../config";
import { Button } from "../../ui/button";
import { useCreateApplicant } from "../../../hooks/useApplicant";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    profilePicture: "https://example.com/profile.jpg",

    phone: {
      number: "",
      countryCode: "",
    },
    email: "",
    currentAddress: {
      address: "",
      city: "",
      pincode: "",
    },
    permanentAddress: {
      address: "",
      city: "",
      pincode: "",
    },
    gender: "",
    education: [
      {
        degree: "",
        institution: "IIT Bombay",
        studyType: "full-time",
        startDate: "",
        endDate: "",
      },
    ],
    currentWorkingStatus: "",
    resume: "https://example.com/resume.pdf",
  });
  const { mutate, isPending } = useCreateApplicant();
  const onSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };
  return (
    <div className="w-full self-stretch lg:px-36 lg:py-20 p-[20px] lg:pt-0 inline-flex flex-col justify-start items-end lg:gap-10 gap-[15px]">
      <div className="w-full inline-flex justify-start items-start gap-8">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-7">
          <div className="self-stretch justify-start text-gray-900 lg:text-3xl text-lg font-bold leading-loose">
            Candidate Creation
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-10">
        <form
          onSubmit={onSubmit}
          className="self-stretch flex flex-col justify-start items-start gap-10"
        >
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-60">
              <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                Basic Information
              </div>
            </div>
            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
            <div className="w-full">
              <CommonForm
                formControls={candiadateCreationformControls}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            <div className="w-full">
              {formData.education.map((item, index) => (
                <CommonForm
                  formControls={highestQualification}
                  formData={formData}
                  setFormData={setFormData}
                  key={index}
                  i={index}
                />
              ))}
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="flex justify-start items-start gap-2.5">
                  <div className="justify-start text-gray-900 text-sm font-medium leading-normal">
                    Current Working Status
                  </div>
                </div>
              </div>
              <div className="self-stretch inline-flex justify-start items-start gap-2">
                <div
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      currentWorkingStatus: "working",
                    }))
                  }
                  className={`min-w-[100px] flex-1 px-4 py-2.5 bg-white rounded outline-2 outline-offset-[-1px] ${
                    formData.currentWorkingStatus === "working"
                      ? "outline-[#6945ED]"
                      : "outline-neutral-200"
                  } flex justify-between items-center gap-2 cursor-pointer min-h-[44px]`}
                >
                  <span className="text-sm text-neutral-400 truncate whitespace-nowrap overflow-hidden max-w-[80%]">
                    Working
                  </span>

                  {formData.currentWorkingStatus === "working" && (
                    <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                  )}
                </div>

                <div
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      currentWorkingStatus: "notice period",
                    }))
                  }
                  className={`min-w-[100px] flex-1 px-4 py-2.5 bg-white rounded outline-2 outline-offset-[-1px] ${
                    formData.currentWorkingStatus === "notice period"
                      ? "outline-[#6945ED]"
                      : "outline-neutral-200"
                  } flex justify-between items-center gap-2 cursor-pointer min-h-[44px]`}
                >
                  <span className="text-sm text-neutral-400 truncate whitespace-nowrap overflow-hidden max-w-[80%]">
                    Serving Notice Period
                  </span>

                  {formData.currentWorkingStatus === "notice period" && (
                    <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                  )}
                </div>

                <div
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      currentWorkingStatus: "not working",
                    }))
                  }
                  className={`min-w-[100px] flex-1 px-4 py-2.5 bg-white rounded outline-2 outline-offset-[-1px] ${
                    formData.currentWorkingStatus === "not working"
                      ? "outline-[#6945ED]"
                      : "outline-neutral-200"
                  } flex justify-between items-center gap-2 cursor-pointer min-h-[44px]`}
                >
                  <span className="text-sm text-neutral-400 truncate whitespace-nowrap overflow-hidden max-w-[80%]">
                    Not working
                  </span>

                  {formData.currentWorkingStatus === "not working" && (
                    <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                  )}
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-10">
              <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
                <div className="inline-flex justify-start items-start gap-2.5">
                  <div className="justify-start text-gray-900 text-sm font-medium leading-normal">
                    Upload Resume
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-center items-center gap-4">
                  <div className="self-stretch h-32 relative bg-white rounded-lg outline-[1.50px] outline-offset-[-1.50px] outline-gray-200 overflow-hidden">
                    <div className="lg:left-[269.50px] lg:top-[30px] left-[68px] top-[25px] absolute inline-flex flex-col justify-start items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="43"
                        viewBox="0 0 44 43"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.2466 5.19678L13.1513 5.20906L11.7078 5.39335L9.95399 5.61449C8.88535 5.73964 7.89347 6.23244 7.14823 7.0085C6.40299 7.78456 5.95076 8.79559 5.86899 9.86842C5.23182 18.7426 5.23182 27.6511 5.86899 36.5253C5.94431 37.6061 6.40368 38.6243 7.1641 39.396C7.92453 40.1677 8.93587 40.642 10.0154 40.7332C18.2346 41.4212 25.7596 41.4212 33.9756 40.7332C35.0552 40.642 36.0665 40.1677 36.827 39.396C37.5874 38.6243 38.0467 37.6061 38.1221 36.5253C38.7591 27.6511 38.7591 18.7426 38.1221 9.86842C38.0404 8.79605 37.5886 7.78539 36.844 7.0094C36.0994 6.2334 35.1082 5.7403 34.0401 5.61449L32.2894 5.39335L30.8458 5.20906L30.7476 5.19678H13.2466Z"
                          fill="#6945ED"
                          fillOpacity="0.1"
                        />
                        <path
                          d="M14.3214 5.7802C14.3206 5.25105 14.4242 4.72692 14.6262 4.23785C14.8283 3.74878 15.1248 3.30436 15.4988 2.93005C15.8728 2.55574 16.317 2.25888 16.806 2.05647C17.2949 1.85406 17.8189 1.75008 18.3481 1.75049H25.6458C26.7149 1.75049 27.7403 2.17521 28.4963 2.93122C29.2523 3.68722 29.677 4.71259 29.677 5.78174C29.677 6.85089 29.2523 7.87626 28.4963 8.63226C27.7403 9.38827 26.7149 9.81299 25.6458 9.81299H18.3511C17.8214 9.81339 17.2968 9.70936 16.8074 9.50683C16.3179 9.30431 15.8732 9.00727 15.4986 8.63271C15.1241 8.25816 14.827 7.81342 14.6245 7.32396C14.422 6.8345 14.321 6.30991 14.3214 5.7802Z"
                          fill="#6945ED"
                        />
                      </svg>
                      <div className="justify-start text-gray-900 lg:text-base text-sm font-medium leading-normal">
                        No files Uploaded yet!
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-center gap-2">
                    <div className="w-60 inline-flex justify-start items-start">
                      <div className="flex-1 px-4 py-2.5 bg-[#6945ED1A] rounded-[100px] shadow-[0px_1px_2px_0px_rgba(5,32,81,0.05)] outline-1 outline-offset-[-1px] outline-white flex justify-center items-center gap-2.5">
                        <div className="justify-center text-[#6945ED] text-base font-semibold leading-normal">
                          Upload
                        </div>
                      </div>
                    </div>
                    <div className="justify-start text-stone-500 text-sm font-normal leading-tight">
                      Format: pdf, docx, doc & Max file size: 25 MB
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-end gap-10">
            <Button className="cursor-pointer w-36 px-5 py-2.5 bg-[#6945ED] rounded-3xl inline-flex justify-center items-center gap-2.5">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
