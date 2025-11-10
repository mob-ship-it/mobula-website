import { ui, defaultLang, showDefaultLang } from './ui';

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang as Lang;
}

export function getUrlWithoutLang(url: URL): string {
  const [, langOrPath, ...pathLocale] = url.pathname.split('/');

  if (langOrPath in ui) {
    return `/${pathLocale.join('/')}`;
  } else {
    return `/${langOrPath}${pathLocale.length ? '/' + pathLocale.join('/') : ''}`;
  }
}

export function useTranslations(lang: Lang) {
  return function t<K extends keyof (typeof ui)[typeof defaultLang]>(key: K) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: Lang = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
  };
}

export function getAlternateLangPath(url: URL, targetLang?: Lang): string {
  const currentLang = getLangFromUrl(url);
  const pathNoLang = getUrlWithoutLang(url);
  const nextLang: Lang = targetLang ?? (currentLang === 'en' ? (defaultLang as Lang) : 'en');
  if (!showDefaultLang && nextLang === defaultLang) {
    return pathNoLang;
  }
  return `/${nextLang}${pathNoLang}`;
}
