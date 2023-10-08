import what3wordsContents from '../assets/what3wordsContents';
import { mapComponentAttrs } from '../config';

export type ValueType = string | boolean | number;

export const getWhat3WordsAsset = (
  arg: {
    apiKey: string;
    mapApiKey: string;
  } & Record<string, ValueType>
) => {
  const { apiKey, mapApiKey, ...rest } = arg;
  const args = {
    WHAT_3_WORDS_API_KEY: apiKey,
    MAP_API_KEY: mapApiKey,
    SEARCH_CONTROL_TRANSFORM: !rest.words ? 'translateX(-50%)' : 'unset',
    MAP_EXTRA_ATTRIBUTES: parseExtraAttributes({
      ...mapComponentAttrs,
      ...rest,
    }),
  };
  return replaceAttrs(what3wordsContents, args);
};

export const replaceAttrs = (str: string, obj: Record<string, ValueType>) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return acc.replace(`{{${key}}}`, value.toString());
  }, str);
};

export const parseExtraAttributes = (obj: Record<string, ValueType>) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return acc + ` ${key}='${value}'\n`;
  }, '');
};
