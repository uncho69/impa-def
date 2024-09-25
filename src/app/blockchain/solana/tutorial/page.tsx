import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Solana</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={true}>
            <li>
              <strong>lorem</strong>
              <List>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis odit eum vel totam nisi ratione maxime ab fuga
                  doloremque voluptatum ipsum modi non corrupti, asperiores quos
                  vitae quas facilis. Eum!
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
