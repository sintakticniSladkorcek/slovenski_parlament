# slovenski_parlament

This is a repository for visualizing transcribed sessions from Slovenian Parliament from the years between 1990 to 1992.

## How to run

1. First, set up a python's built-in server. For python2, run:

    ```cmd
    python -m SimpleHTTPServer
    ```

    For python3, run:

    ```cmd
    python -m http.server
    ```

2. Paste this link into browser: `http://localhost:8000/index.html`

## Helpful links

Basic functions for working with `xml` in `javascript`: <https://p5js.org/reference/#/p5.XML>  

Basic functions for conversion to `instance mode` for working with more canvases: https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace

`Markdown` cheatsheet: <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet>

## TODO

- dodaj številčni opis trajanja sej (napiši v urah in minutah)
- popravi pot do filov v popular_speakers.js
- v `most_votings.js` dodaj poleg imena seje, ki se prikaže, še število glasovanj
- sparsaj podatke za najbolj vljudno sejo
- (dodaj še število pojavitev k besedam v session_timeline - maybe)
- naredi gumb za klik za incident (oziroma nekako označi, kam naj se klikne)
- za vsako sejo prikaži neke osnovne podatke (tam pri session_timeline), recimo trajanje, število govorov, najpogostejše besede, najdaljša poved, ...
- dodaj opis k starosti, da bi lahka bil eden oče/dedek drugemu
- dodaj legendo za aplavze
