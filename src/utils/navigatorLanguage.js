export default () => {
  const language = (navigator.languages && navigator.languages[0]) ||
                     navigator.language ||
                     navigator.userLanguage;
  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
  return languageWithoutRegionCode;
};
