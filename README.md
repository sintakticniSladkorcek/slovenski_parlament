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

- (dodaj še število pojavitev k besedam v session_timeline - maybe)
- za vsako sejo prikaži neke osnovne podatke (tam pri session_timeline), recimo trajanje, število govorov, najpogostejše besede, najdaljša poved, ...
