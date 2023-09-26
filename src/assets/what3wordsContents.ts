const what3wordsContents = `
<html lang='en'>
<head>
  <title>
    what3words Map
  </title>
  <script type='module' defer
          src='https://cdn.what3words.com/javascript-components@4.1.0/dist/what3words/what3words.esm.js'></script>
  <script nomodule defer
          src='https://cdn.what3words.com/javascript-components@4.1.0/dist/what3words/what3words.js'></script>

  <script>
    window.isNativeApp = true;
  </script>

  <style>
    html, body {
      margin: 0;
      height: 100%;
    }

    #map-container {
      width: 100vw;
      height: 100vh;
    }

    #search-container {
      --padding: 20px;
      position: relative;
      z-index: 1;
      width: 95%;
      padding: var(--padding);
      display: flex;
      justify-content: center;
      transform: translateX(-50%);
    }

    #search-input {
      flex-grow: 1;
      font-size: 68px;
      outline: none;
    }

    .what3words-autosuggest-address {
      font-size: 40px !important;
      line-height: 50px !important;
    }

    .what3words-autosuggest-nearest-place-text > div:first-child {
      font-size: 36px !important;
      line-height: 40px !important;
    }
    .what3words-autosuggest-nearest-place-distance {
      font-size: 36px !important;
      line-height: inherit !important;
    }

    .what3words-autosuggest-message {
      font-size: 30px !important;
      line-height: inherit !important;
    }
  </style>

</head>
<body>
<what3words-map
  id='w3w-map'
  api_key='{{WHAT_3_WORDS_API_KEY}}'
  map_api_key='{{MAP_API_KEY}}'
  {{MAP_EXTRA_ATTRIBUTES}}
>
  <div slot='map' id='map-container'></div>
  <div slot='search-control' id='search-container'>
    <what3words-autosuggest>
      <input
        id='search-input'
        type='text'
        placeholder="e.g. ///filled.count.soap"
        autocomplete='off'
      />
    </what3words-autosuggest>
  </div>
</what3words-map>
</body>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const w3wMap = document.querySelector('what3words-map');

    w3wMap.addEventListener('selected_square', (data) => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'SELECTED_SQUARE',
        data: data.detail,
      }));
    });
  });
</script>
</html>
`;

export default what3wordsContents;
