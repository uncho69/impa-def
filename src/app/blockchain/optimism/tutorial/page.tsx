import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Optimism</SectionTitle>
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
                  Corporis qui commodi quo rerum necessitatibus atque explicabo
                  dolorum aut omnis enim, neque doloremque repellat natus
                  aperiam ipsa dolor porro ipsam praesentium!
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
