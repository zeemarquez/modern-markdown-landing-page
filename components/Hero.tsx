import React from 'react';
import Button from './ui/Button';
import SupademoPlayer from './SupademoPlayer';
import { Download, ArrowRight } from 'lucide-react';
import { useDownloadUrl } from '../hooks/useDownloadUrl';

const Hero: React.FC = () => {
  const { downloadUrl, isLoading } = useDownloadUrl();

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Focus on writing. <br className="hidden md:block" />
            <span className="text-muted-foreground">We handle the rest.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Write, edit, and refine beautiful documents with AI-assisted markdown writing, instant previews, and templates
            tuned to your style and workflow.
          </p>
        </div>
        {/* Mockup Container */}
        <div className="relative mt-12 mx-auto max-w-5xl">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-3xl opacity-20"></div>
          <SupademoPlayer className="relative z-10" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          {downloadUrl ? (
            <a
              href={downloadUrl}
              download
              className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-foreground text-background hover:bg-foreground/90 focus:ring-foreground h-12 px-8 text-base w-full sm:w-auto gap-2"
            >
              <Download size={18} />
              Download for Free
            </a>
          ) : (
            <Button size="lg" className="w-full sm:w-auto gap-2" disabled={isLoading}>
              <Download size={18} />
              {isLoading ? 'Loading...' : 'Download for Free'}
            </Button>
          )}
          <a
            href="https://write.lemba.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-border hover:bg-muted focus:ring-border bg-transparent h-12 px-8 text-base w-full sm:w-auto gap-2 group"
          >
            🚀 Launch online
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-100 blur-3xl opacity-50"></div>
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-100 blur-3xl opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero;