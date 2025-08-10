import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { List } from "@/components/List";
// Removed unused imports

export default function manuale() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 to-background pt-20 pb-10">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text text-center">Manuale A-Z</h1>
        </div>
      </div>
      
      <section className="py-10">
        <div className="container-custom">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <p className="text-neutral-700 mb-6">
              Cosa sono le criptovalute? Cos’è il metaverso, il mondo Web3, la DeFi e l’economia digitale?
            </p>
            <p className="text-neutral-700 mb-6">
              Per iniziare, dovete sapere che a noi interessa usare questo mondo digitale per gli enormi vantaggi e benefici che comporta, come ad esempio:
            </p>
            <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 mb-8">
              <List>
                <li><b>Conservare il denaro</b> in maniera sicura ed incensurabile</li>
                <li><b>Inviare denaro istantaneamente</b> a costo quasi zero</li>
                <li><b>Ottenere rendimenti più alti</b> sui propri risparmi in totale autonomia e sicurezza</li>
              </List>
            </div>
            <p className="text-neutral-700">
              Ci sono diverse Blockchain, ognuna per un caso specifico. Ma non spaventatevi, perché a noi interessano al massimo una dozzina di queste, tra cui alcune Layer2 di Ethereum ed i loro ecosistemi di progetti.
            </p>
          </div>
        <div className="mt-8">
        <Accordion buttonText={"Cos’è una Blockchain?"} className="text-xl font-semibold py-5 px-6">
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
        <div className="p-6 bg-white rounded-xl shadow-sm mt-6">
          <p className="text-lg text-neutral-700 mb-4">
            Per scoprire di più sulle Blockchain, quali Blockchain esistono, le applicazioni al di sopra di esse, ed i wallet compatibili, visita la pagina
            <Button href="/blockchain" local={true} variant="inline-text-button" className="ml-2 align-baseline">Blockchain</Button>
          </p>
          <p className="text-neutral-700">
            Ogni Blockchain ha il proprio ecosistema di applicazioni, ed è importante saper riconoscere quali sono le migliori per poter gestire al meglio le proprio risorse (tempo e denaro).
          </p>
        </div>
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
        
        <div className="mt-8 bg-primary-50/30 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Esplora il mondo Web3</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button href="/blockchain" local={true} className="btn btn-outline">Blockchain</Button>
            <Button href="/defi" local={true} className="btn btn-outline">DeFi</Button>
            <Button href="/nft" local={true} className="btn btn-outline">NFTs</Button>
            <Button href="/wallet" local={true} className="btn btn-outline">Wallet</Button>
          </div>
        </div>
        </div>
        </div>
      </section>
    </div>
  );
}
