import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>Berachain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={true}>
            <li>
              <strong>lorem</strong>
              <List>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laborum ea voluptates illum earum nam. Aliquid enim amet
                  fugiat iure ipsum eligendi, doloremque in asperiores ad
                  placeat aperiam hic consequuntur itaque.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
