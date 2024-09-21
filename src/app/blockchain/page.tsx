import { Accordion } from "@/components/Accordion";

export default function Blockchain() {
  return (
    <>
      <div>herro wordo!</div>
      <Accordion
        className="bg-black/10"
        buttonText={"qualcosa sul button text"}
      >
        Contenuto accordion
      </Accordion>
      <Accordion buttonText={"qualcosa sul button text 2"}>
        Contenuto accordion 2
      </Accordion>
      <Accordion buttonText={"qualcosa sul button text 3"}>
        Contenuto accordion 3
      </Accordion>
    </>
  );
}
