import React from 'react';
import Carousel from './ui/Carousel';
import CompareSlider from './ui/CompareSlider';
import SupademoPlayer from './SupademoPlayer';
import { Check } from 'lucide-react';

const AI_EMBED_URL = 'https://app.supademo.com/embed/cml55v9va0271yi0iic22u11q?embed_v=2&utm_source=embed';
const AI_EMBED_TITLE = 'Lemba - New AI Feature';

const Showcase: React.FC = () => {
  // Using standard numerical naming with absolute paths
  const templateImages = [
    'https://raw.githubusercontent.com/zeemarquez/modern-markdown-landing-page/refs/heads/main/resources/images/screenshots_templates/modern.png',
    'https://raw.githubusercontent.com/zeemarquez/modern-markdown-landing-page/refs/heads/main/resources/images/screenshots_templates/modern_2.png',
    'https://raw.githubusercontent.com/zeemarquez/modern-markdown-landing-page/refs/heads/main/resources/images/screenshots_templates/academic.png',
    'https://raw.githubusercontent.com/zeemarquez/modern-markdown-landing-page/refs/heads/main/resources/images/screenshots_templates/dark.png',
  ];

  // Using absolute paths and URL encoding for spaces
  const appScreenshots = {
    raw: 'https://raw.githubusercontent.com/zeemarquez/modern-markdown-landing-page/refs/heads/main/resources/images/screenshots_app/source_mode.png',
    visual: 'https://raw.githubusercontent.com/zeemarquez/modern-markdown-landing-page/refs/heads/main/resources/images/screenshots_app/visual_mode.png'
  };

  return (
    <section id="showcase" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        
        {/* Showcase 1: Templates Carousel */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3 lg:max-w-md order-2 lg:order-1 relative w-full">
             <div className="absolute -inset-4 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>
             <Carousel 
               images={templateImages} 
               className="relative z-10 scale-95 hover:scale-100 transition-transform duration-500" 
             />
          </div>
          <div className="lg:w-3/5 order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Your documents, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">your style.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Forget generic markdown exports. Swipe through our professionally designed library or build your own. Control every detail of the typography and layout.
            </p>
            <ul className="space-y-3">
              {[
                'Fully customizable templates',
                'Front page, header, footer, and content customization',
                'High-fidelity PDF export previews',
                'Variable replacement for reusable content',
                'Shareable style configurations'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <Check size={12} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Showcase 2: AI Assistant */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Write smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">AI Assistant.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Built-in AI helps you draft, refine, and expand your markdown. Get suggestions and edits without leaving the editor—no context switching.
            </p>
            <ul className="space-y-3">
              {[
                'Draft and refine content with AI',
                'Suggestions and edits in-context',
                'Works entirely inside the editor'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                    <Check size={12} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-2/3 relative w-full">
            <div className="absolute -inset-4 bg-violet-100 rounded-2xl blur-3xl opacity-30"></div>
            <SupademoPlayer
              className="relative z-10 scale-95 hover:scale-100 transition-transform duration-500"
              embedUrl={AI_EMBED_URL}
              title={AI_EMBED_TITLE}
            />
          </div>
        </div>

        {/* Showcase 3: Raw vs Visual Slider */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Powerful under the hood. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Simple on the surface.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Drag the slider to see the magic. Write in clean Markdown syntax and watch it transform instantly into a polished document. No context switching, no lag.
            </p>
             <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-gray-50 border border-border">
                   <div className="font-mono text-sm font-bold text-blue-600 mb-2">RAW MODE</div>
                   <p className="text-xs text-muted-foreground">Full control over syntax and frontmatter. Perfect for power users.</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border border-border">
                   <div className="font-sans text-sm font-bold text-purple-600 mb-2">VISUAL MODE</div>
                   <p className="text-xs text-muted-foreground">Focus on flow and structure. Images and tables render as you type.</p>
                </div>
             </div>
          </div>
          <div className="lg:w-2/3 relative w-full">
             <div className="absolute -inset-4 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
             <CompareSlider 
               leftImage={appScreenshots.raw}
               rightImage={appScreenshots.visual}
               className="relative z-10 scale-95 hover:scale-100 transition-transform duration-500" 
             />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Showcase;