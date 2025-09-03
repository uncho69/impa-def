import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { PageLayout } from "@/components/PageLayout";
// Removed unused imports

export default function manuale() {
  return (
    <PageLayout 
      title="Manuale A-Z" 
      description="Guida completa al mondo Web3, crypto e DeFi dalla A alla Z"
    >
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
              <p className="text-neutral-700 mb-6">
                Cosa sono le criptovalute? Cos&apos;è il metaverso, il mondo Web3, la DeFi e l&apos;economia digitale?
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
          
          <Accordion buttonText={"Cos'è una Blockchain?"} className="mb-4">
            <p className="p-5">
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

          <Accordion
            buttonText={"Cosa sono le applicazioni decentralizzate (DeFi)"}
            className="mb-4"
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

    </PageLayout>
  );
}
