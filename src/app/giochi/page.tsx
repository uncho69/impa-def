import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { CardContainer } from "@/components/CardContainer";
import { SimpleCard } from "@/components/SimpleCard";

// Import delle icone reali dei giochi
import axieIcon from "@/assets/axie-icon.png";
import bigtimeIcon from "@/assets/bigtime-icon.png";
import decentralandIcon from "@/assets/decentraland-icon.png";
import illuviumIcon from "@/assets/illuvium-icon.png";
import sandboxIcon from "@/assets/sandbox-icon.png";

export default function Giochi() {
  return (
    <ProtectedRoute title="GameFi">
      <MobileContainer>
        <SectionTitle main={true}>GameFi</SectionTitle>
        <SectionBody>
          <div className="space-y-6">
            <p className="text-neutral-700">
              <b>GameFi</b> (Gaming + DeFi) è un nuovo paradigma che combina i giochi
              tradizionali con elementi di finanza decentralizzata. I giocatori possono
              guadagnare ricompense reali attraverso il gameplay, possedere asset digitali
              unici e partecipare a economie virtuali basate su blockchain.
            </p>

            <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
              <h3 className="font-semibold mb-3">Caratteristiche principali</h3>
              <List>
                <li>
                  <b>Play-to-Earn</b>: i giocatori guadagnano token e NFT giocando
                </li>
                <li>
                  <b>Proprietà reale</b>: gli asset in-game sono posseduti dai giocatori
                </li>
                <li>
                  <b>Economia decentralizzata</b>: mercati peer-to-peer per asset digitali
                </li>
                <li>
                  <b>Interoperabilità</b>: asset utilizzabili tra diversi giochi
                </li>
              </List>
            </div>

            <Accordion buttonText={"Tipi di giochi GameFi"}>
              <div className="p-5">
                <List>
                  <li>
                    <b>Giochi di strategia</b>: Axie Infinity, Gods Unchained
                  </li>
                  <li>
                    <b>Giochi di ruolo</b>: Illuvium, Big Time
                  </li>
                  <li>
                    <b>Giochi di simulazione</b>: The Sandbox, Decentraland
                  </li>
                  <li>
                    <b>Giochi di carte</b>: Splinterlands, Gods Unchained
                  </li>
                  <li>
                    <b>Giochi di corse</b>: F1 Delta Time, REVV Racing
                  </li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText={"Come funziona il Play-to-Earn"}>
              <div className="p-5">
                <List>
                  <li>
                    <b>Acquisto di asset iniziali</b>: NFT, token o personaggi per iniziare
                  </li>
                  <li>
                    <b>Gameplay</b>: completamento di missioni, battaglie, costruzioni
                  </li>
                  <li>
                    <b>Ricompense</b>: guadagno di token, NFT o altri asset digitali
                  </li>
                  <li>
                    <b>Vendita</b>: possibilità di vendere asset su marketplace
                  </li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText={"Vantaggi del GameFi"}>
              <div className="p-5">
                <List>
                  <li>
                    <b>Reddito passivo</b>: possibilità di guadagnare giocando
                  </li>
                  <li>
                    <b>Proprietà reale</b>: gli asset appartengono realmente ai giocatori
                  </li>
                  <li>
                    <b>Trasparenza</b>: tutte le transazioni sono visibili sulla blockchain
                  </li>
                  <li>
                    <b>Interoperabilità</b>: asset utilizzabili in diversi giochi
                  </li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText={"Rischi e considerazioni"}>
              <div className="p-5">
                <List>
                  <li>
                    <b>Volatilità</b>: i prezzi degli asset possono variare significativamente
                  </li>
                  <li>
                    <b>Regolamentazione</b>: incertezza normativa in molti paesi
                  </li>
                  <li>
                    <b>Scam e progetti fake</b>: attenzione ai progetti non verificati
                  </li>
                  <li>
                    <b>Dipendenze</b>: rischio di dipendenza dal gioco per il reddito
                  </li>
                </List>
              </div>
            </Accordion>

            {/* Piattaforme GameFi principali */}
            <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
              <h3 className="font-semibold mb-4">Piattaforme GameFi principali</h3>
              <CardContainer>
                {[
                  { title: "Axie Infinity", external: "https://axieinfinity.com/", icon: axieIcon },
                  { title: "The Sandbox", external: "https://www.sandbox.game/", icon: sandboxIcon },
                  { title: "Decentraland", external: "https://decentraland.org/", icon: decentralandIcon },
                  { title: "Illuvium", external: "https://illuvium.io/", icon: illuviumIcon },
                  { title: "Big Time", external: "https://bigtime.gg/", icon: bigtimeIcon },
                ].map((p) => (
                  <SimpleCard key={p.title} title={p.title} href="#" externalLink={p.external} icon={p.icon} />
                ))}
              </CardContainer>
            </div>

            {/* Marketplace per asset GameFi */}
            <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
              <h3 className="font-semibold mb-4">Marketplace per asset GameFi</h3>
              <CardContainer>
                {[
                  { title: "OpenSea", external: "https://opensea.io/" },
                  { title: "Magic Eden", external: "https://magiceden.io/" },
                  { title: "Blur", external: "https://blur.io/" },
                  { title: "X2Y2", external: "https://x2y2.io/" },
                  { title: "LooksRare", external: "https://looksrare.org/" },
                ].map((p) => (
                  <SimpleCard key={p.title} title={p.title} href="#" externalLink={p.external} />
                ))}
              </CardContainer>
            </div>

            <div className="mt-2 p-6 bg-white rounded-xl shadow-sm">
              <p className="text-lg text-neutral-700 mb-3">
                Prima di iniziare con GameFi, assicurati di conoscere le basi:
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/blockchain" className="btn btn-outline">
                  Blockchain
                </a>
                <a href="/defi" className="btn btn-outline">
                  DeFi
                </a>
                <a href="/nft" className="btn btn-outline">
                  NFTs
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
