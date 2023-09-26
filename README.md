# react-native-what3words

a react native wrapper for what3words

## Installation

```sh
npm install react-native-what3words
```

## Usage

```js
import What3Words from 'react-native-what3words';

// ...

const API_KEY = '';
const MAP_API_KEY = '';

export default function MapComponent() {
  return (
    <View style={styles.container}>
      <Text>What3Words</Text>
      <What3Words
        apiKey={API_KEY}
        mapApiKey={MAP_API_KEY}
        onEvent={console.log}
      />
    </View>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
