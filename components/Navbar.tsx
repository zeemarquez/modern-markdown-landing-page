import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import Button from './ui/Button';
import { useDownloadUrl } from '../hooks/useDownloadUrl';

const Navbar: React.FC = () => {
  const { downloadUrl, isLoading } = useDownloadUrl();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img src="/lemba-logo.png" alt="Lemba" className="h-12 w-auto" />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/features"
              className="inline-flex items-center justify-center rounded-lg border border-border px-3 h-8 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <a
              href="https://write.lemba.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border px-3 h-8 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors hidden sm:flex"
            >
              🚀 Launch online
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
            <a
              href="https://github.com/zeemarquez/lemba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;