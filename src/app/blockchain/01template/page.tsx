import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">blockchain</h1>
          <p>text</p>
          <br />
          <p>text</p>
          <Accordion buttonText="Introduzione ad Ethereum">
            <List>
              <li></li>
            </List>
          </Accordion>
        </div>
        <SectionTutorial
          video={
            "https://www.youtube.com/embed/DQFUUjlGFkU?si=de5KjASE23Yr-gts"
          }
          tutorialLink="./tutorial"
          faq={[
            { title: "domanda frequente 1", content: "risposta frequente 1" },
          ]}
        />
      </SectionBody>
    </MobileContainer>
  );
}
