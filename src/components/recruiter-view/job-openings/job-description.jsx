import React, { Fragment } from "react";
import { Button } from "../../ui/button";

const JobDescription = ({ setOpen1, setOpen }) => {
  return (
    <Fragment>
      {/* desktop-view */}
      <div className="hidden p-6 w-full bg-white outline outline-offset-[-1px] outline-neutral-400 lg:inline-flex flex-col justify-start items-center overflow-hidden min-h-screen">
        <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-8">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <img
              className="w-16 h-16 relative rounded"
              src="https://placehold.co/72x72"
            />
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="inline-flex justify-start items-center gap-3">
                    <div className="justify-start text-neutral-900 text-md2 font-normal leading-relaxed">
                      The Company
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-3">
                    <div className="justify-start text-neutral-900 text-2xl font-medium leading-9">
                      Business Development Intern
                    </div>
                    <div className="px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-violet-500 text-md font-medium leading-none">
                        2 applied
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch py-0.5 inline-flex justify-start items-center gap-5 flex-wrap content-center">
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <div className="w-2.5 h-px left-[3px] top-[14px] absolute bg-neutral-900/70" />
                      <div className="w-[5px] h-[5px] left-[5.50px] top-[4px] absolute bg-neutral-900/70" />
                      <div className="w-2.5 h-3.5 left-[2.50px] top-[1px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Brussels
                    </div>
                  </div>
                  <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <div className="w-3 h-3 left-[1.50px] top-[1.50px] absolute bg-neutral-900/70" />
                      <div className="w-1 h-1 left-[7.50px] top-[4px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Full time
                    </div>
                  </div>
                  <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <div className="w-px h-3.5 left-[7.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-2 h-2.5 left-[3.50px] top-[2.50px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      50-55k
                    </div>
                  </div>
                  <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <div className="w-3 h-3 left-[2px] top-[2px] absolute bg-neutral-900/70" />
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
            <Button
              onClick={() => {
                setOpen1(true);
              }}
              className="cursor-pointer px-5 py-2.5 bg-gray-900 rounded-3xl flex justify-center items-center gap-2.5"
            >
              <div className="justify-start text-white text-sm font-medium capitalize">
                Apply For Candidate
              </div>
            </Button>
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-8">
              <div className="self-stretch justify-start text-neutral-900 text-xl font-semibold leading-tight">
                About the job
              </div>
              <div className="self-stretch justify-start">
                <span className="text-neutral-900/70 text-base font-bold leading-normal">
                  Job description
                  <br />
                </span>
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
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
                <span className="text-neutral-900/70 text-base font-bold leading-normal">
                  <br />
                  Key Responsibilities:
                  <br />
                </span>
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
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
                <span className="text-neutral-900/70 text-base font-bold leading-normal">
                  <br />
                  Education
                  <br />
                </span>
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
                  UG: Any Graduate
                  <br />
                </span>
                <span className="text-neutral-900/70 text-base font-bold leading-normal">
                  <br />
                  Other Details
                  <br />
                </span>
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
                  <br />
                </span>
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
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
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
                  <br />
                  For additional information, you can reach out to me at
                  anesh@stimuler.tech
                  <br />
                  <br />
                  Looking forward to seeing some great applications!
                </span>
              </div>
              <div className="w-80 inline-flex justify-start items-start gap-3 flex-wrap content-start">
                <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                  <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                    Equipment Sales
                  </div>
                </div>
                <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                  <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                    Sales
                  </div>
                </div>
                <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                  <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                    Field Sales
                  </div>
                </div>
                <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                  <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                    Sales and marketing
                  </div>
                </div>
                <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                  <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                    Client aquisition
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-8">
              <div className="self-stretch justify-start text-neutral-900 text-xl font-semibold leading-tight">
                About the Company
              </div>
              <div className="self-stretch justify-start">
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
                  Stimuler has helped over 3.5 Million people improve their
                  conversational skills using its Audio AI technology. Our AI
                  engines listen, provide detailed feedback on essential speech
                  metrics, and offer guided practice for improvement. Awarded
                  Google Play’s Best AI App and backed by some of the world’s
                  best VC funds, our app has impacted users from over 200
                  countries till date.
                  <br />
                </span>
                <span className="text-neutral-900/70 text-base font-bold leading-normal">
                  {" "}
                  Company Info:
                  <br />
                </span>
                <span className="text-neutral-900/70 text-base font-bold leading-normal">
                  Address:{" "}
                </span>
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
                  Jayanagar, Bangalore, Karnataka, India
                </span>
              </div>
              <div className="self-stretch h-0 outline outline-2 outline-offset-[-1px] outline-stone-300" />
              <div className="inline-flex justify-start items-start gap-4">
                <img
                  className="w-7 h-7 rounded-lg"
                  src="https://placehold.co/28x28"
                />
                <img
                  className="w-7 h-7 rounded-lg"
                  src="https://placehold.co/28x28"
                />
                <img
                  className="w-7 h-7 rounded-lg"
                  src="https://placehold.co/28x28"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile-view */}
      <div className="lg:hidden h-[100dvh] overflow-y-auto bg-white w-full p-6 inline-flex flex-col justify-start items-start gap-6">
        <div className="self-stretch p-6  rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
          <img
            className="w-12 h-12 relative rounded"
            src="https://placehold.co/48x48"
          />
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-900 text-base font-normal leading-snug">
                  The Company
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch justify-start text-neutral-900 text-xl font-medium leading-loose">
                    Business Development Intern
                  </div>
                  <div className="px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                    <div className="justify-start text-violet-500 text-md font-medium leading-none">
                      2 applied
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch py-0.5 inline-flex justify-start items-center gap-5 flex-wrap content-center">
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <div className="w-2.5 h-px left-[3px] top-[14px] absolute bg-neutral-900/70" />
                    <div className="w-[5px] h-[5px] left-[5.50px] top-[4px] absolute bg-neutral-900/70" />
                    <div className="w-2.5 h-3.5 left-[2.50px] top-[1px] absolute bg-neutral-900/70" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    Brussels
                  </div>
                </div>
                <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <div className="w-3 h-3 left-[1.50px] top-[1.50px] absolute bg-neutral-900/70" />
                    <div className="w-1 h-1 left-[7.50px] top-[4px] absolute bg-neutral-900/70" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    Full time
                  </div>
                </div>
                <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <div className="w-px h-3.5 left-[7.50px] top-[1px] absolute bg-neutral-900/70" />
                    <div className="w-2 h-2.5 left-[3.50px] top-[2.50px] absolute bg-neutral-900/70" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    50-55k
                  </div>
                </div>
                <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <div className="w-3 h-3 left-[2px] top-[2px] absolute bg-neutral-900/70" />
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
            <Button
              onClick={() => setOpen1(true)}
              className="self-stretch px-5 py-2.5 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5"
            >
              <div className="justify-start text-white text-sm font-medium capitalize">
                Apply For Candidate
              </div>
            </Button>
          </div>
        </div>
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
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
                client base in the corporate and real estate sectors. The ideal
                candidate will be responsible for generating leads, closing
                deals, and building long-term relationships with clients.
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
                Achieve and exceed sales targets through strategic planning and
                negotiation.
                <br />
                Conduct market research to identify new trends and business
                opportunities.
                <br />
                Collaborate with internal teams to ensure seamless delivery and
                customer satisfaction.
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
            <div className="self-stretch inline-flex justify-start items-start gap-3 flex-wrap content-start">
              <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                  Equipment Sales
                </div>
              </div>
              <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                  Sales
                </div>
              </div>
              <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                  Field Sales
                </div>
              </div>
              <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                  Sales and marketing
                </div>
              </div>
              <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5">
                <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                  Client aquisition
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-8">
            <div className="self-stretch justify-start text-neutral-900 text-xl font-semibold leading-tight">
              About the Company
            </div>
            <div className="self-stretch justify-start">
              <span class="text-neutral-900/70 text-base font-normal leading-normal">
                Stimuler has helped over 3.5 Million people improve their
                conversational skills using its Audio AI technology. Our AI
                engines listen, provide detailed feedback on essential speech
                metrics, and offer guided practice for improvement. Awarded
                Google Play’s Best AI App and backed by some of the world’s best
                VC funds, our app has impacted users from over 200 countries
                till date.
                <br />
              </span>
              <span class="text-neutral-900/70 text-base font-bold leading-normal">
                {" "}
                Company Info:
                <br />
              </span>
              <span class="text-neutral-900/70 text-base font-bold leading-normal">
                Address:{" "}
              </span>
              <span class="text-neutral-900/70 text-base font-normal leading-normal">
                Jayanagar, Bangalore, Karnataka, India
              </span>
            </div>
            <div className="self-stretch h-0 outline outline-2 outline-offset-[-1px] outline-stone-300" />
            <div className="inline-flex justify-start items-start gap-4">
              <img
                className="w-7 h-7 rounded-lg"
                src="https://placehold.co/28x28"
              />
              <img
                className="w-7 h-7 rounded-lg"
                src="https://placehold.co/28x28"
              />
              <img
                className="w-7 h-7 rounded-lg"
                src="https://placehold.co/28x28"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default JobDescription;
