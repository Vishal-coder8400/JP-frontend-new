import React from "react";
import Navbar from "../../components/recruiter-view/navbar";
import { useGetJobById } from "@/hooks/recruiter/useJob";

const JobDescription = () => {
  const { id } = useParams();
  const { data: jobData } = useGetJobById(id);
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <Navbar onlySupport={false} />
      <div className="flex w-full items-start justify-between">
        <div className="w-[70%] flex flex-col gap-[31px]">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <img
              className="size-16 relative rounded-sm"
              src="https://placehold.co/72x72"
            />
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                  <div className="self-stretch inline-flex justify-start items-center gap-3">
                    <div className="justify-start text-neutral-900 text-lg font-normal leading-relaxed">
                      The Company
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-3">
                    <div className="self-stretch justify-start text-neutral-900 text-2xl font-medium leading-9">
                      Business Development Intern
                    </div>
                    <div className="size- px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-violet-500 text-xs font-medium leading-none">
                        2 applied
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch py-0.5 inline-flex justify-start items-start gap-6 flex-wrap content-start">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-2.5 h-px left-[3px] top-[14px] absolute bg-neutral-900/70" />
                      <div className="size-[5px] left-[5.50px] top-[4px] absolute bg-neutral-900/70" />
                      <div className="w-2.5 h-3.5 left-[2.50px] top-[1px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Brussels
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[1.50px] top-[1.50px] absolute bg-neutral-900/70" />
                      <div className="size-1 left-[7.50px] top-[4px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Full time
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-px h-3.5 left-[7.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-2 h-2.5 left-[3.50px] top-[2.50px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      50-55k
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[2px] top-[2px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[10.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[4.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-3 h-px left-[2px] top-[5px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      29 min ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="size- px-5 py-2.5 bg-gray-900 rounded-3xl flex justify-center items-center gap-2.5">
              <div className="justify-start text-white text-sm font-medium capitalize">
                Apply Now
              </div>
            </div>
            <div className="size- pl-3.5 pr-5 py-2.5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-2.5">
              <div className="size-4 relative overflow-hidden">
                <div className="w-2.5 h-3 left-[3.33px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-400" />
              </div>
              <div className="justify-start text-neutral-400 text-sm font-medium capitalize">
                Save
              </div>
            </div>
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-8">
              <div className="self-stretch justify-start text-neutral-900 text-xl font-semibold leading-tight">
                About the job
              </div>
              <div className="self-stretch justify-start">
                <span class="text-neutral-900/70 text-base font-bold leading-normal">
                  Job description
                  <br />
                </span>
                <span class="text-neutral-900/70 text-base font-normal leading-normal">
                  Job Overview:
                  <br />
                  Jayant Fitness is looking for a dynamic and results-driven
                  Business Development Executive / Sales Executive to expand our
                  client base in the corporate and real estate sectors. The
                  ideal candidate will be responsible for generating leads,
                  closing deals, and building long-term relationships with
                  clients.
                  <br />
                </span>
                <span class="text-neutral-900/70 text-base font-bold leading-normal">
                  <br />
                  Key Responsibilities:
                  <br />
                </span>
                <span class="text-neutral-900/70 text-base font-normal leading-normal">
                  Identify and develop new business opportunities in corporate
                  offices, real estate developers, and commercial spaces.
                  <br />
                  Meet potential clients, give product presentations, and
                  understand their fitness equipment needs.
                  <br />
                  Build and maintain strong relationships with key
                  decision-makers.
                  <br />
                  Achieve and exceed sales targets through strategic planning
                  and negotiation.
                  <br />
                  Conduct market research to identify new trends and business
                  opportunities.
                  <br />
                  Collaborate with internal teams to ensure seamless delivery
                  and customer satisfaction.
                  <br />
                  Maintain records of sales, client interactions, and market
                  intelligence.
                  <br />
                </span>
                <span class="text-neutral-900/70 text-base font-bold leading-normal">
                  <br />
                  Education
                  <br />
                </span>
                <span class="text-neutral-900/70 text-base font-normal leading-normal">
                  UG: Any Graduate
                  <br />
                </span>
                <span class="text-neutral-900/70 text-base font-bold leading-normal">
                  <br />
                  Other Details
                  <br />
                </span>
                <span class="text-neutral-900/70 text-base font-normal leading-normal">
                  <br />
                </span>
                <span class="text-neutral-900/70 text-base font-normal leading-normal">
                  Location : In-office role in HSR, Bengaluru
                  <br />
                  Stipend : 35K INR/month
                  <br />
                  Duration : 3-6 months
                  <br />
                  Joining Date : ASAP, we need you now!
                  <br />
                  Bonus Pointer : A thoughtful & well-written email (at
                  anesh@stimuler.tech) about why you are a good fit, will
                  exponentially increase your chances to land an interview
                  <br />
                </span>
                <span class="text-neutral-900/70 text-base font-normal leading-normal">
                  <br />
                  For additional information, you can reach out to me at
                  anesh@stimuler.tech
                  <br />
                  <br />
                  Looking forward to seeing some great applications!
                </span>
              </div>
              <div className="w-80 inline-flex justify-start items-start gap-3 flex-wrap content-start">
                <div className="size- px-5 py-2.5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                  <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                    Equipment Sales
                  </div>
                </div>
                <div className="size- px-5 py-2.5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                  <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                    Sales
                  </div>
                </div>
                <div className="size- px-5 py-2.5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                  <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                    Field Sales
                  </div>
                </div>
                <div className="size- px-5 py-2.5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                  <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                    Sales and marketing
                  </div>
                </div>
                <div className="size- px-5 py-2.5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                  <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                    Client aquisition
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-8">
              <div className="self-stretch justify-start text-neutral-900 text-xl font-semibold leading-tight">
                About the Company
              </div>
              <div className="self-stretch justify-start">
                <span class="text-neutral-900/70 text-base font-normal leading-normal">
                  {`Stimuler has helped over 3.5 Million people improve their
                  conversational skills using its Audio AI technology. Our AI
                  engines listen, provide detailed feedback on essential speech
                  metrics, and offer guided practice for improvement. Awarded
                  Google Play’s Best AI App and backed by some of the world’s
                  best VC funds, our app has impacted users from over 200
                  countries till date.`}
                  <br />
                </span>
                <span class="text-neutral-900/70 text-base font-bold leading-normal">
                  Company Info:
                  <br />
                </span>
                <span class="text-neutral-900/70 text-base font-bold leading-normal">
                  Address:
                </span>
                <span class="text-neutral-900/70 text-base font-normal leading-normal">
                  {"Jayanagar, Bangalore, Karnataka, India"}
                </span>
              </div>
              <div className="self-stretch h-0 outline-2 outline-offset-[-1px] outline-stone-300" />
              <div className="size- inline-flex justify-start items-start gap-4">
                <img
                  className="size-7 rounded-lg"
                  src="https://placehold.co/28x28"
                />
                <img
                  className="size-7 rounded-lg"
                  src="https://placehold.co/28x28"
                />
                <img
                  className="size-7 rounded-lg"
                  src="https://placehold.co/28x28"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[28%] flex flex-col gap-[24px]">
          <div className="self-stretch justify-start text-neutral-900 text-xl font-semibold leading-tight">
            Related Jobs
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="size- flex flex-col justify-start items-start gap-1">
                  <div className="size- inline-flex justify-center items-center gap-2.5">
                    <img
                      className="size-6 relative rounded-sm"
                      src="https://placehold.co/24x24"
                    />
                    <div className="justify-start text-neutral-900 text-base font-normal leading-normal">
                      The Company
                    </div>
                  </div>
                  <div className="size- flex flex-col justify-start items-start gap-3">
                    <div className="justify-start text-neutral-900 text-xl font-medium leading-normal">
                      Business Development  Intern
                    </div>
                    <div className="size- px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-violet-500 text-xs font-medium leading-none">
                        2 applied
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-60 py-0.5 inline-flex justify-center items-center gap-6 flex-wrap content-center">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-2.5 h-px left-[3px] top-[14px] absolute bg-neutral-900/70" />
                      <div className="size-[5px] left-[5.50px] top-[4px] absolute bg-neutral-900/70" />
                      <div className="w-2.5 h-3.5 left-[2.50px] top-[1px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Brussels
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[1.50px] top-[1.50px] absolute bg-neutral-900/70" />
                      <div className="size-1 left-[7.50px] top-[4px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Full time
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-px h-3.5 left-[7.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-2 h-2.5 left-[3.50px] top-[2.50px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      50-55k
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[2px] top-[2px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[10.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[4.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-3 h-px left-[2px] top-[5px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      29 min ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="size- flex flex-col justify-start items-start gap-1">
                  <div className="size- inline-flex justify-center items-center gap-2.5">
                    <img
                      className="size-6 relative rounded-sm"
                      src="https://placehold.co/24x24"
                    />
                    <div className="justify-start text-neutral-900 text-base font-normal leading-normal">
                      The Company
                    </div>
                  </div>
                  <div className="size- flex flex-col justify-start items-start gap-3">
                    <div className="justify-start text-neutral-900 text-xl font-medium leading-normal">
                      Business Development  Intern
                    </div>
                    <div className="size- px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-violet-500 text-xs font-medium leading-none">
                        2 applied
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-60 py-0.5 inline-flex justify-center items-center gap-6 flex-wrap content-center">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-2.5 h-px left-[3px] top-[14px] absolute bg-neutral-900/70" />
                      <div className="size-[5px] left-[5.50px] top-[4px] absolute bg-neutral-900/70" />
                      <div className="w-2.5 h-3.5 left-[2.50px] top-[1px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Brussels
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[1.50px] top-[1.50px] absolute bg-neutral-900/70" />
                      <div className="size-1 left-[7.50px] top-[4px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Full time
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-px h-3.5 left-[7.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-2 h-2.5 left-[3.50px] top-[2.50px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      50-55k
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[2px] top-[2px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[10.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[4.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-3 h-px left-[2px] top-[5px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      29 min ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="size- flex flex-col justify-start items-start gap-1">
                  <div className="size- inline-flex justify-center items-center gap-2.5">
                    <img
                      className="size-6 relative rounded-sm"
                      src="https://placehold.co/24x24"
                    />
                    <div className="justify-start text-neutral-900 text-base font-normal leading-normal">
                      The Company
                    </div>
                  </div>
                  <div className="size- flex flex-col justify-start items-start gap-3">
                    <div className="justify-start text-neutral-900 text-xl font-medium leading-normal">
                      Business Development  Intern
                    </div>
                    <div className="size- px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-violet-500 text-xs font-medium leading-none">
                        2 applied
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-60 py-0.5 inline-flex justify-center items-center gap-6 flex-wrap content-center">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-2.5 h-px left-[3px] top-[14px] absolute bg-neutral-900/70" />
                      <div className="size-[5px] left-[5.50px] top-[4px] absolute bg-neutral-900/70" />
                      <div className="w-2.5 h-3.5 left-[2.50px] top-[1px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Brussels
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[1.50px] top-[1.50px] absolute bg-neutral-900/70" />
                      <div className="size-1 left-[7.50px] top-[4px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Full time
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-px h-3.5 left-[7.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-2 h-2.5 left-[3.50px] top-[2.50px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      50-55k
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[2px] top-[2px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[10.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[4.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-3 h-px left-[2px] top-[5px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      29 min ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="size- flex flex-col justify-start items-start gap-1">
                  <div className="size- inline-flex justify-center items-center gap-2.5">
                    <img
                      className="size-6 relative rounded-sm"
                      src="https://placehold.co/24x24"
                    />
                    <div className="justify-start text-neutral-900 text-base font-normal leading-normal">
                      The Company
                    </div>
                  </div>
                  <div className="size- flex flex-col justify-start items-start gap-3">
                    <div className="justify-start text-neutral-900 text-xl font-medium leading-normal">
                      Business Development  Intern
                    </div>
                    <div className="size- px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-violet-500 text-xs font-medium leading-none">
                        2 applied
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-60 py-0.5 inline-flex justify-center items-center gap-6 flex-wrap content-center">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-2.5 h-px left-[3px] top-[14px] absolute bg-neutral-900/70" />
                      <div className="size-[5px] left-[5.50px] top-[4px] absolute bg-neutral-900/70" />
                      <div className="w-2.5 h-3.5 left-[2.50px] top-[1px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Brussels
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[1.50px] top-[1.50px] absolute bg-neutral-900/70" />
                      <div className="size-1 left-[7.50px] top-[4px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Full time
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-px h-3.5 left-[7.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-2 h-2.5 left-[3.50px] top-[2.50px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      50-55k
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[2px] top-[2px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[10.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[4.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-3 h-px left-[2px] top-[5px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      29 min ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
