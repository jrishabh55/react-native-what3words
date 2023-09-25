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
      margin: 10px 0 0 10px;
    }

    #search-input {
      width: 300px;
    }

    #current-location-container {
      margin: 0 10px 10px 0;
    }
  </style>

</head>
<body>
<what3words-map
  id='w3w-map'
  api_key='{{WHAT_3_WORDS_API_KEY}}'
  map_api_key='{{MAP_API_KEY}}'
  disable_default_ui
  fullscreen_control
  map_type_control
  zoom_control
  fullscreen_control
  disable_default_ui
  map_type_id="satellite"
  current_location_control_position='9'
  fullscreen_control_position='3'
  search_control_position='2'
  {{EXTRA_ATTRIBUTES}}
>
  <div slot='map' id='map-container'></div>
  <div slot='search-control' id='search-container'>
    <what3words-autosuggest>
      <input
        id='search-input'
        type='text'
        placeholder='Find your address'
        autocomplete='off'
      />
    </what3words-autosuggest>
  </div>
  <div slot='current-location-control' id='current-location-container'>
    <button>Current Location</button>
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
