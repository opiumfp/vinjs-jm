import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface DeviceState {
  isMobile: boolean;
  isMobileOnly: boolean;
  isTablet: boolean;
  isBrowser: boolean;
  isIE: boolean;
  isEdge: boolean;
  isShowVideo: boolean;
  noPrlx: boolean;
}

const DeviceContext = createContext<DeviceState | null>(null);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [device, setDevice] = useState<DeviceState | null>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues with react-device-detect
    import('react-device-detect').then((dd) => {
      const deviceData: DeviceState = {
        isMobile: dd.isMobile,
        isMobileOnly: dd.isMobileOnly,
        isTablet: dd.isTablet,
        isBrowser: dd.isBrowser,
        isIE: dd.isIE,
        isEdge: dd.isEdge,
        isShowVideo: dd.isBrowser && !dd.isIE && !dd.isEdge,
        noPrlx: dd.isEdge || dd.isIE,
      };
      setDevice(deviceData);

      // Apply device classes to html element (preserves SCSS selectors)
      const htmlTag = document.querySelector('html');
      if (htmlTag) {
        if (deviceData.isMobile) htmlTag.classList.add('mobile');
        if (deviceData.isMobileOnly) htmlTag.classList.add('mobile-only');
        if (deviceData.isTablet) htmlTag.classList.add('tablet');
        if (deviceData.isBrowser) htmlTag.classList.add('browser');
        if (deviceData.isIE) htmlTag.classList.add('ie');
        if (deviceData.isEdge) htmlTag.classList.add('edge');
      }
    });
  }, []);

  return <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>;
}

export const useDevice = () => useContext(DeviceContext);
