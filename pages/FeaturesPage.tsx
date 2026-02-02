import React from 'react';
import Navbar from '../components/Navbar';
import SupademoPlayer from '../components/SupademoPlayer';

const AI_EMBED_URL = 'https://app.supademo.com/embed/cml55v9va0271yi0iic22u11q?embed_v=2&utm_source=embed';
const AI_EMBED_TITLE = 'Markdown Editor - New AI Feature';

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <section className="relative pt-12 pb-24 md:pt-20 md:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
                AI Assistant
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                See how the built-in AI assistant helps you write and refine your markdown documents.
              </p>
            </div>
            {/* Embed Container - same style as Hero */}
            <div className="relative mt-12 mx-auto max-w-5xl">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-3xl opacity-20"></div>
              <SupademoPlayer
                className="relative z-10"
                embedUrl={AI_EMBED_URL}
                title={AI_EMBED_TITLE}
              />
            </div>
          </div>

          {/* Background Decor - match Hero */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-100 blur-3xl opacity-50"></div>
            <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-100 blur-3xl opacity-50"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FeaturesPage;
