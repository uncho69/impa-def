import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Fantom</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <p className="pt-3 lg:pt-5">
            Ci sono diverse opzioni di bridging, ma queste sono, a mio parere,
            le tre migliori:
          </p>
          <br />
          <strong>Spostare fondi su Fantom</strong>
          <List ordered={false}>
            <li>Stargate</li>
            <li>Synapse</li>
            <li>Celer</li>
          </List>
          <p>
            Una volta che hai collegato il tuo wallet a una di queste tre
            opzioni, nella parte superiore, assicurati di selezionare
            &quot;Ethereum&quot; o &quot;BNB Chain&quot;, a seconda di dove hai
            acquistato i tuoi FTM. Poi, seleziona il token &quot;FTM&quot; nella
            sezione dei token. Nella parte inferiore, seleziona
            &quot;Fantom&quot; come chain di destinazione e &quot;FTM&quot; come
            token. Dopo aver fatto questo, approva la transazione nel tuo
            wallet, e i tuoi token dovrebbero arrivarti su Fantom entro pochi
            minuti.
          </p>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
