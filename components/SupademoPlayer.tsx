import React from 'react';

const DEFAULT_EMBED_URL = 'https://app.supademo.com/embed/cmkzc67163p4gtw9f2di0739e?embed_v=2&utm_source=embed';
const DEFAULT_TITLE = 'Create and Customize Professional Markdown Documents';

interface SupademoPlayerProps {
  className?: string;
  embedUrl?: string;
  title?: string;
}

const SupademoPlayer: React.FC<SupademoPlayerProps> = ({
  className = '',
  embedUrl = DEFAULT_EMBED_URL,
  title = DEFAULT_TITLE,
}) => {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        boxSizing: 'content-box',
        maxHeight: '80vh',
        width: '100%',
        aspectRatio: '1.83',
        padding: '40px 0',
      }}
    >
      <iframe
        src={embedUrl}
        loading="lazy"
        title={title}
        allow="clipboard-write"
        frameBorder="0"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default SupademoPlayer;
