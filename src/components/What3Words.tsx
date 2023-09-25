import type { VFC } from 'react';
import React, { useMemo } from 'react';
import WebView, { type WebViewMessageEvent } from 'react-native-webview';
import { getWhat3WordsAsset } from '../utils';

export type What3WordsProps = {
  onSelect?: (data: any) => void;
  apiKey: string;
  mapApiKey: string;
};

const debugging = `
// Debug
window.onerror = function(message, sourcefile, lineno, colno, error) {
  console.log("Error: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
  alert("Message: " + message + " - Source: " + sourcefile + " Line: ");
  return true;
};
true;

`;

export const What3Words: VFC<What3WordsProps> = ({
  apiKey,
  mapApiKey,
  onSelect,
  ...rest
}) => {
  const onMessage = (payload: WebViewMessageEvent) => {
    try {
      const dataPayload = JSON.parse(payload.nativeEvent.data);
      if (!dataPayload) throw new Error('No dataPayload');

      switch (dataPayload.type) {
        case 'SELECTED_SQUARE': {
          onSelect?.(dataPayload.data);
          break;
        }
        default: {
          console.log(dataPayload);
          break;
        }
      }
    } catch (e) {
      console.error('Error parsing payload', e);
    }
  };

  const htmlContent = useMemo(() => {
    const _htmlContent = getWhat3WordsAsset({
      apiKey,
      mapApiKey,
      ...rest,
    });
    return _htmlContent;
  }, [apiKey, mapApiKey, rest]);

  return (
    <WebView
      source={{ html: htmlContent }}
      onMessage={onMessage}
      webviewDebuggingEnabled={true}
      injectedJavaScript={debugging}
    />
  );
};

export default What3Words;
