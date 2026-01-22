import React, { useState, useRef, useEffect } from 'react';
import { Loader2, ExternalLink } from 'lucide-react';
import Button from './Button';

interface MockInterfaceProps {
  mode?: 'editor' | 'templates' | 'split';
  className?: string;
}

const MockInterface: React.FC<MockInterfaceProps> = ({ mode, className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Base URL of the live app
  const baseUrl = "https://app.markdown-app.com/";
  
  // Construct URL with mode and theme override
  const buildUrl = () => {
    const url = new URL(baseUrl);
    // Add theme as query parameter (most common approach)
    url.searchParams.set('theme', 'light');
    // Also add theme to hash for apps that read from hash
    if (mode) {
      // Preserve mode and add theme to hash (using & separator)
      url.hash = `${mode}&theme=light`;
    } else {
      url.hash = 'theme=light';
    }
    return url.toString();
  };
  
  const appUrl = buildUrl();
  
  // Force light theme via postMessage after iframe loads
  useEffect(() => {
    if (!isLoading && iframeRef.current?.contentWindow) {
      // Try multiple common theme override methods
      const tryThemeOverride = () => {
        const iframeWindow = iframeRef.current?.contentWindow;
        if (!iframeWindow) return;
        
        // Method 1: postMessage with theme override
        iframeWindow.postMessage({ type: 'setTheme', theme: 'light' }, '*');
        iframeWindow.postMessage({ type: 'theme', value: 'light' }, '*');
        iframeWindow.postMessage({ action: 'setTheme', theme: 'light' }, '*');
        
        // Method 2: Try to access localStorage (may fail due to cross-origin)
        try {
          iframeWindow.postMessage({ 
            type: 'localStorage', 
            method: 'setItem', 
            key: 'theme', 
            value: 'light' 
          }, '*');
        } catch (e) {
          // Ignore cross-origin errors
        }
      };
      
      // Try immediately and after a short delay
      tryThemeOverride();
      const timeout = setTimeout(tryThemeOverride, 500);
      const timeout2 = setTimeout(tryThemeOverride, 1500);
      
      return () => {
        clearTimeout(timeout);
        clearTimeout(timeout2);
      };
    }
  }, [isLoading]);

  return (
    <div className={`rounded-xl border border-border bg-white shadow-2xl overflow-hidden flex flex-col group ${className}`}>
      {/* Window Title Bar */}
      <div className="h-10 bg-white border-b border-border flex items-center px-4 justify-between shrink-0 z-20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5 bg-muted px-2 py-0.5 rounded">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            Live Preview
          </div>
        </div>
        <div className="flex items-center">
          <a 
            href={baseUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            title="Open app in new tab"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Embedded App Area */}
      <div className="relative overflow-hidden h-[500px] md:h-[600px] lg:h-[650px] bg-[#fafafa]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-sm font-medium text-muted-foreground">Connecting to app.markdown-app.com...</p>
          </div>
        )}
        
        <iframe
          ref={iframeRef}
          src={appUrl}
          className={`w-full h-full border-none transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          title="Modern Markdown Editor Preview"
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />

        {/* Interaction Overlay (Optional: only shows on hover for non-hero sections to prevent accidental scrolling) */}
        {mode && isLoading === false && (
          <div className="absolute inset-0 bg-black/0 pointer-events-none group-hover:bg-black/5 transition-colors duration-300">
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground shadow-sm">
                   Click to interact with the live editor
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterface;