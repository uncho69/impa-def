import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { ClerkProtectedRoute } from "@/components/ClerkProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
// import { Button } from "@/components/Button";
import { CardContainer } from "@/components/CardContainer";
import { SimpleCard } from "@/components/SimpleCard";
import { ExploreWeb3 } from "@/components/ExploreWeb3";

// Import delle icone dei marketplace NFT
import openseaIcon from "@/assets/opensea-icon.png";
import blurIcon from "@/assets/blur-icon.png";
import magicedenIcon from "@/assets/magiceden-icon.png";

// Import delle icone delle collezioni NFT popolari
import cpunksIcon from "@/assets/cpunks-icon.png";
import miladyIcon from "@/assets/milady-icon.png";
import pudgypenguinsIcon from "@/assets/pudgypenguins-icon.png";
import remilioIcon from "@/assets/remilio-icon.png";
import tubbycatsIcon from "@/assets/tubbycats-icon.png";

export default function NFT() {
  return (
    <ClerkProtectedRoute title="NFTs">
      <PageTitle description="Scopri il mondo dei token non fungibili e le loro applicazioni">
        NFTs
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div className="space-y-6">
            <p className="text-neutral-700">
              Gli <b>NFT</b> (Non-Fungible Token) sono un tipo di asset digitale
              unico che utilizza la tecnologia blockchain per rappresentare la
              propriet&agrave; o la prova di autenticit&agrave; di un oggetto specifico. A
              differenza delle criptovalute tradizionali, che sono fungibili e
              intercambiabili, gli NFT sono distinti e non intercambiabili, e si
              prestano bene per arte digitale, collezionabili, musica, video e
              altri contenuti esclusivi.
            </p>

            <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
              <h3 className="font-semibold mb-3">Caratteristiche principali</h3>
              <List>
                <li>
                  <b>Unicit&agrave;</b>: ogni NFT &egrave; unico o parte di una quantit&agrave;
                  limitata. Due NFT non sono mai identici.
                </li>
                <li>
                  <b>Propriet&agrave;</b>: la blockchain registra il possesso; quando
                  acquisti un NFT ottieni una prova verificabile di propriet&agrave;.
                </li>
                <li>
                  <b>Immutabilit&agrave;</b>: una volta registrato su blockchain, un NFT
                  non pu&ograve; essere modificato o duplicato.
                </li>
                <li>
                  <b>Interoperabilit&agrave;</b>: trasferibili tra piattaforme che
                  supportano gli standard (es. ERC-721/1155 su Ethereum).
                </li>
              </List>
            </div>

            <Accordion buttonText={"Utilizzi comuni degli NFT"}>
              <div className="p-5">
                <List>
                  <li>
                    <b>Arte Digitale</b>: opere vendute su piattaforme come OpenSea,
                    Rarible e Foundation.
                  </li>
                  <li>
                    <b>Collezionabili</b>: carte, giochi e memorabilia (es. CryptoPunks,
                    NBA Top Shot).
                  </li>
                  <li>
                    <b>Giochi</b>: oggetti unici in-game (armi, skin, terreni).
                  </li>
                  <li>
                    <b>Musica e Media</b>: opere originali e accessi esclusivi.
                  </li>
                  <li>
                    <b>Propriet&agrave; virtuale</b>: terreni e spazi in mondi come
                    Decentraland e The Sandbox.
                  </li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText={"Come funzionano"}>
              <div className="p-5">
                <List>
                  <li>
                    <b>Creazione (minting)</b>: registrazione del token su
                    blockchain e collegamento al contenuto che rappresenta.
                  </li>
                  <li>
                    <b>Acquisto e vendita</b>: su marketplace specializzati;
                    possibile comprare, fare offerte o partecipare ad aste.
                  </li>
                  <li>
                    <b>Portafogli digitali</b>: conservati in wallet compatibili
                    (es. MetaMask, Trust Wallet, Ledger).
                  </li>
                  <li>
                    <b>Prove di propriet&agrave;</b>: verificabili pubblicamente sulla
                    blockchain.
                  </li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText={"Ethereum Name Service (ENS) NFTs"}>
              <p className="p-5">
                <b>ENS</b> &egrave; un protocollo su Ethereum che assegna nomi leggibili
                all&apos;uomo a indirizzi e contenuti decentralizzati. Ogni dominio ENS
                &egrave; rappresentato come NFT: la propriet&agrave; &egrave; unica e trasferibile,
                con possibilit&agrave; di rinnovo periodico.
              </p>
            </Accordion>

            <Accordion buttonText={"Marketplace principali"}>
              <div className="p-5 space-y-3">
                <p>
                  Gli NFT si comprano e vendono su marketplace specializzati.
                  Esempi:
                </p>
                <List>
                  <li>OpenSea</li>
                  <li>Rarible</li>
                  <li>SuperRare</li>
                  <li>Magic Eden</li>
                  <li>Blur</li>
                </List>
                <p className="text-neutral-700">
                  Verifica sempre la <b>collezione ufficiale</b> e l&apos;indirizzo del
                  contratto. Attenzione a link, bot e siti fake.
                </p>
              </div>
            </Accordion>

            {/* Piattaforme per comprare/vendere/creare NFT (da Notion: view) */}
            <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
              <h3 className="font-semibold mb-4">Piattaforme NFT</h3>
              <CardContainer>
                {[
                  { title: "OpenSea", external: "https://opensea.io/", icon: openseaIcon },
                  { title: "Blur", external: "https://blur.io/", icon: blurIcon },
                  { title: "Magic Eden", external: "https://magiceden.io/", icon: magicedenIcon },
                  { title: "SuperRare", external: "https://superrare.com/" },
                  { title: "Zora", external: "https://zora.co/" },
                ].map((p) => (
                  <SimpleCard key={p.title} title={p.title} href="#" externalLink={p.external} icon={p.icon} />
                ))}
              </CardContainer>
            </div>

            {/* Lista Collezioni NFT (da Notion: view) */}
            <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
              <h3 className="font-semibold mb-4">Collezioni NFT popolari</h3>
              <CardContainer>
                {[
                  { title: "CryptoPunks", external: "https://www.larvalabs.com/cryptopunks", icon: cpunksIcon },
                  { title: "Milady", external: "https://miladymaker.net/", icon: miladyIcon },
                  { title: "Pudgy Penguins", external: "https://www.pudgypenguins.com/", icon: pudgypenguinsIcon },
                  { title: "Redacted Remilio Babies", external: "https://remilio.org/", icon: remilioIcon },
                  { title: "Tubby Cats", external: "https://tubbycats.xyz/", icon: tubbycatsIcon },
                ].map((c) => (
                  <SimpleCard key={c.title} title={c.title} href="#" externalLink={c.external} icon={c.icon} />
                ))}
              </CardContainer>
            </div>

            
          </div>
        </SectionBody>
        <ExploreWeb3 />
      </MobileContainer>
    </ClerkProtectedRoute>
  );
}