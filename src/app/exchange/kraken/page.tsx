import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTutorial } from "@/components/SectionTutorial";
import { RichSectionTitle } from "@/components/RichSectionTitle";
// import Image from "next/image";
// import VideoImage from "@/assets/Video.png";
// import { Accordion } from "@/components/Accordion";
// import { List } from "@/components/List";

export default function Blockchain() {
  return (
    <div className="flex flex-col lg:gap-6 gap-2">
      <RichSectionTitle
       
        externalLink="https://www.kraken.com/"
        xPage="https://x.com/krakenfx"
      >
        Kraken
      </RichSectionTitle>
      <MobileContainer>
        <SectionBody>
          <p>
            Kraken è una delle più grandi e rispettate piattaforme di scambio di
            criptovalute a livello globale. Fondata nel 2011 da Jesse Powell,
            Kraken è diventata una scelta popolare per trader e investitori di
            criptovalute grazie alla sua sicurezza, affidabilità e varietà di
            servizi offerti.
          </p>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 lg:justify-between w-full">
            <div className="lg:text-xl">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                vitae laborum a dolorum quibusdam molestiae ipsam velit earum
                deserunt reiciendis. Dignissimos nihil beatae earum nobis,
                quidem quae reprehenderit illum! Suscipit.
              </p>
            </div>
            <SectionTutorial
              video={
                "https://www.youtube.com/embed/DQFUUjlGFkU?si=de5KjASE23Yr-gts"
              }
              tutorialLink="./tutorial"
              faq={[
                {
                  title: "domanda frequente 1",
                  content: "risposta frequente 1",
                },
              ]}
              direction="column"
            />
          </div>
        </SectionBody>
      </MobileContainer>
    </div>
  );
}
