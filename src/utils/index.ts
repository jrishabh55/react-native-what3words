import what3wordsContents from '../assets/what3wordsContents';

export const getWhat3WordsAsset = (
  arg: {
    apiKey: string;
    mapApiKey: string;
  } & Record<string, string>
) => {
  const { apiKey, mapApiKey, ...rest } = arg;
  return replaceAttrs(what3wordsContents, {
    WHAT_3_WORDS_API_KEY: apiKey,
    MAP_API_KEY: mapApiKey,
    EXTRA_ATTRIBUTES: parseExtraAttributes(rest),
  });
};

export const replaceAttrs = (str: string, obj: Record<string, string>) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return acc.replace(`{{${key}}}`, value);
  }, str);
};

export const parseExtraAttributes = (obj: Record<string, string>) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return acc + ` ${key}='${value}'`;
  }, '');
};
