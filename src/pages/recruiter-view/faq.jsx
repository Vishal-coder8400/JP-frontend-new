import Navbar from "../../components/recruiter-view/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExploreIcon } from "../../utils/icon";

const Faq = () => {
  return (
    <div className="flex flex-col w-full gap-[24px]">
      <Navbar onlySupport={false} />
      <div className="self-stretch p-11 bg-black relative bg-blend-soft-light rounded-2xl outline-1 outline-offset-[-1px] outline-zinc-700 inline-flex flex-col justify-start items-start gap-10 overflow-hidden">
        <div className="self-stretch text-center justify-start text-white text-5xl font-bold leading-[48px]">
          Help Center / FAQ
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          <div className="self-stretch justify-start text-white text-3xl font-bold leading-loose">
            Got Questions? We’ve Got Answers.
          </div>
          <div className="w-[673px] justify-start text-stone-300 text-base font-normal leading-snug">
            Welcome to our Help Center. Whether you’re here to land a dream job,
            post one, refer a friend, or build a training empire — we’ve made it
            easy to find the answers you need.
          </div>
        </div>
        <div className="px-5 py-2.5 bg-white rounded-lg inline-flex justify-center items-center gap-7.5">
          <div className="text-center justify-start text-neutral-800 text-sm font-semibold leading-tight">
            Explore Now
          </div>
          <div className="size-5 p-1.5 origin-top-left rotate-90 bg-neutral-800 rounded-[50px] flex justify-center items-center">
            <ExploreIcon />
          </div>
        </div>
      </div>
      <div className="self-stretch p-9 relative bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-center items-start gap-9 overflow-hidden">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-8">
          <div className="self-stretch justify-start text-black text-4xl font-semibold leading-9">
            Common Frequently Asked Question
          </div>
          <div className="self-stretch justify-start text-neutral-900/70 text-base font-normal leading-normal">
            You can return any item within 30 days of purchase as long as its in
            its original condition with tags still attached. Simply contact our
            customer service team, and they will guide you through the process.
            Please note that certain items, such as swimwear and final sale
            items, are non-returnable.
          </div>
        </div>
        <div className="max-w-[482px] w-full px-5 py-7 bg-slate-50 inline-flex flex-col justify-start items-start gap-7 overflow-hidden">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What payment methods do you accept for online purchases?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                We accept all major credit cards, PayPal, and Apple Pay for your
                convenience. Yes, once your order ships, you'll receive a
                tracking number via email. Yes, we have a rewards program where
                you can earn points for every purchase.
              </AccordionContent>
            </AccordionItem>{" "}
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What payment methods do you accept for online purchases?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                We accept all major credit cards, PayPal, and Apple Pay for your
                convenience. Yes, once your order ships, you'll receive a
                tracking number via email. Yes, we have a rewards program where
                you can earn points for every purchase.
              </AccordionContent>
            </AccordionItem>{" "}
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What payment methods do you accept for online purchases?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                We accept all major credit cards, PayPal, and Apple Pay for your
                convenience. Yes, once your order ships, you'll receive a
                tracking number via email. Yes, we have a rewards program where
                you can earn points for every purchase.
              </AccordionContent>
            </AccordionItem>{" "}
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What payment methods do you accept for online purchases?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                We accept all major credit cards, PayPal, and Apple Pay for your
                convenience. Yes, once your order ships, you'll receive a
                tracking number via email. Yes, we have a rewards program where
                you can earn points for every purchase.
              </AccordionContent>
            </AccordionItem>{" "}
            <AccordionItem value="item-5">
              <AccordionTrigger>
                What payment methods do you accept for online purchases?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                We accept all major credit cards, PayPal, and Apple Pay for your
                convenience. Yes, once your order ships, you'll receive a
                tracking number via email. Yes, we have a rewards program where
                you can earn points for every purchase.
              </AccordionContent>
            </AccordionItem>{" "}
            <AccordionItem value="item-6">
              <AccordionTrigger>
                What payment methods do you accept for online purchases?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                We accept all major credit cards, PayPal, and Apple Pay for your
                convenience. Yes, once your order ships, you'll receive a
                tracking number via email. Yes, we have a rewards program where
                you can earn points for every purchase.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
