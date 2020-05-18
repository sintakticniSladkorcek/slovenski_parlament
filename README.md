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

- legenda pri trajanju sej (slikica ue = 5min)
- oznake na slajderju v `session_timeline.js` za vsako menjavo govorca
- oblikuj dropdown meni za izbiro seje (default ni lep)
- dodaj številčni opis trajanja sej (napiši v urah in minutah)
- dodaj opis v `session_timeline.js`
    ```
    Spodaj si lahko ogledaš, kako je potekala posamezna seja. Sejo lahko izbereš v spustnem seznamu. Na vrhu boš videl, kdo je govoril, na desni strani pa lahko spremljaš, kako so se spreminjale ključne besede seje z njenim potekom. Najvišje je beseda, ki se je pojavila največkrat, sledi ji drugouvrščena in tako dalje. Tudi vsi podatki nižje se bodo nanašali na to sejo.
    ```
- dodaj opis v `longest_session.js`
    ```
    Tu lahko vidiš, kako dolga je bila najdaljša izmed sej v primerjavi z najkrajšo. Ena peščena ura predstavlja 5 minut.
    ```
- popravi pot do filov v popular_speakers.js
- prefiltriraj podatke incidentov (na novo sparsaj)
- v `most_votings.js` dodaj poleg imena seje, ki se prikaže, še število glasovanj
- dodaj opis pri glasovanjih, ki razloži, da je to prikaz števila glasovanj v posamezni seji
- sparsaj podatke za najbolj smešno sejo
- sparsaj podatke za najbolj vljudno sejo
- (dodaj še število pojavitev k besedam v session_timeline - maybe)
