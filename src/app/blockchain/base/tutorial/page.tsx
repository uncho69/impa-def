import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Base</SectionTitle>
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
                  Maiores, illum! Sequi ratione architecto consequatur neque
                  debitis possimus accusamus accusantium, eligendi deserunt
                  earum alias eos fugit omnis? Incidunt iste doloremque
                  explicabo!
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
