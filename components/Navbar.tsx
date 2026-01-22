import React from 'react';
import { PenTool, Github } from 'lucide-react';
import Button from './ui/Button';
import { useDownloadUrl } from '../hooks/useDownloadUrl';

const Navbar: React.FC = () => {
  const { downloadUrl, isLoading } = useDownloadUrl();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-foreground text-background p-1.5 rounded-lg">
              <PenTool size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">Modern Markdown</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/zeemarquez/modern-markdown-landing-page" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground hidden sm:block">
              <Github size={20} />
            </a>
            {downloadUrl ? (
              <a
                href={downloadUrl}
                download
                className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-foreground text-background hover:bg-foreground/90 focus:ring-foreground h-8 px-3 text-xs"
              >
                Download Now
              </a>
            ) : (
              <Button size="sm" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Download Now'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;