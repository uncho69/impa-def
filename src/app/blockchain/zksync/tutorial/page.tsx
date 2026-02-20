import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>zkSync</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={true}>
            <li>
              <strong>lorem</strong>
              <List>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
                  debitis voluptas nostrum aspernatur, ipsa ducimus
                  reprehenderit deserunt dolores quia nobis mollitia nulla eaque
                  consectetur doloremque facere! Iusto modi maiores est.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
