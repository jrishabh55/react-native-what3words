import type { VFC } from 'react';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import WebView, { type WebViewMessageEvent } from 'react-native-webview';
import useLocation from '../useLocation';
import { getWhat3WordsAsset } from '../utils';

export type What3WordsProps = {
  onEvent?: (data: { type: string; data: any }) => void;
  apiKey: string;
  mapApiKey: string;
};

export const What3Words: VFC<What3WordsProps> = ({
  apiKey,
  mapApiKey,
  onEvent,
  ...rest
}) => {
  const { location, isLoading } = useLocation();

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
      lat: location?.latitude ?? 0,
      lng: location?.longitude ?? 0,
      ...rest,
    });
    return _htmlContent;
  }, [apiKey, location?.latitude, location?.longitude, mapApiKey, rest]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

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
