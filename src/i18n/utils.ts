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
  const pathNoLang = getUrlWithoutLang(url); // e.g. '/' or '/projects' or '/proyectos/slug'
  const nextLang: Lang = targetLang ?? (currentLang === 'en' ? (defaultLang as Lang) : 'en');
  const trimmed = pathNoLang.replace(/^\/+/, '').replace(/\/+$/, '');
  const segments = trimmed === '' ? [] : trimmed.split('/');

  let translatedFirst = segments[0] || '';
  if (segments.length > 0) {
    const anchorKeys = Object.keys(ui[currentLang] || {}).filter(k => k.startsWith('anchors.'));
    for (const key of anchorKeys) {
      const valCurr = (ui as any)[currentLang][key];
      const valNext = (ui as any)[nextLang][key];
      const valDefault = (ui as any)[defaultLang][key];
      if (valCurr === segments[0] || valDefault === segments[0] || (ui.en && (ui as any).en[key] === segments[0])) {
        translatedFirst = valNext || segments[0];
        break;
      }
    }
  }
  const rest = segments.slice(1).join('/');
  const combined = [translatedFirst, rest].filter(Boolean).join('/');

  if (!showDefaultLang && nextLang === defaultLang) {
    return combined ? `/${combined}` : '/';
  }
  return combined ? `/${nextLang}/${combined}` : `/${nextLang}`;
}
