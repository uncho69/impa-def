import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Sanko</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={false}>
            <li>
              <strong>Come posso registrarmi a SankoTV?</strong>
              <List>
                Per creare un account e un portafoglio SankoTV, ogni utente di
                SankoTV inizia iscrivendosi utilizzando la propria e-mail,
                l&apos;account Google o l&apos;ID Apple. Nota che devi collegare
                il tuo account X/Twitter per completare il processo di
                registrazione. Il prossimo passo per iniziare sarà trasferire
                ETH su Arbitrum al tuo portafoglio Privy di SankoTV e acquistare
                uno (o quanti ne vuoi) dei tuoi pass personali (vedi{" "}
                <strong>DEPOSITARE E PRELEVARE ETH</strong>). Per accedere su
                mobile se hai già collegato il tuo Twitter su desktop (e lo hai
                reso la tua fonte di accesso primaria):
                <li>
                  Vai su{" "}
                  <Link href="" target="_blank" className="underline">
                    https://sanko.tv/settings.
                  </Link>
                </li>
                <li>
                  Aggiungi un metodo di accesso aggiuntivo (e-mail, ID Apple o
                  Google)
                </li>
                <li>Accedi tramite quel metodo sul tuo telefono.</li>
              </List>
            </li>
            <li>
              <strong>È necessario avere un account X/Twitter?</strong>
              <List>
                <li>
                  Sì. Oltre a un account X/Twitter, ogni utente dovrebbe
                  utilizzare un metodo di accesso aggiuntivo per evitare di
                  perdere l&apos;accesso ai propri fondi nel caso in cui il loro
                  account Twitter venga sospeso.
                </li>
              </List>
            </li>
            <li>
              <strong>
                Il team di SankoTV può fornire informazioni sull&apos;e-mail
                associata, l&apos;account Google o l&apos;ID Apple per il mio
                account Twitter?
              </strong>
              <List>
                <li>
                  Il nostro team di supporto non è in grado di divulgare
                  informazioni sul metodo di registrazione di un utente per
                  proteggere le informazioni private dei clienti.
                </li>
              </List>
            </li>
            <li>
              <strong>
                L&apos;app di SankoTV mi sta chiedendo di ricollegare il mio
                account Twitter o inserire un altro codice di invito. Perché?
              </strong>
              <List>
                <li>
                  Ricevere questo messaggio significa che hai utilizzato un
                  nuovo metodo di accesso e l&apos;app ti sta chiedendo di
                  creare un nuovo account. Per accedere al tuo account
                  originale, esci e utilizza il metodo di accesso iniziale.
                </li>
              </List>
            </li>
            <li>
              <strong>
                Perché vedo una schermata che indica che il mio account è già
                collegato?
              </strong>
              <List>
                <li>
                  Questo problema è legato all&apos;app X/Twitter. Per
                  risolverlo, esci da Twitter, prova a collegarti di nuovo e
                  accedi nuovamente a Twitter quando richiesto.
                </li>
              </List>
            </li>
            <li>
              <strong>È possibile cambiare il mio metodo di accesso?</strong>
              <List>
                <li>
                  Gli utenti non possono modificare l&apos;indirizzo email o il
                  numero di telefono iniziali utilizzati durante la
                  registrazione.
                </li>
              </List>
            </li>
            <li>
              <strong>Quale catena/rete utilizza SankoTV?</strong>
              <List>
                <li>SankoTV opera su Arbitrum, un L2 di Ethereum.</li>
              </List>
            </li>
            <li>
              <strong>Come posso aggiungere ETH al mio account SankoTV?</strong>
              <List>
                <li>
                  Invia ETH sulla rete Arbitrum al tuo indirizzo SankoTV
                  utilizzando un&apos;app wallet come Metamask. Per trasferire
                  ETH dal tuo Ethereum al tuo portafoglio SankoTV, utilizza un
                  protocollo di bridge come Synapse (
                  <Link
                    href={"https://www.synapseprotocol.com/"}
                    target="_blank"
                    className="underline"
                  >
                    https://www.synapseprotocol.com/
                  </Link>
                  ). Quando l&apos;ETH viene trasferito dal Mainnet di Ethereum
                  ad Arbitrum, puoi inviare questo ETH al tuo indirizzo del
                  portafoglio SankoTV.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
