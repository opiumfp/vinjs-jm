'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { SupportedLocale } from '@/lib/i18n';

const LOCALES: { code: SupportedLocale; flag: string; labelKey: string }[] = [
  { code: 'en', flag: 'en.svg', labelKey: 'language.en' },
  { code: 'uk', flag: 'ua.svg', labelKey: 'language.uk' },
  { code: 'pl', flag: 'pl.svg', labelKey: 'language.pl' },
  { code: 'de', flag: 'de.svg', labelKey: 'language.de' },
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const currentLang = (i18n.language?.split('-')[0] || 'en') as SupportedLocale;
  const current = LOCALES.find((l) => l.code === currentLang) ?? LOCALES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLocale) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="dropup language-switcher-dropdown d-inline-block" ref={dropdownRef}>
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle d-inline-flex align-items-center py-1 m-1"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t(current.labelKey)}
      >
        <img
          className="flag"
          src={`${basePath}/assets/images/flags/${current.flag}`}
          alt=""
          loading="lazy"
          decoding="async"
          width={24}
          height={18}
        />
        <span className="label ms-1">{t(current.labelKey)}</span>
      </button>
      {open && (
        <div className="dropdown-menu show" role="menu">
          {LOCALES.map(({ code, flag, labelKey }) => (
            <button
              key={code}
              type="button"
              className={`dropdown-item d-flex align-items-center ${currentLang === code ? 'active' : ''}`}
              onClick={() => handleSelect(code)}
              role="menuitem"
            >
              <img
                className="flag mr-2"
                src={`${basePath}/assets/images/flags/${flag}`}
                alt=""
                width={24}
                height={18}
              />
              {t(labelKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
