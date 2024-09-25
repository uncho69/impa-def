import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Bitcoin</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={true}>
            <li>
              <strong>lorem</strong>
              <List>
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Minima repellat doloribus laborum. Sed vel in harum aliquid
                  nesciunt, perferendis culpa eum modi totam eaque enim eveniet
                  at inventore nam id.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
