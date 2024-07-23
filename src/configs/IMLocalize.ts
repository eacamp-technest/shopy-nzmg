import i18n, {Module, ModuleType} from 'i18next';
import az from 'localization/az';
import en from 'localization/en';
import {initReactI18next} from 'react-i18next';
import {findBestLanguageTag} from 'react-native-localize';
import {LocalStorage} from 'store/LocalStorage';

const LANGUAGES = {az, en};
export const LANG_CODES = Object.keys(LANGUAGES);

interface ILanguageDetector extends Module {
  type: ModuleType;
  async: boolean;
  detect: (callback: (lang: string) => void) => void;
  init: () => void;
  cacheUserLanguage: (language: string) => void;
}
const languageDetector: ILanguageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    const storedLanguage = LocalStorage.language('get');
    console.log('storedLanguage', storedLanguage);
    if (!storedLanguage) {
      const bestLanguage = findBestLanguageTag(LANG_CODES)?.languageTag || 'az';
      console.log('bestLanguage', bestLanguage);
      callback(bestLanguage);
      return;
    }

    callback(storedLanguage);
  },
  init: () => {},
  cacheUserLanguage: language => {
    console.log('cacheUserLanguage', language);
    LocalStorage.language('set', language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });
