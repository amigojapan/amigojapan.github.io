# Website translations

All 16 public HTML content pages support `?lang=en`, `?lang=ja`, and
`?lang=es`. The dropdown changes the page and updates the current URL without
losing the article's `q` parameter, other parameters, or fragment. Links to
pages in this repository carry the selected language. The Japanese blood
pressure page defaults to Japanese; other pages default to English.

`AIalbum.html` keeps its existing translations and dropdown. Other pages use
`../site-i18n.js`, `../site-i18n.css`, and one generated dictionary per page.
There is no translation service, API key, or network dependency at runtime.
The original HTML remains readable if JavaScript is disabled.

`catalog.json` contains the source strings and translations. Bulk translations
were generated locally with [Argos Translate models](https://github.com/argosopentech/argospm-index)
(English–Spanish and Japanese–English) and an
[NLLB-200 model](https://huggingface.co/JustFrederik/nllb-200-distilled-600M-ct2-int8)
for Japanese, followed by selected
manual corrections to navigation, technical terms, medical text, and prose.
These are machine-assisted translations, not a complete human editorial
review. The English option retains the source text, including the original
bilingual Haggadah. Existing Japanese prose is retained in Japanese mode.
The Japanese blood-pressure page also has an English translation.

Code examples, identity hashes, URLs, and downloadable documents remain in
their original form. `google23aced461d7884c3.html` is a machine-readable Google
verification token, so it must remain unchanged.

To update a translation, edit `catalog.json`, then regenerate dictionaries:

```sh
node scripts/home-fragments.cjs
python3 scripts/collect-translations.py
python3 scripts/build-translations.py
```

Run these commands from the repository root. Collection requires Python's
BeautifulSoup 4 package; building requires only Python's standard library.
The build fails if a new source string lacks Japanese or Spanish text.
Collection covers the homepage's generated articles and the blood-pressure
tools' dialogs and generated results as well as static page text.

For browser regression tests, serve the repository locally and open
`scripts/test-i18n.html`, or run it in Chromium with
`--headless --allow-file-access-from-files --virtual-time-budget=60000 --dump-dom`.
The test checks all pages and homepage articles, language URLs, dropdowns,
restoring English, history changes, internal navigation, code preservation,
translation coverage, and all blood-pressure result branches. The test page
is a developer tool and is excluded from the public-page translation inventory.
