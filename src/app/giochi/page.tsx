import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { CardContainer } from "@/components/CardContainer";
import { SimpleCard } from "@/components/SimpleCard";
import { ExploreWeb3 } from "@/components/ExploreWeb3";

// Import delle icone reali dei giochi
import axieIcon from "@/assets/axie-icon.png";
import decentralandIcon from "@/assets/decentraland-icon.png";
import sandboxIcon from "@/assets/sandbox-icon.png";

// Import delle icone
import polymarketIcon from "@/assets/polymarket-logo.png";

export default function Giochi() {
  return (
    <ProtectedRoute title="Giochi & Mercati di Predizione">
      <PageTitle description="L'intersezione tra gaming e finanza decentralizzata">
        Giochi & Mercati di Predizione
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div className="space-y-8">
            {/* Sezione Giochi Web3 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-3">Giochi Web3</h2>
              
              <p className="text-neutral-700">
                Esistono diverse piattaforme ed ecosistemi di giochi Web3, molti di cui sono Play-to-Earn, 
                ovvero permettono all'utente di guadagnare giocando al loro gioco.
              </p>

              <Accordion buttonText={"Lista Giochi Web3"}>
                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-neutral-900">Giochi di Strategia</h4>
                      <List>
                        <li>Axie Infinity</li>
                        <li>Gods Unchained</li>
                        <li>Splinterlands</li>
                      </List>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-neutral-900">Giochi di Ruolo</h4>
                      <List>
                        <li>The Sandbox</li>
                        <li>Decentraland</li>
                        <li>Illuvium</li>
                      </List>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-neutral-900">Giochi di Carte</h4>
                      <List>
                        <li>Gods Unchained</li>
                        <li>Splinterlands</li>
                        <li>Skyweaver</li>
                      </List>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-neutral-900">Giochi di Corse</h4>
                      <List>
                        <li>F1 Delta Time</li>
                        <li>REVV Racing</li>
                        <li>MotoGP Ignition</li>
                      </List>
                    </div>
                  </div>
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

              <Accordion buttonText={"Vantaggi dei Giochi Web3"}>
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

              {/* Piattaforme Giochi */}
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h3 className="font-semibold mb-4">Piattaforme Giochi</h3>
                <CardContainer>
                  {[
                    { title: "Axie Infinity", href: "/giochi/axie-infinity", external: "https://axieinfinity.com/", icon: axieIcon, xProfile: "https://x.com/axieinfinity" },
                    { title: "The Sandbox", href: "/giochi/the-sandbox", external: "https://www.sandbox.game/", icon: sandboxIcon, xProfile: "https://x.com/thesandboxgame" },
                    { title: "Decentraland", href: "/giochi/decentraland", external: "https://decentraland.org/", icon: decentralandIcon, xProfile: "https://x.com/decentraland" },
                  ].map((p) => (
                    <SimpleCard key={p.title} title={p.title} href={p.href} externalLink={p.external} icon={p.icon} xProfile={p.xProfile} />
                  ))}
                </CardContainer>
              </div>

            </div>

            {/* Sezione Mercati di Predizione */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">Mercati di Predizione</h2>
              
              <p className="text-neutral-700">
                Le piattaforme di scommesse decentralizzate offrono una alta varietà di cose su cui si può 
                scommettere usando le proprie criptovalute, come potrete vedere accedendo a{" "}
                <a href="https://polymarket.com" target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800 underline font-semibold">
                  Polymarket
                </a>
                , la principale piattaforma di scommesse Web3.
              </p>


              <Accordion buttonText={"Come funzionano i Mercati di Predizione"}>
                <div className="p-5">
                  <List>
                    <li>
                      <b>Creazione di mercati</b>: gli utenti possono creare mercati su eventi futuri
                    </li>
                    <li>
                      <b>Trading di posizioni</b>: acquisto e vendita di posizioni "Sì" o "No"
                    </li>
                    <li>
                      <b>Liquidazione automatica</b>: i mercati si chiudono automaticamente alla scadenza
                    </li>
                    <li>
                      <b>Pagamento dei profitti</b>: i vincitori ricevono i loro guadagni automaticamente
                    </li>
                  </List>
                </div>
              </Accordion>

              <Accordion buttonText={"Vantaggi dei Mercati di Predizione"}>
                <div className="p-5">
                  <List>
                    <li>
                      <b>Trasparenza</b>: tutte le scommesse sono pubbliche e verificabili
                    </li>
                    <li>
                      <b>Decentralizzazione</b>: nessun intermediario controlla i mercati
                    </li>
                    <li>
                      <b>Accessibilità globale</b>: accesso da qualsiasi parte del mondo
                    </li>
                    <li>
                      <b>Liquidità</b>: mercati sempre attivi e liquidi
                    </li>
                  </List>
                </div>
              </Accordion>

              {/* App per Scommesse */}
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h3 className="font-semibold mb-4">App per Scommesse</h3>
                <CardContainer>
                  {[
                    { title: "Polymarket", href: "/giochi/polymarket", external: "https://polymarket.com/", icon: polymarketIcon, xProfile: "https://x.com/Polymarket" },
                    { title: "Kalshi", href: "/giochi/kalshi", external: "https://kalshi.com/", xProfile: "https://x.com/kalshi" }
                  ].map((p) => (
                    <SimpleCard key={p.title} title={p.title} href={p.href} externalLink={p.external} icon={p.icon} xProfile={p.xProfile} />
                  ))}
                </CardContainer>
              </div>
            </div>



            
          </div>
        </SectionBody>
        <ExploreWeb3 />
      </MobileContainer>
    </ProtectedRoute>
  );
}
