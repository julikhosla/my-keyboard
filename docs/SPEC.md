# Bhasha Keyboard — Product & Technical Specification

| | |
|---|---|
| **Product** | Bhasha Keyboard: an on-screen keyboard for Hindi and Odia |
| **Version** | 0.3.0 |
| **Status** | Implemented |
| **Stack** | React 18, React Router 6, Chakra UI 2, Create React App 5 |

---

## 1. Overview

Bhasha Keyboard is a browser-based virtual keyboard for typing Hindi (Devanagari script) and Odia (Odia script) without installing an operating-system input method. The user taps keys on screen, builds text in an editable box, and copies it into any other application.

### 1.1 Goals

- Let someone with no Hindi/Odia keyboard installed type correct, complete words, including vowel signs and conjuncts.
- Give each language its own URL so it can be bookmarked and shared.
- Work equally well on desktop, tablet and phone.
- Speed up repeated typing through saved phrases.
- Be accessible to keyboard and screen-reader users.

### 1.2 Non-goals

- Phonetic or transliteration typing (typing `ka` on a physical keyboard to get क).
- User accounts, cloud sync, or a server-side backend.
- Spell-check, word prediction, or autocorrect.
- Languages other than Hindi and Odia (the architecture supports adding them; see §9).

### 1.3 Intended users

- People who need to write occasional Hindi or Odia text on a device without a native keyboard layout.
- Translators and content teams who repeatedly enter the same terms (the default phrases, "God" and "Word of God", reflect a translation use case).
- Learners: every key shows a Roman-letter label under the native character.

---

## 2. Routes

| Path | Behavior |
|---|---|
| `/` | Redirects to `/hindi` |
| `/hindi` | Hindi keyboard page |
| `/odia` | Odia keyboard page |
| any other path | Redirects to `/hindi` |

Both language pages are rendered by the same `KeyboardPage` component with different data. Each page instance is keyed by language code, so switching languages fully resets in-memory state and loads that language's saved text and phrases.

Routing uses `BrowserRouter` (real paths, not `#` URLs). Static hosts must fall back to `index.html` for unknown paths; see §10.

---

## 3. Functional requirements

### 3.1 Text box

| ID | Requirement |
|---|---|
| T-1 | An editable multi-line text box shows the text being composed, using the language's script font. |
| T-2 | Every key and phrase inserts at the current cursor position. If text is selected, the selection is replaced. |
| T-3 | After an insert, the cursor is placed directly after the inserted text. |
| T-4 | Clicking or tapping a key does not move focus out of the text box, so the cursor stays where it was. |
| T-5 | On touch devices, focusing the text box does **not** open the device's own keyboard (`inputmode="none"`). A physical keyboard can still type into it directly. |
| T-6 | The text is saved to the browser per language and restored on the next visit. |
| T-7 | A character count is shown on screens 480 px and wider. |
| T-8 | On screens below 992 px, the text box and its action buttons stay pinned to the top of the screen while the keys scroll underneath. |

### 3.2 Action buttons

| Button | Behavior | Disabled when |
|---|---|---|
| **Copy** | Copies the full text to the clipboard. Shows a "Copied to clipboard" toast, or an error toast if the browser blocks clipboard access. | Text is empty or only whitespace |
| **Save phrase** | Opens a small form that shows the text to be saved (the selection if there is one, otherwise the whole text, trimmed) and an optional "Meaning" field. Submitting saves it (see §3.4). | Text is empty or only whitespace |
| **Clear** | Empties the text box. | Text is empty |

### 3.3 Keys

| ID | Requirement |
|---|---|
| K-1 | Each key shows the native character large, with its Roman label small underneath. |
| K-2 | Combining marks (vowel signs, halant, anusvara, chandrabindu, visarga, nukta) are displayed on a dotted circle (◌) so they're visible on their own. Only the mark itself is inserted, never the circle. |
| K-3 | All keys are visible together in one compact block, with no scrolling, on laptops, desktops, tablets and typical phones (see §5.2). Groups sit side by side rather than stacked. |
| K-4 | Consonants are laid out as the traditional varga chart: one sound family (5 letters) per half-row, two families per row. |
| K-5 | Each vowel sits directly above its vowel sign (e.g. आ above ा), so finding one finds the other. |
| K-6 | Numbers form a 1–9, 0 keypad on tablet and larger; a single 1…9, 0 row on phones. |
| K-7 | Groups are color-coded (consonants, vowels, vowel signs, signs & numbers), with a one-line legend above the keys instead of section headings. |
| K-8 | Below the groups is a bottom row with **New line** (↵), **Space**, and **Backspace** (⌫). |
| K-9 | Backspace deletes the selection if there is one, otherwise the single Unicode code point before the cursor. So backspacing "कि" first removes the vowel sign ि, leaving क. This matches standard Indic input methods. |
| K-10 | Long labels are cut short with an ellipsis; the full label is available as a tooltip and in the key's accessible name. |

### 3.4 Saved phrases

| ID | Requirement |
|---|---|
| P-1 | Each language has its own list of saved phrases, stored in the browser. |
| P-2 | On first visit, the list is seeded with that language's default phrases (§4.3). Defaults can be deleted like any other phrase. |
| P-3 | Tapping a phrase inserts its text at the cursor and increases its use count by one. |
| P-4 | The list is ordered by use count (most used first). The order is calculated once when the page loads and is not recalculated while the user taps, so items don't move under the user's finger. Phrases added during the visit appear at the top. |
| P-5 | Saving text that exactly matches an existing phrase does not create a duplicate. An "already saved" toast is shown instead. |
| P-6 | Each phrase has a delete (×) button. On large screens it appears on hover or keyboard focus; on smaller screens it is always visible. |
| P-7 | When the list is empty, the panel shows a short explanation of how to save a phrase. |

### 3.5 Appearance

| ID | Requirement |
|---|---|
| A-1 | Light and dark mode, toggled by a sun/moon button in the header. On first visit, the app follows the operating system's setting. |
| A-2 | Five accent colors: Violet (default), Blue, Teal, Pink, Orange. Chosen from a swatch popover in the header. |
| A-3 | Both choices persist across visits and apply to every page. |

---

## 4. Character sets

Roman labels follow the original project's phonetic convention (e.g. इ = "e", उ = "o"), not strict IAST, and are identical across both languages.

### 4.1 Hindi (Devanagari)

| Group | Characters |
|---|---|
| Consonants (by varga) | क ख ग घ ङ · च छ ज झ ञ · ट ठ ड ढ ण · त थ द ध न · प फ ब भ म · य र ल व · श ष स ह |
| Conjuncts | क्ष त्र ज्ञ श्र |
| Vowels | अ आ इ ई उ ऊ ऋ ए ऐ ओ औ |
| Vowel signs | ् (halant) ा ि ी ु ू ृ े ै ो ौ |
| Signs & punctuation | ं ँ ः ़ । ॥ ॰ ऽ ॐ |
| Numbers | ० १ २ ३ ४ ५ ६ ७ ८ ९ |

### 4.2 Odia

| Group | Characters |
|---|---|
| Consonants (by varga) | କ ଖ ଗ ଘ ଙ · ଚ ଛ ଜ ଝ ଞ · ଟ ଠ ଡ ଢ ଣ · ତ ଥ ଦ ଧ ନ · ପ ଫ ବ ଭ ମ · ଯ ର ଲ ଳ ଵ · ଶ ଷ ସ ହ |
| Conjuncts | କ୍ଷ ତ୍ର ଜ୍ଞ ଶ୍ର |
| Vowels | ଅ ଆ ଇ ଈ ଉ ଊ ଋ ଏ ଐ ଓ ଔ |
| Vowel signs | ୍ (hasanta) ା ି ୀ ୁ ୂ ୃ େ ୈ ୋ ୌ |
| Signs & punctuation | ଂ ଁ ଃ ଼ । ॥ ଽ |
| Numbers | ୦ ୧ ୨ ୩ ୪ ୫ ୬ ୭ ୮ ୯ |

Vowels and vowel signs are shown in alternating rows of six: a vowel row, then the matching vowel-sign row beneath it. The halant/hasanta key comes first in the vowel-sign list so it sits under अ/ଅ, because it removes the inherent "a".

### 4.3 Default phrases

| Meaning | Hindi | Odia |
|---|---|---|
| God | परमेश्वर | ପରମେଶ୍ୱର |
| Word of God | परमेश्वर का वचन | ପରମେଶ୍ୱରଙ୍କ ବାକ୍ୟ |

---

## 5. UI & layout

### 5.1 Page structure

1. **Header**: app name, language switcher (pill tabs), accent picker, light/dark toggle. The active tab identifies the language, so there is no separate page title (a visually hidden heading is kept for screen readers).
2. **Text panel**: text box and action buttons.
3. **Saved phrases panel**: beside the text panel on desktop; below the keys on smaller screens.
4. **Keys panel**: legend, key blocks, and the bottom row.

### 5.2 Responsive behavior

Breakpoints are Chakra UI defaults: `sm` 480 px, `md` 768 px, `lg` 992 px.

The keys are arranged as four blocks: **C** consonants (10 columns × 4 rows), **V** vowels and vowel signs (6 × 4), **S** signs (3 columns), and **N** numbers.

| Width | Page layout | Key blocks | Key size (approx.) |
|---|---|---|---|
| < 768 px | Single column; text panel pinned to top while scrolling; phrases below keys | C on top; V and S side by side; N as one row of 10 | 31 × 38 px at 390 px wide |
| 768–991 px | Single column; text panel pinned to top; phrases below keys | C on top; V, S and N (3 × 4 keypad) side by side | 54 × 48 px at 820 px wide |
| ≥ 992 px | Text panel and phrases side by side (2 : 1); keys full width below; header sticky | C, V, S, N all in one row (5 rows of keys including the bottom row) | 38–43 × 48 px |

Below 480 px the header shows "Bhasha" and native language names only, and the character count is hidden.

Verified fits with no scrolling (keyboard fully visible on load): 1366 × 657 (a 1366 × 768 laptop screen minus browser chrome), 1440 × 820, 1100 × 800, 820 × 1080, 390 × 700 (iPhone-sized). Small phones such as 360 × 640 overflow by about 70 px; the pinned text panel keeps typing usable there. The page never scrolls horizontally at these sizes.

### 5.3 Design tokens

All colors are semantic tokens with light and dark values (defined in `src/theme.js`):

| Token | Light | Dark | Used for |
|---|---|---|---|
| `bg.canvas` | #f5f6fb | #0e1016 | Page background |
| `bg.surface` | white | #171a23 | Cards, header, popovers |
| `bg.key` | white | #1f2330 | Key faces |
| `bg.keyHover` / `bg.keyActive` | brand.50 / brand.100 | #282d3d / #323849 | Key hover / pressed |
| `key.vowel.bg` / `.border` | #fff6e5 / #f3dcae | #29231a / #4a3d22 | Vowel keys (warm tint) |
| `key.matra.bg` / `.border` | #eef4ff / #cddffa | #18223a / #2a3c5e | Vowel-sign keys (cool tint) |
| `key.sign.bg` / `.border` | #f2f3f6 / gray.200 | #191c25 / whiteAlpha.200 | Signs, numbers, Enter, Backspace |
| `border.subtle` / `border.default` | gray.100 / gray.200 | whiteAlpha.100 / .200 | Card / key borders |
| `border.accent` | brand.300 | brand.400 | Hover borders |
| `fg.default` / `fg.muted` / `fg.subtle` | gray.800 / .500 / .400 | gray.100 / .400 / .500 | Text hierarchy |
| `fg.accent` | brand.700 | brand.200 | App title, link hover |

The `brand` palette (50–900) is swapped at runtime for the chosen accent by overriding Chakra's `--chakra-colors-brand-*` CSS variables.

**Typography:** Inter for interface text; Noto Sans Devanagari and Noto Sans Oriya for script text, loaded from Google Fonts.

**Shape & elevation:** cards use a 12 px radius (`xl`) and a 1 px border with a soft shadow; keys use an 8 px radius (`lg`).

### 5.4 Interaction states

| Element | Hover | Pressed | Focus (keyboard) | Disabled |
|---|---|---|---|---|
| Key | Accent-tinted background and border | Darker tint, scales to 96% | 2 px accent outline, 2 px offset | n/a |
| Buttons | Chakra defaults for the variant | Chakra defaults | 2 px accent outline | Reduced opacity, no pointer |
| Language tab | Text turns accent color | n/a | 2 px accent outline | Active tab: solid accent fill, white text |

Transitions are 100–150 ms and limited to color, border and transform.

---

## 6. Accessibility

- Every key has an accessible name of the form "*character*, *label*" (e.g. "क, ka"), and the action keys are named "New line", "Space" and "Backspace".
- Each key block is a `<section>` with an accessible label (Consonants, Vowels and vowel signs, Signs and punctuation, Numbers). The color legend is decorative and hidden from screen readers.
- The language switcher is a `<nav>` labelled "Keyboard language"; the current page's tab is marked with `aria-current="page"` by React Router.
- The accent picker is a `radiogroup` with one `radio` per color and `aria-checked` on the selected one.
- The text box has an accessible name ("Hindi text" / "Odia text") and a `lang` attribute (`hi` / `or`) so screen readers pronounce it correctly.
- All interactive elements are reachable with Tab and show a visible focus outline.
- Using keys from the keyboard (Tab to a key, press Enter) keeps focus on that key, so users can continue tabbing.

---

## 7. Data & storage

### 7.1 Language data module

Each language is one file in `src/data/` exporting:

```js
export const meta = {
  code: "hindi",          // storage key suffix and React key
  lang: "hi",             // BCP-47 tag for lang attributes
  path: "/hindi",         // route
  label: "Hindi",         // English name
  nativeLabel: "हिंदी",    // native name
  fontFamily: "'Noto Sans Devanagari', sans-serif",
};

export const commonPhrases = [{ eng: "God", text: "परमेश्वर" }, ...];

export const layout = {
  consonants: [[{ native: "क", label: "ka" }, ...], ...], // one array per varga (≤ 5 keys); shown two per row
  vowels:  [{ native: "अ", label: "a" }, ...],            // 11 keys
  matras:  [{ native: "्", label: "halant" }, ...],        // same order as vowels, so each sits under its vowel
  signs:   [{ native: "ं", label: "anusvara" }, ...],      // shown 3 per row
  numbers: [{ native: "१", label: "1" }, ..., { native: "०", label: "0" }], // 1–9 then 0
};
```

Vargas with fewer than five letters are padded with empty cells so columns stay aligned.

### 7.2 Browser storage (localStorage)

| Key | Value | Notes |
|---|---|---|
| `kb.text.<code>` | JSON string | Current text per language |
| `kb.phrases.<code>` | JSON array of `{ id, text, label, uses }` | Saved phrases per language |
| `kb.accent` | JSON string: `violet` \| `blue` \| `teal` \| `pink` \| `orange` | Unknown values fall back to violet |
| `chakra-ui-color-mode` | `light` \| `dark` | Managed by Chakra UI |

All reads and writes are wrapped so the app still works (without persistence) when storage is unavailable, e.g. in some private-browsing modes. Data stays on the device and is never sent anywhere.

---

## 8. Architecture

```
src/
  App.js                  Router, theme provider, accent CSS variables
  index.js                Entry point; ColorModeScript prevents a light/dark flash on load
  theme.js                Chakra theme, semantic tokens, accent palettes
  App.css                 Base resets, scrollbar styling
  data/
    hindi.js              Hindi meta, key groups, default phrases
    odia.js               Odia meta, key groups, default phrases
  hooks/
    usePersistentState.js useState that mirrors its value to localStorage
  pages/
    KeyboardPage.jsx      Page layout; owns text, phrases, and cursor-aware editing
  components/
    NavBar.jsx            Header, language tabs
    ThemeControls.jsx     Accent picker and light/dark toggle
    OutputPanel.jsx       Text box, Copy / Save phrase / Clear
    Keyboard.jsx          Legend, the four key blocks, and the bottom row
    KeyButton.jsx         A single key; exports shared key styles and the group color tones
    PhrasesPanel.jsx      Saved phrases list
  App.test.js             Integration tests
  setupTests.js           jest-dom and a matchMedia stub for jsdom
public/
  _redirects              Netlify SPA fallback
vercel.json               Vercel SPA fallback
```

### 8.1 Cursor-aware editing

`KeyboardPage` holds a ref to the `<textarea>`. Each edit reads the current `selectionStart` / `selectionEnd`, computes the new text and the new cursor position, stores that position in a ref, and updates state. A layout effect then restores the cursor before the browser paints. Keys call `preventDefault()` on `mousedown` so the textarea never loses focus or its selection when a key is clicked.

### 8.2 Dependencies

| Package | Purpose |
|---|---|
| `react`, `react-dom` 18 | UI |
| `react-router-dom` 6 | Routing |
| `@chakra-ui/react` 2, `@chakra-ui/icons`, `@emotion/*` | Components, theming, icons |
| `react-scripts` 5 | Build tooling (Create React App) |
| `@testing-library/*` | Tests |

---

## 9. Adding a language

1. Create `src/data/<language>.js` with the same exports as §7.1.
2. Import it in `src/App.js` and add it to the `languages` array; a route is created automatically.
3. Add its `meta` to the `languages` list in `src/components/NavBar.jsx`.
4. Add its Noto Sans font to the Google Fonts link in `public/index.html`.

---

## 10. Build, test & deploy

```bash
npm install
npm start          # dev server on http://localhost:3000
npm test           # integration tests
npm run build      # production build in ./build
```

**Automated tests** (`src/App.test.js`) cover: default redirect to the Hindi page; building a syllable from consonant + matra, Space, and Backspace removing a single sign; inserting at the cursor mid-word; inserting a saved phrase; and the Odia route rendering Odia keys.

**Hosting:** the app is a static site. Because it uses real URL paths, the host must serve `index.html` for unknown paths:

- Netlify: handled by `public/_redirects`.
- Vercel: handled by `vercel.json`.
- GitHub Pages: not supported out of the box; needs the 404.html redirect workaround, or switch to `HashRouter` (URLs become `/#/hindi`).
- Any other host (Nginx, S3/CloudFront, etc.): configure a fallback to `index.html`.

---

## 11. Known limitations

- **Device keyboard is suppressed on touch screens** (T-5). Users who want to mix in English on a phone must switch apps or use the physical-keyboard path. A toggle could be added.
- **No sync.** Text and phrases live in one browser on one device; clearing site data deletes them.
- **No phrase editing.** To change a phrase's text or meaning, delete it and save it again.
- **Backspace has no hold-to-repeat.**
- **Fonts load from Google Fonts.** Without network access the browser falls back to a system font, which may render some conjuncts differently.
- **Create React App is no longer maintained.** It works today, but a future migration to Vite is advisable.
- **Odia ଵ (va)** is included for completeness but is rarely used in modern Odia, where ବ covers both sounds.

## 12. Possible next steps

- Phonetic typing from a physical keyboard.
- A setting to allow the device keyboard on touch screens.
- Hold-to-repeat backspace.
- Edit and reorder phrases; import/export phrases as a file.
- Additional scripts (e.g. Ol Chiki for Santali, Bengali).
- Install as an app (PWA) with offline fonts.
