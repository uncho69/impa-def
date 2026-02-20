import Image from "next/image";
import rightArrow from "@/assets/arrow-right-circled.svg";
import { ReactNode } from "react";
import { Accordion } from "./Accordion";
import Link from "next/link";

export function SectionTutorial({
  video,
  tutorialLink,
  faq,
  direction = "row",
}: {
  video?: string;
  tutorialLink?: string;
  faq?: { title: string; content: ReactNode }[];
  direction?: "row" | "column";
}) {
  return (
    <div
      className={`${
        direction === "column" ? "flex-col lg:min-w-[520px]" : ""
      } flex flex-wrap lg:flex-nowrap w-full gap-3 lg:gap-8 rounded-xl`}
    >
      {(video || tutorialLink) && (
        <div
          className={`flex flex-col lg:h-100 ${
            direction === "column" ? "" : "lg:basis-5/12"
          } w-full gap-3`}
        >
          {video && (
            <div className="bg-[#7571A3]/10 border border-[#C7EEE5] shadow-sm p-5 gap-5 flex flex-col rounded-md">
              <p className="font-bold text-center w-full">Tutorial Video</p>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  className="w-full lg:min-h-80 min-h-52"
                  src={video}
                  allow="clipboard-write; encrypted-media; picture-in-picture;"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          )}
          {tutorialLink && (
            <Link
              href={tutorialLink}
              className="bg-[#7571A3]/10 border border-[#C7EEE5] shadow-sm p-5 gap-5 flex justify-center items-center rounded-md"
            >
              <p className="font-bold">Tutorial Scritto</p>
              <Image src={rightArrow} alt="" className="justify-self-end" />
            </Link>
          )}
        </div>
      )}
      {faq?.length ? (
        <div
          className={`bg-[#7571A3]/10 border border-[#C7EEE5] ${
            direction === "column" ? "" : "lg:basis-7/12"
          } shadow-sm w-full p-5 lg:p-16 gap-5 flex flex-col rounded-md`}
        >
          <p className="font-bold">Domande Frequenti</p>
          {faq.map((item, i) => (
            <Accordion buttonText={item.title} key={`Accordion-${i}`}>
              {item.content}
            </Accordion>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
