import { useState, useEffect } from 'react';

const GITHUB_RELEASES_API = 'https://api.github.com/repos/zeemarquez/modern-markdown-landing-page/releases';

// Detect user's operating system
const detectOS = (): 'windows' | 'macos' | 'other' => {
  if (typeof window === 'undefined') return 'other';

  // @ts-ignore - navigator.userAgentData is a newer API
  const platform = (window.navigator.userAgentData?.platform || window.navigator.platform || '').toLowerCase();
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
  }) || null;
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
          throw new Error('Failed to fetch releases information');
        }
        const releases = await response.json();

        if (Array.isArray(releases)) {
          // Iterate through releases to find the latest one that HAS the relevant asset
          for (const release of releases) {
            const asset = findAssetForOS(release.assets || [], os);
            if (asset?.browser_download_url) {
              setDownloadUrl(asset.browser_download_url);
              return;
            }
          }

          // Fallback: If no OS-specific asset found in any release, just take the first asset from the latest release
          if (releases.length > 0 && releases[0].assets?.length > 0) {
            setDownloadUrl(releases[0].assets[0].browser_download_url);
          }
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
