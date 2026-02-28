import { createContext, useContext, ReactNode } from 'react';

const YoutubePopupContext = createContext<(id: string) => void>(() => {});

export function YoutubePopupProvider({
  children,
  onOpen,
}: {
  children: ReactNode;
  onOpen: (id: string) => void;
}) {
  return (
    <YoutubePopupContext.Provider value={onOpen}>
      {children}
    </YoutubePopupContext.Provider>
  );
}

export const useOpenYoutubePopup = () => useContext(YoutubePopupContext);
