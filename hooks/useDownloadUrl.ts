import { useState, useEffect } from 'react';

const GITHUB_RELEASES_API = 'https://api.github.com/repos/zeemarquez/modern-markdown-landing-page/releases';

type OS = 'windows' | 'macos' | 'other';
type Arch = 'arm64' | 'x64' | 'unknown';

interface DeviceInfo {
  os: OS;
  arch: Arch;
}

// Detect user's operating system and architecture
const detectDeviceInfo = async (): Promise<DeviceInfo> => {
  if (typeof window === 'undefined') return { os: 'other', arch: 'unknown' };

  // @ts-ignore
  const uaData = window.navigator.userAgentData;
  // @ts-ignore
  const platform = (uaData?.platform || window.navigator.platform || '').toLowerCase();
  const userAgent = window.navigator.userAgent.toLowerCase();

  let os: OS = 'other';
  if (platform.includes('win') || userAgent.includes('windows')) {
    os = 'windows';
  } else if (platform.includes('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os')) {
    os = 'macos';
  }

  let arch: Arch = 'unknown';

  // 1. Try modern userAgentData API
  if (uaData?.getHighEntropyValues) {
    try {
      const hints = await uaData.getHighEntropyValues(['architecture']);
      if (hints.architecture === 'arm') arch = 'arm64';
      else if (hints.architecture === 'x86') arch = 'x64';
    } catch (e) {
      // Ignore error and fall back
    }
  }

  // 2. Fallback for macOS (detect Apple Silicon)
  if (os === 'macos' && arch === 'unknown') {
    // Macs with 8+ cores are very likely ARM (M1/M2/M3) if they are recent.
    // Also, Safari on ARM Mac returns 'MacIntel' in navigator.platform, 
    // but we can check for specific WebGL renderer or other hints.
    const isAppleSilicon = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            return renderer.includes('Apple');
          }
        }
      } catch (e) { }
      return false;
    };

    if (isAppleSilicon()) {
      arch = 'arm64';
    } else {
      arch = 'x64';
    }
  }

  // 3. Fallback for Windows
  if (os === 'windows' && arch === 'unknown') {
    if (userAgent.includes('win64') || userAgent.includes('x64')) arch = 'x64';
    else if (userAgent.includes('arm')) arch = 'arm64';
  }

  return { os, arch };
};

// Find the appropriate asset based on OS and architecture
const findAssetForDevice = (assets: any[], info: DeviceInfo): any | null => {
  if (!assets || assets.length === 0) return null;

  const { os, arch } = info;

  if (os === 'windows') {
    return assets.find((asset: any) => {
      const name = asset.name.toLowerCase();
      return name.endsWith('.exe') && (name.includes('win') || name.includes('windows'));
    }) || null;
  }

  if (os === 'macos') {
    // Filter for macOS assets
    const macAssets = assets.filter((asset: any) => {
      const name = asset.name.toLowerCase();
      return name.endsWith('.dmg') || name.endsWith('.pkg') || name.includes('macos');
    });

    if (macAssets.length === 0) return null;

    // Prefer specific architecture if detected
    if (arch === 'arm64') {
      const armAsset = macAssets.find(a => a.name.toLowerCase().includes('arm64') || a.name.toLowerCase().includes('m1') || a.name.toLowerCase().includes('m2'));
      if (armAsset) return armAsset;
    } else if (arch === 'x64') {
      const x64Asset = macAssets.find(a => a.name.toLowerCase().includes('x64') || a.name.toLowerCase().includes('intel'));
      if (x64Asset) return x64Asset;
    }

    // Default to first mac asset if specific one not found
    return macAssets[0];
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
        const deviceInfo = await detectDeviceInfo();
        const response = await fetch(GITHUB_RELEASES_API);
        if (!response.ok) {
          throw new Error('Failed to fetch releases information');
        }
        const releases = await response.json();

        if (Array.isArray(releases)) {
          for (const release of releases) {
            const asset = findAssetForDevice(release.assets || [], deviceInfo);
            if (asset?.browser_download_url) {
              setDownloadUrl(asset.browser_download_url);
              return;
            }
          }

          // Fallback: If no specific asset found, take the first asset from latest
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
