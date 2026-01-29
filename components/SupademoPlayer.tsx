import React from 'react';

const SupademoPlayer: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div
            className={`relative w-full ${className}`}
            style={{
                boxSizing: 'content-box',
                maxHeight: '80vh',
                width: '100%',
                aspectRatio: '1.83',
                padding: '40px 0'
            }}
        >
            <iframe
                src="https://app.supademo.com/embed/cmkzc67163p4gtw9f2di0739e?embed_v=2&utm_source=embed"
                loading="lazy"
                title="Create and Customize Professional Markdown Documents"
                allow="clipboard-write"
                frameBorder="0"
                allowFullScreen
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    );
};

export default SupademoPlayer;
