import type { VFC } from 'react';
import React, { useMemo } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { getWhat3WordsAsset } from '../utils';

export type What3WordsProps = {
  onEvent?: (data: { type: string; data: any }) => void;
  apiKey: string;
  mapApiKey: string;
  lat?: number;
  lng?: number;
  words?: string;
} & Record<string, unknown>;

export const What3Words: VFC<What3WordsProps> = ({
  apiKey,
  mapApiKey,
  onEvent,
  ...rest
}) => {
  const onMessage = (payload: WebViewMessageEvent) => {
    try {
      const dataPayload = JSON.parse(payload.nativeEvent.data);
      if (!dataPayload) throw new Error('No dataPayload');

      if (!dataPayload.type) throw new Error('No dataPayload.type');

      onEvent?.(dataPayload);
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
      geolocationEnabled={true}
    />
  );
};

export default What3Words;
