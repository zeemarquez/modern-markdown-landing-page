import { useState, useEffect } from 'react';

const GITHUB_RELEASES_API = 'https://api.github.com/repos/zeemarquez/modern-markdown-landing-page/releases/latest';

// Detect user's operating system
const detectOS = (): 'windows' | 'macos' | 'other' => {
  if (typeof window === 'undefined') return 'other';
  
  const platform = window.navigator.platform.toLowerCase();
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // Check for Windows
  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows';
  }
  
  // Check for macOS
  if (platform.includes('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os')) {
    return 'macos';
  }
  
  return 'other';
};

// Find the appropriate asset based on OS
const findAssetForOS = (assets: any[], os: 'windows' | 'macos' | 'other'): any | null => {
  if (!assets || assets.length === 0) return null;
  
  if (os === 'windows') {
    // Look for Windows executables (.exe) or files with Windows/win in the name
    return assets.find((asset: any) => {
      const name = asset.name.toLowerCase();
      return name.endsWith('.exe') || 
             name.includes('windows') || 
             name.includes('win') ||
             name.includes('x64.exe');
    }) || null;
  }
  
  if (os === 'macos') {
    // Look for macOS installers (.dmg, .pkg) or files with macOS/osx/mac in the name
    return assets.find((asset: any) => {
      const name = asset.name.toLowerCase();
      return name.endsWith('.dmg') || 
             name.endsWith('.pkg') ||
             name.includes('macos') || 
             name.includes('osx') ||
             name.includes('mac');
    }) || null;
  }
  
  // For other OS, try to find any executable or installer
  return assets.find((asset: any) => {
    const name = asset.name.toLowerCase();
    return name.endsWith('.exe') || 
           name.endsWith('.dmg') || 
           name.endsWith('.pkg') ||
           name.endsWith('.deb') ||
           name.endsWith('.rpm');
  }) || assets[0] || null;
};

export const useDownloadUrl = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDownloadUrl = async () => {
      try {
        const os = detectOS();
        const response = await fetch(GITHUB_RELEASES_API);
        if (!response.ok) {
          throw new Error('Failed to fetch release information');
        }
        const data = await response.json();
        
        // Find the appropriate asset for the user's OS
        const asset = findAssetForOS(data.assets || [], os);
        
        if (asset?.browser_download_url) {
          setDownloadUrl(asset.browser_download_url);
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
