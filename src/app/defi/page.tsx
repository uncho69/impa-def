import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { PrivyProtectedRoute } from "@/components/PrivyProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { CardContainer } from "@/components/CardContainer";
import { SimpleCard } from "@/components/SimpleCard";
import Placeholder from "@/assets/placeholder.svg";
// import { SectionTutorial } from "@/components/SectionTutorial";
import { ExploreWeb3 } from "@/components/ExploreWeb3";

// Import icone delle DEX
import hyperliquidIcon from "@/assets/hyperliquid-icon.png";
import uniswapIcon from "@/assets/uniswap-icon.png";
import orbiterIcon from "@/assets/orbiterfinance-icon.png";
import jumperIcon from "@/assets/placeholder.svg";
import camelotIcon from "@/assets/placeholder.svg";
import curveIcon from "@/assets/placeholder.svg";
import raydiumIcon from "@/assets/placeholder.svg";
import jupiterIcon from "@/assets/placeholder.svg";
import balancerIcon from "@/assets/placeholder.svg";
import syncswapIcon from "@/assets/placeholder.svg";
import stargateIcon from "@/assets/placeholder.svg";
import debridgeIcon from "@/assets/placeholder.svg";
import layerzeroIcon from "@/assets/placeholder.svg";
import yearnIcon from "@/assets/placeholder.svg";
import compoundIcon from "@/assets/placeholder.svg";
import lidoIcon from "@/assets/placeholder.svg";

export default function Defi() {
  return (
    <PrivyProtectedRoute title="DeFi">
      <PageTitle description="La finanza decentralizzata aperta a tutti, senza intermediari">
        DeFi
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          La finanza decentralizzata, o DeFi, è un sistema finanziario che
          funziona su blockchain, principalmente grazie agli smart-contract e
          quindi su Ethereum e le sue Layer2. A differenza del sistema finanziario
          tradizionale, DeFi è aperto a tutti e non richiede intermediari come
          banche o broker. I prodotti DeFi permettono agli utenti di prestare o
          prendere in prestito fondi, guadagnare interessi, fare trading di asset
          digitali e assicurarsi contro i rischi, il tutto in modo trasparente e
          senza un ente centrale.
          <Accordion buttonText={"Caratteristiche Principali della DeFi"}>
            <List ordered={true}>
              <li>
                <strong>Decentralizzazione</strong>: Le applicazioni DeFi operano
                su blockchain, il che significa che non esiste un singolo punto di
                controllo. Le decisioni e le operazioni sono gestite da smart
                contract e una rete distribuita di nodi.
              </li>
              <li>
                <strong>Trasparenza</strong>: Tutte le transazioni e i contratti
                sono pubblicamente visibili sulla blockchain. Questo aumenta la
                trasparenza e permette agli utenti di verificare in qualsiasi
                momento le attività e le operazioni.
              </li>
              <li>
                <strong>Accessibilità</strong>: Chiunque abbia una connessione
                internet può accedere ai servizi DeFi. Non ci sono barriere
                geografiche o requisiti di accesso rigidi.
              </li>
              <li>
                <strong>Interoperabilità</strong>: Molte applicazioni DeFi sono
                progettate per essere compatibili tra loro, permettendo agli
                utenti di combinare diversi servizi e creare soluzioni finanziarie
                personalizzate.
              </li>
            </List>
          </Accordion>
          <Accordion buttonText={"Principali Componenti della DeFi"}>
            <List ordered={true}>
              <li>
                <strong>Exchange Decentralizzati (DEX)</strong>: Piattaforme che
                permettono agli utenti di scambiare criptovalute direttamente tra
                loro senza intermediari. I DEX utilizzano pool di liquidità
                forniti dagli utenti stessi per facilitare le transazioni. Si
                possono depositare i propri token nelle pool di liquidità (LP) e
                guadagnare una percentuale delle commissioni (trading fee)
                applicate agli utenti sugli swap.
              </li>
              <li>
                <strong>Lending e Borrowing</strong>: Sono piattaforme di prestiti
                che permettono agli utenti di depositare i loro token e guadagnare
                un rendimento in base ai tassi d&apos;interesse pagati dall&apos;exchange,
                che provengono da chi li prende in prestito e paga un interesse
                più alto. Si possono quindi prestare le proprie criptovalute e
                guadagnare interessi, o prendere in prestito criptovalute offrendo
                altre criptovalute come garanzia (collaterale).
              </li>
              <li>
                <strong>Stablecoin</strong>: Criptovalute ancorate al valore di
                una valuta fiat (come il dollaro USA) che offrono stabilità nei
                mercati volatili delle criptovalute. Esempi includono USDC, DAI,
                LUSD e Tether (USDT).
              </li>
              <li>
                <strong>Yield Farming e Staking</strong>: Metodi per guadagnare
                ricompense aggiuntive bloccando o &quot;staking&quot; le proprie
                criptovalute in smart contract. Questi meccanismi incentivano la
                fornitura di liquidità e la partecipazione alla rete.
              </li>
              <li>
                <strong>Assicurazioni Decentralizzate</strong>: Piattaforme come
                Nexus Mutual offrono coperture assicurative per vari rischi, come
                la vulnerabilità degli smart contract, tramite un sistema gestito
                dalla comunità.
              </li>
            </List>
          </Accordion>
          <Accordion buttonText={"Vantaggi della DeFi"}>
            <List>
              <li>
                <strong>Autonomia Finanziaria</strong>: Gli utenti hanno il pieno
                controllo dei propri fondi senza dover dipendere da intermediari.
              </li>
              <li>
                <strong>Riduzione dei Costi</strong>: L&apos;eliminazione degli
                intermediari riduce significativamente le commissioni e i costi
                delle transazioni.
              </li>
              <li>
                <strong>Sovranità Monetaria (indipendenza finanziaria)</strong>:
                Gli asset (token) posseduti nei portafogli (wallet) non-custodial
                sono al sicuro da qualsiasi confisca esterna, protetti dalla
                chiave privata.
              </li>
              <li>
                <strong>Innovazione Rapida:</strong> L&apos;ambiente aperto e
                collaborativo favorisce lo sviluppo e l&apos;implementazione
                rapida di nuove idee e tecnologie.
              </li>
            </List>
          </Accordion>
          <Accordion buttonText={"Sfide e Rischi della DeFi"}>
            <List>
              <li>
                <strong>Sicurezza</strong>: Gli smart contract possono essere
                vulnerabili agli attacchi informatici. È importante verificare
                l&apos;affidabilità dei progetti e dei loro audit di sicurezza.
              </li>
              <li>
                <strong>Regolamentazione</strong>: La mancanza di un quadro
                normativo chiaro può rappresentare un rischio per gli utenti e le
                piattaforme.
              </li>
              <li>
                <strong>Volatilità</strong>: Le criptovalute sono soggette a forti
                oscillazioni di prezzo, che possono influenzare le operazioni di
                prestito e investimento.
              </li>
            </List>
          </Accordion>
        </SectionBody>
        <SectionTitle>Applicazioni DeFi</SectionTitle>
        <SectionBody>
          <strong>Exchange Decentralizzate (DEX)</strong>
          <Accordion buttonText="Cosa sono" defaultOpen={true}>
            Le exchange decentralizzate (o DEX, dall&apos;inglese Decentralized
            Exchange) sono piattaforme che permettono di scambiare criptovalute
            direttamente tra utenti senza intermediari centrali come le banche o
            le borse valori tradizionali. A differenza degli exchange
            centralizzati (come Binance o Coinbase), che custodiscono i fondi
            degli utenti e gestiscono le transazioni attraverso server controllati
            dall&apos;azienda, le DEX operano su una rete blockchain utilizzando
            smart contract, eliminando così la necessità di fidarsi di una terza
            parte. Un DEX permette agli utenti di mantenere il pieno controllo dei
            loro fondi, che vengono conservati nei loro wallet personali fino a
            quando non vengono eseguite le transazioni. Gli scambi avvengono in
            maniera peer-to-peer (P2P), cioè direttamente tra le persone, e ogni
            transazione viene registrata sulla blockchain, garantendo trasparenza
            e sicurezza. Un esempio noto di exchange decentralizzato è Uniswap,
            che utilizza il protocollo di Ethereum per consentire il trading di
            criptovalute senza un&apos;autorità centrale che supervisioni le
            operazioni. Grazie ai DEX, gli utenti possono scambiare asset digitali
            in maniera autonoma e anonima, senza il rischio di perdere i fondi a
            causa di attacchi informatici a piattaforme centralizzate o decisioni
            arbitrarie di queste ultime.
            <br />
            <br />
            <CardContainer>
              <SimpleCard
                title={"Hyperliquid"}
                icon={hyperliquidIcon}
                subArray={[
                  { icon: Placeholder, text: "Hyperliquid L1" },
                  { icon: Placeholder, text: "Perpetuals" }
                ]}
                subArrayTitle="Reti"
                externalLink="https://app.hyperliquid.xyz/"
                xPage="https://x.com/HyperliquidX"
                href="/defi/hyperliquid"
              />
              <SimpleCard
                title={"Uniswap"}
                icon={uniswapIcon}
                subArray={[
                  { icon: Placeholder, text: "Ethereum" },
                  { icon: Placeholder, text: "Arbitrum" },
                  { icon: Placeholder, text: "Optimism" },
                  { icon: Placeholder, text: "Polygon" },
                  { icon: Placeholder, text: "Base" }
                ]}
                subArrayTitle="Reti"
                externalLink="https://app.uniswap.org/swap"
                xPage="https://x.com/Uniswap"
                href="/defi/uniswap"
              />
              <SimpleCard
                title={"Orbiter Finance"}
                icon={orbiterIcon}
                subArray={[
                  { icon: Placeholder, text: "Ethereum" },
                  { icon: Placeholder, text: "Arbitrum" },
                  { icon: Placeholder, text: "Optimism" },
                  { icon: Placeholder, text: "zkSync" }
                ]}
                subArrayTitle="Reti"
                externalLink="https://www.orbiter.finance/"
                xPage="https://x.com/Orbiter_Finance"
                href="/defi/orbiter"
              />
              <SimpleCard
                title={"Jumper"}
                icon={jumperIcon}
                subArray={[
                  { icon: Placeholder, text: "Multi-Chain" },
                  { icon: Placeholder, text: "Bridge" },
                  { icon: Placeholder, text: "Swap" }
                ]}
                subArrayTitle="Tipo"
                externalLink="https://jumper.exchange/"
                xPage="https://x.com/JumperExchange"
                href="/defi/jumper"
              />
              <SimpleCard
                title={"Stargate"}
                icon={stargateIcon}
                subArray={[
                  { icon: Placeholder, text: "Ethereum" },
                  { icon: Placeholder, text: "Arbitrum" },
                  { icon: Placeholder, text: "Optimism" },
                  { icon: Placeholder, text: "Polygon" }
                ]}
                subArrayTitle="Reti"
                externalLink="https://stargate.finance/"
                xPage="https://x.com/StargateFinance"
                href="/defi/stargate"
              />
              <SimpleCard
                title={"deBridge"}
                icon={debridgeIcon}
                subArray={[
                  { icon: Placeholder, text: "Cross-Chain" },
                  { icon: Placeholder, text: "Bridge" }
                ]}
                subArrayTitle="Tipo"
                externalLink="https://debridge.finance/"
                xPage="https://x.com/deBridgeFinance"
                href="/defi/debridge"
              />
              <SimpleCard
                title={"Camelot"}
                icon={camelotIcon}
                subArray={[
                  { icon: Placeholder, text: "Arbitrum" },
                  { icon: Placeholder, text: "Sanko" },
                  { icon: Placeholder, text: "XAI" }
                ]}
                subArrayTitle="Reti"
                externalLink="https://app.camelot.exchange/"
                xPage="https://x.com/CamelotDEX"
                href="/defi/camelot"
              />
              <SimpleCard
                title={"Curve"}
                icon={curveIcon}
                subArray={[
                  { icon: Placeholder, text: "Ethereum" },
                  { icon: Placeholder, text: "Arbitrum" },
                  { icon: Placeholder, text: "Optimism" },
                  { icon: Placeholder, text: "Polygon" }
                ]}
                subArrayTitle="Reti"
                externalLink="https://curve.fi/"
                xPage="https://x.com/CurveFinance"
                href="/defi/curve"
              />
              <SimpleCard
                title={"Jupiter"}
                icon={jupiterIcon}
                subArray={[
                  { icon: Placeholder, text: "Solana" }
                ]}
                subArrayTitle="Reti"
                externalLink="https://jup.ag/"
                xPage="https://x.com/JupiterExchange"
                href="/defi/jupiter"
              />
              <SimpleCard
                title={"Raydium"}
                icon={raydiumIcon}
                subArray={[
                  { icon: Placeholder, text: "Solana" }
                ]}
                subArrayTitle="Reti"
                externalLink="https://raydium.io/"
                xPage="https://x.com/RaydiumProtocol"
                href="/defi/raydium"
              />
              <SimpleCard
                title={"Balancer"}
                icon={balancerIcon}
                subArray={[
                  { icon: Placeholder, text: "Ethereum" },
                  { icon: Placeholder, text: "Arbitrum" },
                  { icon: Placeholder, text: "Polygon" }
                ]}
                subArrayTitle="Reti"
                externalLink="https://balancer.fi/"
                xPage="https://x.com/Balancer"
                href="/defi/balancer"
              />
              <SimpleCard
                title={"SyncSwap"}
                icon={syncswapIcon}
                subArray={[
                  { icon: Placeholder, text: "zkSync" },
                  { icon: Placeholder, text: "Linea" },
                  { icon: Placeholder, text: "Scroll" }
                ]}
                subArrayTitle="Reti"
                externalLink="https://syncswap.xyz/"
                xPage="https://twitter.com/syncswap"
                href="/defi/syncswap"
              />
              <SimpleCard
                title={"Yearn Finance"}
                icon={yearnIcon}
                subArray={[
                  { icon: Placeholder, text: "Ethereum" },
                  { icon: Placeholder, text: "Yield Farming" }
                ]}
                subArrayTitle="Tipo"
                externalLink="https://yearn.fi/"
                xPage="https://x.com/yearnfi"
                href="/defi/yearn"
              />
              <SimpleCard
                title={"Compound"}
                icon={compoundIcon}
                subArray={[
                  { icon: Placeholder, text: "Ethereum" },
                  { icon: Placeholder, text: "Lending" }
                ]}
                subArrayTitle="Tipo"
                externalLink="https://compound.finance/"
                xPage="https://x.com/compoundfinance"
                href="/defi/compound"
              />
              <SimpleCard
                title={"Lido Finance"}
                icon={lidoIcon}
                subArray={[
                  { icon: Placeholder, text: "Ethereum" },
                  { icon: Placeholder, text: "Staking" }
                ]}
                subArrayTitle="Tipo"
                externalLink="https://lido.fi/"
                xPage="https://x.com/LidoFinance"
                href="/defi/lido"
              />
              <SimpleCard
                title={"LayerZero"}
                icon={layerzeroIcon}
                subArray={[
                  { icon: Placeholder, text: "Omnichain" },
                  { icon: Placeholder, text: "Protocol" }
                ]}
                subArrayTitle="Tipo"
                externalLink="https://layerzero.network/"
                xPage="https://x.com/LayerZero_Labs"
                href="/defi/layerzero"
              />
            </CardContainer>
          </Accordion>
          <h2 className="text-3xl font-bold gradient-text mb-6 mt-8">Prestiti e Rendimenti</h2>
          <Accordion buttonText="Cosa sono" defaultOpen={true}>
            Le piattaforme decentralizzate di prestiti e rendimenti permettono
            agli utenti di prestare o prendere in prestito criptovalute in modo
            automatico, senza intermediari come banche o istituzioni finanziarie
            tradizionali.
          </Accordion>
          <Accordion buttonText="Prestiti">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
            minus vitae consequuntur maiores, eum doloribus aspernatur, possimus
            error, hic fugit culpa! Quaerat nam, reprehenderit praesentium
            officiis harum soluta id iusto.
            <CardContainer>
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
            </CardContainer>
          </Accordion>
          <Accordion buttonText="Rendimenti">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
            voluptatibus, dicta odio dolore alias expedita deleniti, vel ex dolor,
            impedit ut quasi delectus voluptas magni nihil quis modi earum
            consectetur?
            <CardContainer>
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
            </CardContainer>
          </Accordion>
          <Accordion buttonText="Bridge">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
            quasi, dolor possimus dignissimos expedita corporis officiis
            doloremque iusto! Molestiae voluptatibus, qui inventore totam nesciunt
            quia iste architecto non aspernatur eos.
            <CardContainer>
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[{ icon: Placeholder, text: "" }]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
            </CardContainer>
          </Accordion>
        </SectionBody>
        
        <ExploreWeb3 />
      </MobileContainer>
    </PrivyProtectedRoute>
  );
}
