import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Manuale A-Z</SectionTitle>
      <SectionBody>
        <div>
          Cosa sono le criptovalute? Cos’è il metaverso, il mondo Web3, la DeFi
          e l’economia digitale?
          <br />
          Per iniziare, dovete sapere che a noi interessa usare questo mondo
          digitale per gli enormi vantaggi e benefici che comporta, come ad
          esempio:
          <List>
            <li>Conservare il denaro in maniera sicura ed incensurabile</li>
            <li>Inviare denaro istantaneamente a costo quasi zero</li>
            <li>
              Ottenere rendimenti più alti sui propri risparmi in totale
              autonomia e sicurezza
            </li>
          </List>
          <br />
          Ci sono diverse Blockchain, ognuna per un caso specifico. Ma non
          spaventatevi, perché a noi interessano al massimo una dozzina di
          queste, tra cui alcune Layer2 di Ethereum ed i loro ecosistemi di
          progetti.
        </div>
        <Accordion buttonText={"Cos’è una Blockchain?"} className="py-5">
          <p className="lg:p-5 p-3">
            Una blockchain è una tecnologia che funziona come un registro
            digitale distribuito su una rete di computer. Ogni dato o
            transazione inserito viene organizzato in blocchi collegati tra loro
            in ordine cronologico tramite crittografia, garantendo
            l&apos;immutabilità dei dati.
            <br />
            <br />
            Le blockchain sono decentralizzate, il che significa che non
            c&apos;è un&apos;autorità centrale che gestisce le informazioni,
            rendendo i dati sicuri, trasparenti e resistenti alla manipolazione.
            Questo è uno dei motivi per cui la blockchain è alla base di molte
            criptovalute, come Bitcoin, che garantiscono sovranità monetaria:
            permettono a chiunque di possedere, trasferire e gestire il proprio
            denaro senza bisogno di banche o intermediari, offrendo una forma di
            libertà economica indipendente da governi o istituzioni.
            <br />
            <br />
            Oltre alla funzione monetaria, la blockchain è anche una piattaforma
            per creare applicazioni decentralizzate (dApp) grazie a reti come
            Ethereum. Le dApp operano su contratti intelligenti, ovvero
            programmi autoeseguibili che funzionano su blockchain senza il
            bisogno di intermediari. Ethereum, ad esempio, consente agli
            sviluppatori di creare soluzioni decentralizzate che spaziano dalla
            finanza alla gestione di identità digitali, garantendo trasparenza e
            sicurezza senza l&apos;intervento di un&apos;autorità centrale.
            Questa tecnologia sta trasformando settori come quello finanziario,
            legale e artistico, aprendo la strada a nuovi modelli di governance,
            economia e innovazione.
            <br />
          </p>
        </Accordion>
        <p>
          Per scoprire di più sulle Blockchain, quali Blockchain esistono, le
          applicazioni al di sopra di esse, ed i wallet compatibili, visita la
          pagina{" "}
          <Button href="./blockchain" local={true} variant="inline-text-button">
            Blockchains
          </Button>
          <br />
          <br />
          Ogni Blockchain ha il proprio ecosistema di applicazioni, ed è
          importante saper riconoscere quali sono le migliori per poter gestire
          al meglio le proprio risorse (tempo e denaro).
        </p>
        <Accordion
          buttonText={"Cosa sono le applicazioni decentralizzate (DeFi)"}
        >
          <p className="p-5">
            Le applicazioni decentralizzate (o dApp) sono programmi che
            funzionano su una rete blockchain, invece che su server
            centralizzati. A differenza delle applicazioni tradizionali, che
            dipendono da un&apos;entità centrale (come una società o un server),
            le dApp operano su reti distribuite, rendendole più sicure,
            trasparenti e resistenti alla censura. Le dApp utilizzano smart
            contract, che sono contratti programmabili auto-eseguibili su
            blockchain. Una volta impostati, questi contratti funzionano
            autonomamente secondo le regole stabilite nel codice, senza bisogno
            di intermediari per far rispettare gli accordi. Un esempio noto di
            dApp è Uniswap, un exchange decentralizzato che permette agli utenti
            di scambiare criptovalute direttamente tra di loro, senza bisogno di
            piattaforme centralizzate. Altri esempi includono applicazioni per
            la finanza decentralizzata (DeFi), giochi blockchain, marketplace
            NFT e molto altro.
          </p>
        </Accordion>
      </SectionBody>
    </MobileContainer>
  );
}
