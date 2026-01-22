import { useState, useEffect } from 'react';

const GITHUB_RELEASES_API = 'https://api.github.com/repos/zeemarquez/modern-markdown-editor/releases/latest';

export const useDownloadUrl = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDownloadUrl = async () => {
      try {
        const response = await fetch(GITHUB_RELEASES_API);
        if (!response.ok) {
          throw new Error('Failed to fetch release information');
        }
        const data = await response.json();
        
        // Find the .exe asset
        const exeAsset = data.assets?.find((asset: any) => 
          asset.name.endsWith('.exe')
        );
        
        if (exeAsset?.browser_download_url) {
          setDownloadUrl(exeAsset.browser_download_url);
        }
      } catch (error) {
        console.error('Error fetching download URL:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDownloadUrl();
  }, []);

  return { downloadUrl, isLoading };
};
