import type { Metadata } from "next";
import "./globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "@/components/Navbar";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Inter, Montserrat, Source_Code_Pro } from "next/font/google";
import { Footer } from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const sourceCode = Source_Code_Pro({
  variable: "--font-source-code",
  display: "swap",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImparoDeFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${montserrat.variable} ${inter.variable} ${sourceCode.variable} text-neutral-900 antialiased font-montserrat bg-background flex flex-col items-center min-h-screen`}>
          <Navbar />
          <header className="hidden">{/* opzionale: pulsanti rapidi */}
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main className="w-full flex-grow">{children}</main>
          <Footer />
          
          {/* AI Chat Widget */}
          <script src="https://id-bot-eight.vercel.app/defi-mentor-widget.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                DefiMentor.CONFIG = {
                  demoMode: true,
                  position: 'bottom-right',
                  theme: 'imparodefi'
                };
                
                // Nasconde il widget su mobile, lo mostra solo su desktop
                const style = document.createElement('style');
                style.textContent = \`
                  @media (max-width: 768px) {
                    /* Nasconde il widget su mobile */
                    [data-defi-mentor-widget],
                    .defi-mentor-widget,
                    #defi-mentor-widget,
                    iframe[src*="defi-mentor"],
                    div[class*="defi-mentor"],
                    div[class*="chat-widget"],
                    div[class*="ai-widget"] {
                      display: none !important;
                    }
                  }
                \`;
                document.head.appendChild(style);
                
                // Controlla se l'utente è loggato
                function checkUserAuth() {
                  // Controlla se Clerk è disponibile e se l'utente è autenticato
                  if (typeof window !== 'undefined' && window.Clerk) {
                    const isSignedIn = window.Clerk.user !== null;
                    return isSignedIn;
                  }
                  return false;
                }
                
                // Crea overlay invisibile sopra il widget per utenti non loggati
                function createWidgetOverlay() {
                  // Rimuovi overlay esistente
                  const existingOverlay = document.getElementById('widget-overlay');
                  if (existingOverlay) {
                    existingOverlay.remove();
                  }
                  
                  if (!checkUserAuth()) {
                    // Crea overlay invisibile
                    const overlay = document.createElement('div');
                    overlay.id = 'widget-overlay';
                    overlay.style.cssText = \`
                      position: fixed;
                      bottom: 20px;
                      right: 20px;
                      width: 60px;
                      height: 60px;
                      z-index: 10000;
                      cursor: pointer;
                      background: transparent;
                    \`;
                    
                    overlay.onclick = function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      showAuthModal();
                    };
                    
                    document.body.appendChild(overlay);
                  }
                }
                
                // Monitora i cambiamenti di autenticazione per l'overlay
                function setupOverlayWatcher() {
                  setInterval(() => {
                    createWidgetOverlay();
                  }, 1000);
                }
                
                // Avvia il monitoraggio dell'overlay
                setTimeout(setupOverlayWatcher, 3000);
                
                // Crea e mostra il modale di registrazione
                function showAuthModal() {
                  // Rimuovi modale esistente se presente
                  const existingModal = document.getElementById('auth-modal');
                  if (existingModal) {
                    existingModal.remove();
                  }
                  
                  // Crea il modale
                  const modal = document.createElement('div');
                  modal.id = 'auth-modal';
                  modal.innerHTML = \`
                    <div style="
                      position: fixed;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      background: rgba(0, 0, 0, 0.5);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      z-index: 9999;
                      backdrop-filter: blur(4px);
                    ">
                      <div style="
                        background: white;
                        border-radius: 16px;
                        padding: 32px;
                        max-width: 400px;
                        width: 90%;
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                        text-align: center;
                        position: relative;
                      ">
                        <button id="close-modal" style="
                          position: absolute;
                          top: 16px;
                          right: 16px;
                          background: none;
                          border: none;
                          font-size: 24px;
                          cursor: pointer;
                          color: #6b7280;
                          width: 32px;
                          height: 32px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          border-radius: 50%;
                          transition: background-color 0.2s;
                        " onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='transparent'">
                          ×
                        </button>
                        
                        <div style="
                          width: 64px;
                          height: 64px;
                          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                          border-radius: 50%;
                          margin: 0 auto 24px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          font-size: 24px;
                          color: white;
                        ">
                          🤖
                        </div>
                        
                        <h2 style="
                          font-size: 24px;
                          font-weight: 700;
                          color: #111827;
                          margin: 0 0 16px 0;
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        ">
                          Accedi per utilizzare l'AI Bot
                        </h2>
                        
                        <p style="
                          color: #6b7280;
                          font-size: 16px;
                          line-height: 1.5;
                          margin: 0 0 32px 0;
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        ">
                          Per utilizzare l'assistente AI, devi prima registrarti o effettuare il login.
                        </p>
                        
                        <div style="display: flex; gap: 12px; justify-content: center;">
                          <button id="signup-btn" style="
                            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-size: 16px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: transform 0.2s, box-shadow 0.2s;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                          " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 10px 15px -3px rgba(59, 130, 246, 0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            Registrati
                          </button>
                          
                          <button id="signin-btn" style="
                            background: white;
                            color: #3b82f6;
                            border: 2px solid #3b82f6;
                            padding: 10px 24px;
                            border-radius: 8px;
                            font-size: 16px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.2s;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                          " onmouseover="this.style.backgroundColor='#3b82f6'; this.style.color='white'" onmouseout="this.style.backgroundColor='white'; this.style.color='#3b82f6'">
                            Accedi
                          </button>
                        </div>
                      </div>
                    </div>
                  \`;
                  
                  document.body.appendChild(modal);
                  
                  // Gestisci la chiusura del modale
                  document.getElementById('close-modal').onclick = () => modal.remove();
                  modal.onclick = (e) => {
                    if (e.target === modal) modal.remove();
                  };
                  
                  // Gestisci i pulsanti
                  document.getElementById('signup-btn').onclick = () => {
                    modal.remove();
                    // Reindirizza alla pagina di registrazione Clerk
                    window.location.href = '/sign-up';
                  };
                  
                  document.getElementById('signin-btn').onclick = () => {
                    modal.remove();
                    // Reindirizza alla pagina di login Clerk
                    window.location.href = '/sign-in';
                  };
                }
                
                // Intercetta il click sul widget AI chat con priorità alta
                document.addEventListener('click', function(event) {
                  const target = event.target;
                  
                  // Controlla se il click è su elementi del widget
                  const isWidgetClick = target.closest('[data-defi-mentor-widget], .defi-mentor-widget, #defi-mentor-widget, iframe[src*="defi-mentor"], div[class*="defi-mentor"], div[class*="chat-widget"], div[class*="ai-widget"]') ||
                                      target.matches('[data-defi-mentor-widget], .defi-mentor-widget, #defi-mentor-widget, iframe[src*="defi-mentor"], div[class*="defi-mentor"], div[class*="chat-widget"], div[class*="ai-widget"]');
                  
                  if (isWidgetClick && !checkUserAuth()) {
                    // Blocca completamente l'evento
                    event.preventDefault();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    
                    // Mostra il modale
                    showAuthModal();
                    
                    // Blocca anche eventuali eventi successivi
                    return false;
                  }
                }, true); // true = capture phase (prima che l'evento arrivi al widget)
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
