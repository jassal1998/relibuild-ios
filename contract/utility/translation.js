import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationSP from './sp.json';
import translationENG from "./en.json";

import AsyncStorage from "@react-native-async-storage/async-storage";

const GOOGLE_TRANSLATE_API_KEY = "AIzaSyCBzdvSSdPhOsswLd4bKd_kS1GYCLl_L_s";

const fetchGoogleTranslation = async (text, targetLang) => {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          q: text,
          target: targetLang,
          source: "en",
          format: "text",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data?.error) {
      console.error("Google Translate API Error:", data.error);
      return text;
    }

    return data?.data?.translations?.[0]?.translatedText || text;
  } catch (error) {
    console.error("Translation API Error:", error);
    return text;
  }
};

const saveToAsyncStorage = async (lng, key, translatedText) => {
  try {
    const storedData = await AsyncStorage.getItem("missingTranslations");
    const translations = storedData ? JSON.parse(storedData) : {};

    if (!translations[lng]) {
      translations[lng] = {};
    }
    translations[lng][key] = translatedText;

    await AsyncStorage.setItem("missingTranslations", JSON.stringify(translations));
    console.log(`📥 Saved to AsyncStorage: [${lng}] ${key} → ${translatedText}`);
  } catch (error) {
    console.error("Failed to save translation to AsyncStorage:", error);
  }
};

const handleMissingKey = async (lng, key) => {
  try {
    const translatedText = await fetchGoogleTranslation(key, lng);
    if (translatedText) {
      console.log(`✅ Adding translation: [${lng}] ${key} → ${translatedText}`);
      saveToAsyncStorage(lng, key, translatedText);
      i18n.addResource(lng, "translation", key, translatedText);
      i18n.changeLanguage(i18n.language);
    }
    return translatedText;
  } catch (error) {
    console.error("❌ Failed to add missing translation:", error);
    return key;
  }
};

const resources = {

  es: { translation: translationSP },
  en: { translation: translationENG },

};

const initLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem("I18N_LANGUAGE");
    return storedLanguage || "en";
  } catch (error) {
    console.error("Failed to get language from AsyncStorage:", error);
    return "en";
  }
};

initLanguage().then((language) => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: "en",
      keySeparator: false,
      interpolation: {
        escapeValue: false,
      },
      saveMissing: true,
      missingKeyHandler: (lng, ns, key) => {
        const selectedLang = i18n.language || "es";
        if (selectedLang !== "en") {
          return handleMissingKey(selectedLang, key);
        }
      },
    });

  AsyncStorage.setItem("I18N_LANGUAGE", language);
});

export default i18n;