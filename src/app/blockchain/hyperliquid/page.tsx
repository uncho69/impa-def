import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Hyperliquid</h1>
          <p>
            Hyperliquid è un exchange decentralizzato (DEX) focalizzato sui
            perpetual futures, operante sulla blockchain Hyperliquid L1.
            Progettato per combinare le caratteristiche dei principali exchange
            centralizzati con i vantaggi della decentralizzazione, Hyperliquid
            offre un trading veloce, trasparente e a basso costo.
          </p>

          <Accordion buttonText="Caratteristiche Principali di Hyperliquid">
            <List ordered={true}>
              <li>
                <strong>Velocità e Efficienza:</strong>
                <List>
                  <li>
                    <strong>Performance Elevata:</strong> Hyperliquid L1 è in
                    grado di gestire fino a 20.000 ordini al secondo grazie alla
                    sua architettura ottimizzata e all&apos;uso del consenso
                    Tendermint.
                  </li>
                  <li>
                    <strong>Latenza Bassa:</strong> La latenza media è di circa
                    0.2 secondi, rendendo il trading quasi istantaneo.
                  </li>
                </List>
              </li>
              <li>
                <strong>Ordine e Liquidità On-Chain:</strong>
                <List>
                  <li>
                    <strong>Ordine On-Chain:</strong> Tutte le operazioni,
                    inclusi ordini, cancellazioni e liquidazioni, avvengono
                    on-chain, garantendo trasparenza e sicurezza.
                  </li>
                  <li>
                    <strong>Liquidità On-Chain:</strong> Supporta la gestione
                    della liquidità senza la necessità di interventi off-chain.
                  </li>
                </List>
              </li>
              <li>
                <strong>Struttura delle Commissioni:</strong>
                <List>
                  <li>
                    <strong>Commissioni Basse:</strong> Takers pagano 2.5 basis
                    points (bps), mentre i makers ricevono un rebate di 0.2 bps.
                    Questo rende le transazioni su Hyperliquid molto economiche.
                  </li>
                  <li>
                    <strong>Nessun Gas Fee:</strong> Durante la fase alpha, le
                    transazioni erano esenti da commissioni di gas, dimostrando
                    l&apos;impegno di Hyperliquid a ridurre i costi per gli
                    utenti.
                  </li>
                </List>
              </li>
              <li>
                <strong>Leva Flessibile:</strong>
                <List>
                  <li>
                    <strong>Incentivi:</strong> Gli utenti possono guadagnare
                    punti attraverso attività di trading, che saranno convertiti
                    in token di governance durante un futuro airdrop. Questo
                    programma incoraggia l&apos;uso attivo della piattaforma.
                  </li>
                </List>
              </li>
              <li>
                <strong>Programma di Punti e Airdrop:</strong>
                <List>
                  <li>
                    <strong>Incentivi:</strong> Gli utenti possono guadagnare
                    punti attraverso attività di trading, che saranno convertiti
                    in token di governance durante un futuro airdrop. Questo
                    programma incoraggia l&apos;uso attivo della piattaforma.
                  </li>
                </List>
              </li>
              <li>
                <strong>Funzionalità Avanzate di Trading:</strong>
                <List>
                  <li>
                    <strong>Ordini Avanzati:</strong> Supporta ordini complessi
                    come TWAP (Time-Weighted Average Price), scale trading e
                    ordini TP/SL (Take Profit/Stop Loss), consentendo strategie
                    di trading sofisticate.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="$PURR Token">
            <p>
              $PURR è il primo token nativo della blockchain{" "}
              <strong>Hyperliquid</strong> Layer 1. Lanciato come parte dello
              standard HIP-1, il token è stato introdotto senza una vendita
              iniziale o un’utilità pre-pianificata. Ha come obiettivo
              principale coinvolgere gli utenti nell&apos;ecosistema di
              Hyperliquid, una piattaforma ad alte prestazioni specializzata nel
              trading perpetuo di futures decentralizzati. La fornitura totale
              di <strong>1 miliardo di token PURR</strong> è fissa, con il 50%
              distribuito tramite airdrop ai partecipanti dell&apos;ecosistema e
              il restante 50% bloccato nel pool di liquidità per il trading. I
              possessori di $PURR potranno beneficiare di funzionalità future e
              meme token creati su Hyperliquid, incentivando la detenzione a
              lungo termine e la partecipazione all&apos;ecosistema
            </p>
          </Accordion>
        </div>
        <SectionTutorial
          video={
            "https://www.youtube.com/embed/L-SCdSfGztA?si=pzZeK1ktR8k-hzVo"
          }
          tutorialLink="./hyperliquid/tutorial"
        />
      </SectionBody>
    </MobileContainer>
  );
}
