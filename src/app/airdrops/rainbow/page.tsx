import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function RainbowPage() {
  return (
    <ProtectedRoute title="Rainbow - Airdrop">
      <PageTitle description="Portafoglio mobile per Ethereum e Web3">
        Rainbow
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">R</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Rainbow</h2>
              <p className="text-neutral-600">Wallet • Mobile • Web3</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Rainbow</strong> è un portafoglio mobile per Ethereum e Web3 che offre un&apos;esperienza utente elegante e intuitiva per gestire criptovalute, NFT e interagire con applicazioni decentralizzate. Rainbow si concentra sulla semplicità d&apos;uso e l&apos;accessibilità per rendere Web3 più user-friendly.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Rainbow</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Design Elegante">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">User Experience</h4>
              <p className="text-neutral-600">
                Rainbow offre un design elegante e intuitivo che rende l&apos;interazione con Web3 semplice e piacevole, anche per utenti non tecnici, con un&apos;interfaccia pulita e moderna.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Multi-Asset Support">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Gestione Completa</h4>
              <p className="text-neutral-600">
                Rainbow supporta criptovalute, NFT, token ERC-20 e altri asset digitali, permettendo agli utenti di gestire tutto il loro portfolio Web3 da un&apos;unica applicazione mobile.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. dApp Integration">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Web3 Browser</h4>
              <p className="text-neutral-600">
                Rainbow include un browser Web3 integrato che permette agli utenti di interagire direttamente con applicazioni decentralizzate, DEX, protocolli DeFi e marketplace NFT.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Security First">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sicurezza Garantita</h4>
              <p className="text-neutral-600">
                Rainbow è un portafoglio non-custodial che non ha mai accesso alle chiavi private degli utenti, garantendo la massima sicurezza e controllo sui propri asset.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Cross-Platform">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Multi-Device</h4>
              <p className="text-neutral-600">
                Rainbow è disponibile su iOS e Android, permettendo agli utenti di accedere ai propri asset e interagire con Web3 da qualsiasi dispositivo mobile.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Funzionalità del Portafoglio</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Asset Management</h4>
              <List>
                <li>Gestione criptovalute</li>
                <li>Visualizzazione NFT</li>
                <li>Portfolio tracking</li>
                <li>Transazioni history</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">DeFi Integration</h4>
              <List>
                <li>DEX trading</li>
                <li>Lending protocols</li>
                <li>Staking services</li>
                <li>Yield farming</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">NFT Features</h4>
              <List>
                <li>NFT gallery</li>
                <li>Marketplace access</li>
                <li>Collection management</li>
                <li>Trading capabilities</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Security</h4>
              <List>
                <li>Biometric authentication</li>
                <li>Secure key storage</li>
                <li>Transaction signing</li>
                <li>Privacy protection</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Utilizzo del Portafoglio</h4>
                <List>
                  <li>Utilizza Rainbow come portafoglio principale</li>
                  <li>Gestisci asset su diverse blockchain</li>
                  <li>Mantieni un&apos;attività costante</li>
                  <li>Interagisci con protocolli DeFi</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Attività DeFi</h4>
                <List>
                  <li>Utilizza protocolli DeFi tramite Rainbow</li>
                  <li>Partecipa a lending e borrowing</li>
                  <li>Fai yield farming e staking</li>
                  <li>Utilizza volumi significativi</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Community Engagement</h4>
                <List>
                  <li>Partecipa alle discussioni</li>
                  <li>Contribuisci allo sviluppo</li>
                  <li>Partecipa a eventi e AMA</li>
                  <li>Invita nuovi utenti</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Setup Iniziale</h4>
                <List>
                  <li>Scarica l&apos;app Rainbow</li>
                  <li>Crea un nuovo wallet o importa esistente</li>
                  <li>Configura la sicurezza</li>
                  <li>Esplora le funzionalità</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Gestione Asset</h4>
                <List>
                  <li>Visualizza il tuo portfolio</li>
                  <li>Gestisci criptovalute e NFT</li>
                  <li>Monitora le performance</li>
                  <li>Effettua transazioni</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Interazione DeFi</h4>
                <List>
                  <li>Utilizza il browser Web3 integrato</li>
                  <li>Accedi a protocolli DeFi</li>
                  <li>Partecipa a trading e lending</li>
                  <li>Interagisci con dApp</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema Rainbow</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Protocolli Supportati">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Integrazione DeFi</h4>
              <p className="text-neutral-600">
                Rainbow si integra con numerosi protocolli DeFi, permettendo agli utenti di accedere a DEX, lending platforms, staking services e altri strumenti finanziari decentralizzati.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. NFT Ecosystem">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">NFT Support</h4>
              <p className="text-neutral-600">
                Rainbow offre supporto completo per NFT, inclusi marketplace, gallerie, trading e gestione di collezioni, rendendo facile l&apos;interazione con l&apos;ecosistema NFT.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Developer Tools">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">SDK e API</h4>
              <p className="text-neutral-600">
                Rainbow offre SDK e API per sviluppatori, permettendo l&apos;integrazione di funzionalità wallet in altre applicazioni e migliorando l&apos;ecosistema Web3.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://rainbow.me/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Rainbow
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/rainbowdotme" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/rainbow" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.rainbow.me/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">📱</span>
              <a href="https://rainbow.me/download" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Download App
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
