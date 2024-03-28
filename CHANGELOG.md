<!--

## {version}

⚠️ Breaking change
✨ New
🐞 Fix
♻️ Refactor / Enhance / Update

-->

# Change Log

## 0.1.7

### 🐞 Fix

-   Update `Version` to require a major, minor, patch, and build numbers.
-   Prevent `Version` from having leading zeroes, for example `1.002.3.4`; non-leading zeroes are still permitted.

## 0.1.6

### ✨ New

-   Add `Actions[].OS`, introduced in Stream Deck 6.6.

## 0.1.5

### ✨ New

-   Schemas are now accessible directly under the Elgato domain.
    -   [Manifest schema](https://schemas.elgato.com/streamdeck/plugins/manifest.json)
    -   [Layout schema](https://schemas.elgato.com/streamdeck/plugins/layout.json)

## 0.1.4

### 🐞 Fix

-   Loosen rules on `Version` within manifest to allow more types; valid formats are now `{major}`, `{major}.{minor}`, `{major}.{minor}.{patch}`, and `{major}.{minor}.{patch}.{build}`.

## 0.1.3

### ✨ New

-   Add support for CommonJS.

## 0.1.2

### 🐞 Fix

-   Fix pattern for identifiers (action and plugin UUIDs).

## 0.1.1

### ✨ New

-   Add `imageDimensions` schema type.

## 0.1.0

### ✨ New

-   Add JSON schema for Stream Deck plugin's manifest.
-   Add TypeScript declaration for Stream Deck plugin's manifest.
-   Add JSON schema for Stream Deck plugin's layout.
-   Add TypeScript declaration for Stream Deck plugin's layout.
-   Add custom keyword definitions.
