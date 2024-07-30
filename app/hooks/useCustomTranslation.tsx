import { useTranslation } from "react-i18next";

const useCustomTranslation = (section: string) => {
  const { t } = useTranslation();
  const translatedSection = t(section);

  try {
    const parsedSection = JSON.parse(translatedSection);
    return parsedSection;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};

export default useCustomTranslation;
