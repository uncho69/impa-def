import type { Metadata } from "next";
import "./globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "@/components/Navbar";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { fontClassNames } from "./fonts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ImparoDeFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isClerkConfigured = ((): boolean => {
    if (process.env.SKIP_CLERK === 'true') {
      return false;
    }

    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
    const secretKey = process.env.CLERK_SECRET_KEY?.trim();
    
    const hasPublishableKey = !!(
      publishableKey &&
      publishableKey.length > 20 &&
      (publishableKey.startsWith('pk_test_') || publishableKey.startsWith('pk_live_'))
    );
    
    const hasSecretKey = !!(
      secretKey &&
      secretKey.length > 20 &&
      (secretKey.startsWith('sk_test_') || secretKey.startsWith('sk_live_'))
    );
    
    return hasPublishableKey && hasSecretKey;
  })();

  const content = (
    <html lang="en">
      <body className={`${fontClassNames} text-neutral-900 antialiased font-montserrat bg-background flex flex-col items-center min-h-screen`}>
        <LanguageProvider>
          <Navbar />
          <header className="hidden">{/* opzionale: pulsanti rapidi */}
            {isClerkConfigured ? (
              <>
                <SignedOut>
                  <a href="https://accounts.imparodefi.xyz/sign-in">Accedi</a>
                  <a href="https://accounts.imparodefi.xyz/sign-up">Registrati</a>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="https://accounts.imparodefi.xyz/sign-in" />
                </SignedIn>
              </>
            ) : null}
          </header>
          <main className="w-full flex-grow">{children}</main>
          <Footer />
          
          {/* AI Chat Widget */}
          <script src="https://id-bot-eight.vercel.app/defi-mentor-widget.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Wait for both Clerk and DefiMentor to be available
                let retryCount = 0;
                const maxRetries = 20; // 10 seconds max (20 * 500ms)
                
                function initDefiMentor() {
                  if (typeof DefiMentor === 'undefined') {
                    retryCount++;
                    if (retryCount >= maxRetries) {
                      console.error('DefiMentor widget failed to load after multiple attempts');
                      return;
                    }
                    setTimeout(initDefiMentor, 500);
                    return;
                  }
                  
                  try {
                    DefiMentor.CONFIG = {
                      demoMode: true,
                      position: 'bottom-right',
                      theme: 'imparodefi'
                    };
                    console.log('DefiMentor widget initialized successfully');
                  } catch (error) {
                    console.error('Error configuring DefiMentor:', error);
                  }
                }
                
                // Handle script load error
                const widgetScript = document.querySelector('script[src*="defi-mentor-widget.js"]');
                if (widgetScript) {
                  widgetScript.onerror = function() {
                    console.error('Failed to load DeFi Mentor widget script from https://id-bot-eight.vercel.app/defi-mentor-widget.js');
                  };
                }
                
                // Start initialization
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', initDefiMentor);
                } else {
                  // Small delay to ensure script has time to load
                  setTimeout(initDefiMentor, 100);
                }
                
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
                
                // Check if user is authenticated
                function checkUserAuth() {
                  try {
                    // Check if Clerk is available and user is authenticated
                    if (typeof window !== 'undefined' && window.Clerk) {
                      // Try different methods to verify authentication
                      const clerk = window.Clerk;
                      if (clerk.user) {
                        return true;
                      }
                      // Try with session
                      if (clerk.session && clerk.session.id) {
                        return true;
                      }
                      // Try with loaded and userLoaded
                      if (clerk.loaded && clerk.userLoaded && clerk.user) {
                        return true;
                      }
                    }
                  } catch (error) {
                    console.debug('Error checking auth:', error);
                  }
                  return false;
                }
                
                // Setup widget authentication check - widget is visible but requires auth to use
                let widgetClickHandler = null;
                let authWatcherInterval = null;
                let widgetOverlay = null;
                
                function createWidgetOverlay() {
                  // Remove existing overlay
                  if (widgetOverlay) {
                    widgetOverlay.remove();
                    widgetOverlay = null;
                  }
                  
                  // Only create overlay if user is not authenticated
                  if (checkUserAuth()) {
                    return;
                  }
                  
                  // Find widget in DOM - try multiple selectors
                  let widget = null;
                  const selectors = [
                    '[data-defi-mentor-widget]',
                    '.defi-mentor-widget',
                    '#defi-mentor-widget',
                    'iframe[src*="defi-mentor"]',
                    'iframe[src*="id-bot-eight"]',
                    'div[class*="defi-mentor"]',
                    'div[class*="chat-widget"]',
                    'div[class*="ai-widget"]'
                  ];
                  
                  for (const selector of selectors) {
                    widget = document.querySelector(selector);
                    if (widget) break;
                  }
                  
                  // Also try to find by looking for elements in bottom-right corner
                  if (!widget) {
                    const allElements = document.querySelectorAll('div, iframe, button');
                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;
                    
                    for (const el of allElements) {
                      const rect = el.getBoundingClientRect();
                      // Check if element is in bottom-right corner (where widget typically is)
                      if (rect.right > windowWidth - 150 && rect.bottom > windowHeight - 150 && 
                          rect.width > 50 && rect.height > 50) {
                        widget = el;
                        break;
                      }
                    }
                  }
                  
                  if (!widget) {
                    console.log('Widget not found for overlay');
                    return;
                  }
                  
                  const widgetRect = widget.getBoundingClientRect();
                  
                  // Create transparent overlay that covers the widget
                  widgetOverlay = document.createElement('div');
                  widgetOverlay.id = 'defi-mentor-auth-overlay';
                  widgetOverlay.style.position = 'fixed';
                  widgetOverlay.style.top = widgetRect.top + 'px';
                  widgetOverlay.style.left = widgetRect.left + 'px';
                  widgetOverlay.style.width = Math.max(widgetRect.width, 100) + 'px';
                  widgetOverlay.style.height = Math.max(widgetRect.height, 100) + 'px';
                  widgetOverlay.style.zIndex = '999999';
                  widgetOverlay.style.cursor = 'pointer';
                  widgetOverlay.style.background = 'transparent';
                  widgetOverlay.style.pointerEvents = 'auto';
                  widgetOverlay.style.border = 'none';
                  
                  // Handle all interaction events on overlay
                  const handleOverlayInteraction = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    showAuthModal();
                    return false;
                  };
                  
                  widgetOverlay.addEventListener('click', handleOverlayInteraction, true);
                  widgetOverlay.addEventListener('mousedown', handleOverlayInteraction, true);
                  widgetOverlay.addEventListener('mouseup', handleOverlayInteraction, true);
                  widgetOverlay.addEventListener('touchstart', handleOverlayInteraction, true);
                  widgetOverlay.addEventListener('touchend', handleOverlayInteraction, true);
                  widgetOverlay.addEventListener('focus', handleOverlayInteraction, true);
                  
                  document.body.appendChild(widgetOverlay);
                  
                  // Also block pointer events on the widget itself
                  if (widget && widget.style) {
                    widget.style.pointerEvents = 'none';
                    widget.style.userSelect = 'none';
                  }
                  
                  // Update overlay position on scroll/resize
                  let updateTimer;
                  const updatePosition = () => {
                    clearTimeout(updateTimer);
                    updateTimer = setTimeout(() => {
                      if (widgetOverlay && widget && widget.parentNode) {
                        const newRect = widget.getBoundingClientRect();
                        widgetOverlay.style.top = newRect.top + 'px';
                        widgetOverlay.style.left = newRect.left + 'px';
                        widgetOverlay.style.width = Math.max(newRect.width, 100) + 'px';
                        widgetOverlay.style.height = Math.max(newRect.height, 100) + 'px';
                      }
                    }, 50);
                  };
                  
                  window.addEventListener('scroll', updatePosition, true);
                  window.addEventListener('resize', updatePosition);
                  
                  // Watch for widget position changes
                  const observer = new MutationObserver(updatePosition);
                  if (widget.parentNode) {
                    observer.observe(widget.parentNode, { attributes: true, childList: true, subtree: true });
                  }
                  
                  console.log('Widget overlay created and blocking widget');
                }
                
                function setupWidgetAuthCheck() {
                  // Remove existing handler if any
                  if (widgetClickHandler) {
                    document.removeEventListener('click', widgetClickHandler, true);
                    widgetClickHandler = null;
                  }
                  
                  // Create overlay for unauthenticated users - this blocks all interaction
                  createWidgetOverlay();
                  
                  // If user is authenticated, remove overlay and restore widget
                  if (checkUserAuth()) {
                    if (widgetOverlay) {
                      widgetOverlay.remove();
                      widgetOverlay = null;
                    }
                    // Restore widget pointer events
                    const widget = document.querySelector('[data-defi-mentor-widget], .defi-mentor-widget, #defi-mentor-widget, iframe[src*="defi-mentor"], div[class*="defi-mentor"], div[class*="chat-widget"]');
                    if (widget && widget.style) {
                      widget.style.pointerEvents = '';
                      widget.style.userSelect = '';
                    }
                  }
                  
                  // Also add click handler as backup
                  widgetClickHandler = function(event) {
                    // Skip if user is authenticated
                    if (checkUserAuth()) {
                      return;
                    }
                    
                    const target = event.target;
                    
                    // Check if click is on widget elements
                    const widgetSelectors = [
                      '[data-defi-mentor-widget]',
                      '.defi-mentor-widget',
                      '#defi-mentor-widget',
                      'iframe[src*="defi-mentor"]',
                      'div[class*="defi-mentor"]',
                      'div[class*="chat-widget"]',
                      'div[class*="ai-widget"]'
                    ];
                    
                    let isWidgetClick = false;
                    
                    // Check if target or any parent matches widget selectors
                    for (const selector of widgetSelectors) {
                      try {
                        if (target.closest && target.closest(selector)) {
                          isWidgetClick = true;
                          break;
                        }
                        if (target.matches && target.matches(selector)) {
                          isWidgetClick = true;
                          break;
                        }
                      } catch (e) {
                        // Invalid selector, continue
                      }
                    }
                    
                    // Check if click is near widget position (for iframes)
                    if (!isWidgetClick) {
                      const widget = document.querySelector('[data-defi-mentor-widget], .defi-mentor-widget, #defi-mentor-widget, iframe[src*="defi-mentor"]');
                      if (widget) {
                        const widgetRect = widget.getBoundingClientRect();
                        const clickX = event.clientX;
                        const clickY = event.clientY;
                        
                        // Check if click is within widget bounds (with some margin)
                        if (clickX >= widgetRect.left - 10 && clickX <= widgetRect.right + 10 &&
                            clickY >= widgetRect.top - 10 && clickY <= widgetRect.bottom + 10) {
                          isWidgetClick = true;
                        }
                      }
                    }
                    
                    // Only intercept if user is not authenticated and click is on widget
                    if (isWidgetClick) {
                      // Block the event
                      event.preventDefault();
                      event.stopPropagation();
                      event.stopImmediatePropagation();
                      
                      // Show authentication modal
                      showAuthModal();
                      
                      return false;
                    }
                  };
                  
                  // Add event listener in capture phase (before it reaches widget)
                  document.addEventListener('click', widgetClickHandler, true);
                  console.log('Widget auth check handler installed');
                }
                
                // Monitor authentication changes to update handler
                function setupAuthWatcher() {
                  // Clear existing watcher
                  if (authWatcherInterval) {
                    clearInterval(authWatcherInterval);
                  }
                  
                  let lastAuthState = checkUserAuth();
                  
                  authWatcherInterval = setInterval(() => {
                    const currentAuthState = checkUserAuth();
                    if (currentAuthState !== lastAuthState) {
                      lastAuthState = currentAuthState;
                      console.log('Auth state changed, re-setting up widget handler');
                      // Re-setup handler when auth state changes
                      setupWidgetAuthCheck();
                    } else if (!currentAuthState) {
                      // User still not authenticated, ensure overlay is in place
                      // Check if overlay exists and is still covering widget
                      const existingOverlay = document.getElementById('defi-mentor-auth-overlay');
                      if (!existingOverlay) {
                        createWidgetOverlay();
                      } else {
                        // Verify overlay is still positioned correctly
                        const widget = document.querySelector('[data-defi-mentor-widget], .defi-mentor-widget, #defi-mentor-widget, iframe[src*="defi-mentor"], div[class*="defi-mentor"], div[class*="chat-widget"]');
                        if (widget) {
                          const widgetRect = widget.getBoundingClientRect();
                          const overlayRect = existingOverlay.getBoundingClientRect();
                          // If positions don't match, recreate overlay
                          if (Math.abs(widgetRect.top - overlayRect.top) > 10 || 
                              Math.abs(widgetRect.left - overlayRect.left) > 10) {
                            createWidgetOverlay();
                          }
                        }
                      }
                    }
                  }, 500); // Check more frequently
                }
                
                // Start widget authentication check after DefiMentor is initialized
                function startWidgetAuthCheck() {
                  let attempts = 0;
                  const maxAttempts = 30;
                  
                  const checkWidget = setInterval(() => {
                    attempts++;
                    const widget = document.querySelector('[data-defi-mentor-widget], .defi-mentor-widget, #defi-mentor-widget, iframe[src*="defi-mentor"], iframe[src*="id-bot-eight"]');
                    
                    if (widget || attempts >= maxAttempts) {
                      clearInterval(checkWidget);
                      if (widget) {
                        console.log('Widget found, setting up auth check');
                        setupWidgetAuthCheck();
                        setupAuthWatcher();
                        
                        // Also set up continuous monitoring for widget changes
                        const continuousMonitor = setInterval(() => {
                          if (!checkUserAuth()) {
                            // Recreate overlay periodically to catch widget changes
                            const currentWidget = document.querySelector('[data-defi-mentor-widget], .defi-mentor-widget, #defi-mentor-widget, iframe[src*="defi-mentor"], iframe[src*="id-bot-eight"]');
                            if (currentWidget) {
                              const existingOverlay = document.getElementById('defi-mentor-auth-overlay');
                              if (!existingOverlay) {
                                createWidgetOverlay();
                              }
                            }
                          }
                        }, 2000);
                      } else {
                        console.warn('Widget not found after', maxAttempts, 'attempts');
                      }
                    }
                  }, 500);
                }
                
                // Start monitoring after DefiMentor initialization
                setTimeout(startWidgetAuthCheck, 2000);
                
                // Also set up a global click interceptor that always runs
                document.addEventListener('click', function(event) {
                  if (checkUserAuth()) {
                    return; // User is authenticated, allow clicks
                  }
                  
                  const target = event.target;
                  
                  // Check if click is on widget or widget container
                  const widgetSelectors = [
                    '[data-defi-mentor-widget]',
                    '.defi-mentor-widget',
                    '#defi-mentor-widget',
                    'iframe[src*="defi-mentor"]',
                    'iframe[src*="id-bot-eight"]',
                    'div[class*="defi-mentor"]',
                    'div[class*="chat-widget"]',
                    'div[class*="ai-widget"]'
                  ];
                  
                  let isWidgetClick = false;
                  
                  // Check if target or parent is widget
                  for (const selector of widgetSelectors) {
                    try {
                      if (target.closest && target.closest(selector)) {
                        isWidgetClick = true;
                        break;
                      }
                      if (target.matches && target.matches(selector)) {
                        isWidgetClick = true;
                        break;
                      }
                    } catch (e) {
                      // Invalid selector
                    }
                  }
                  
                  // Also check by position (bottom-right corner)
                  if (!isWidgetClick) {
                    const rect = target.getBoundingClientRect();
                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;
                    if (rect.right > windowWidth - 200 && rect.bottom > windowHeight - 200) {
                      // Might be widget area, check if there's a widget nearby
                      const widget = document.querySelector('[data-defi-mentor-widget], .defi-mentor-widget, #defi-mentor-widget, iframe[src*="defi-mentor"], iframe[src*="id-bot-eight"]');
                      if (widget) {
                        const widgetRect = widget.getBoundingClientRect();
                        if (Math.abs(rect.left - widgetRect.left) < 100 && Math.abs(rect.top - widgetRect.top) < 100) {
                          isWidgetClick = true;
                        }
                      }
                    }
                  }
                  
                  if (isWidgetClick) {
                    event.preventDefault();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    showAuthModal();
                    return false;
                  }
                }, true); // Use capture phase
                
                // Create and show registration modal
                function showAuthModal() {
                  // Remove existing modal if present
                  const existingModal = document.getElementById('auth-modal');
                  if (existingModal) {
                    existingModal.remove();
                  }
                  
                  // Create modal backdrop
                  const modal = document.createElement('div');
                  modal.id = 'auth-modal';
                  modal.style.cssText = \`
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    backdrop-filter: blur(4px);
                  \`;
                  
                  // Create modal content
                  const modalContent = document.createElement('div');
                  modalContent.style.cssText = \`
                    background: white;
                    border-radius: 16px;
                    padding: 32px;
                    max-width: 400px;
                    width: 90%;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    text-align: center;
                    position: relative;
                  \`;
                  
                  // Prevent click propagation on content
                  modalContent.onclick = (e) => {
                    e.stopPropagation();
                  };
                  
                  // Close button
                  const closeBtn = document.createElement('button');
                  closeBtn.innerHTML = '×';
                  closeBtn.style.cssText = \`
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
                  \`;
                  closeBtn.onmouseover = () => { closeBtn.style.backgroundColor = '#f3f4f6'; };
                  closeBtn.onmouseout = () => { closeBtn.style.backgroundColor = 'transparent'; };
                  closeBtn.onclick = (e) => {
                    e.stopPropagation();
                    modal.remove();
                  };
                  
                  // Icon
                  const icon = document.createElement('div');
                  icon.innerHTML = '🤖';
                  icon.style.cssText = \`
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
                  \`;
                  
                  // Title
                  const title = document.createElement('h2');
                  title.textContent = 'Accedi per utilizzare l\\'AI Bot';
                  title.style.cssText = \`
                    font-size: 24px;
                    font-weight: 700;
                    color: #111827;
                    margin: 0 0 16px 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  \`;
                  
                  // Description
                  const description = document.createElement('p');
                  description.textContent = 'Per utilizzare l\\'assistente AI, devi prima registrarti o effettuare il login.';
                  description.style.cssText = \`
                    color: #6b7280;
                    font-size: 16px;
                    line-height: 1.5;
                    margin: 0 0 32px 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  \`;
                  
                  // Button container
                  const buttonContainer = document.createElement('div');
                  buttonContainer.style.cssText = 'display: flex; gap: 12px; justify-content: center;';
                  
                  // Sign up button
                  const signupBtn = document.createElement('button');
                  signupBtn.textContent = 'Registrati';
                  signupBtn.style.cssText = \`
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
                  \`;
                  signupBtn.onmouseover = () => {
                    signupBtn.style.transform = 'translateY(-1px)';
                    signupBtn.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.3)';
                  };
                  signupBtn.onmouseout = () => {
                    signupBtn.style.transform = 'translateY(0)';
                    signupBtn.style.boxShadow = 'none';
                  };
                  signupBtn.onclick = (e) => {
                    e.stopPropagation();
                    modal.remove();
                    window.location.href = 'https://accounts.imparodefi.xyz/sign-up';
                  };
                  
                  // Sign in button
                  const signinBtn = document.createElement('button');
                  signinBtn.textContent = 'Accedi';
                  signinBtn.style.cssText = \`
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
                  \`;
                  signinBtn.onmouseover = () => {
                    signinBtn.style.backgroundColor = '#3b82f6';
                    signinBtn.style.color = 'white';
                  };
                  signinBtn.onmouseout = () => {
                    signinBtn.style.backgroundColor = 'white';
                    signinBtn.style.color = '#3b82f6';
                  };
                  signinBtn.onclick = (e) => {
                    e.stopPropagation();
                    modal.remove();
                    window.location.href = 'https://accounts.imparodefi.xyz/sign-in';
                  };
                  
                  // Assemble modal
                  buttonContainer.appendChild(signupBtn);
                  buttonContainer.appendChild(signinBtn);
                  modalContent.appendChild(closeBtn);
                  modalContent.appendChild(icon);
                  modalContent.appendChild(title);
                  modalContent.appendChild(description);
                  modalContent.appendChild(buttonContainer);
                  modal.appendChild(modalContent);
                  
                  // Close when clicking on backdrop
                  modal.onclick = (e) => {
                    if (e.target === modal) {
                      modal.remove();
                    }
                  };
                  
                  // Add to DOM
                  document.body.appendChild(modal);
                  
                  // Prevent body scroll when modal is open
                  document.body.style.overflow = 'hidden';
                  
                  // Restore scroll when modal is closed
                  const restoreScroll = () => {
                    document.body.style.overflow = '';
                  };
                  
                  // Add listener to restore scroll when modal is removed
                  const observer = new MutationObserver((mutations) => {
                    if (!document.getElementById('auth-modal')) {
                      restoreScroll();
                      observer.disconnect();
                    }
                  });
                  observer.observe(document.body, { childList: true });
                }
                
              `,
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );

  // Always render ClerkProvider - components need it to use Clerk hooks
  // If keys aren't configured, Clerk will handle it gracefully
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() || '';
  
  // Configure redirect URLs - these are fallbacks if not specified in components
  const signInFallbackUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL || '/';
  const signUpFallbackUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL || '/';
  
  // Note: Custom domain (accounts.imparodefi.xyz) is configured in Clerk Dashboard
  // Clerk automatically uses the custom domain based on the publishable key
  // The domain prop is not available in ClerkProvider for Next.js
  // Cookie cross-domain handling is managed by Clerk's server configuration
  
  return (
    <ClerkProvider 
      publishableKey={publishableKey}
      signInFallbackRedirectUrl={signInFallbackUrl}
      signUpFallbackRedirectUrl={signUpFallbackUrl}
    >
      {content}
    </ClerkProvider>
  );
}
