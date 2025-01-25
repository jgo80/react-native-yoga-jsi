> **⚠️ Experimental Warning**  
> This library is in its experimental phase and may have breaking changes.

---

## Supported Versions

| Platform    | Supported Versions |
| ----------- | ------------------ |
| **iOS**     | >= 0.73.0          |
| **Android** | >= 0.73.0          |

---

## Aim

This library aims to expose Yoga APIs to javascript, enabling advanced layout functionalities with any canvas or svg.

---

## Installation

To install this library, use the following command:

```bash
npm i react-native-yoga-jsi
```

---

## APIs

### Core API

The core API is the same as Yoga's WASM bindings, enabling the use of any code that depends on yoga-wasm in React Native.

**Core API Docs:**  
Refer to the official [Yoga documentation](https://www.yogalayout.dev/docs/about-yoga) for details on Yoga's features and usage.

### Derived API

The derived API is structured to feel like the standard React Native style API.  
**Features:**

- Declarative syntax similar to React Native's existing StyleSheet API.
- More featues on the way.

---

## Roadmap

| Feature                                        | Status                                                |
| ---------------------------------------------- | ----------------------------------------------------- |
| Core Yoga API bindings                         | 🌕 Implemented                                        |
| Support all react native versions above 0.73.0 | 🌕 Implemented                                        |
| Derived api similar to React Native stylesheet | 🌔 In Progress                                        |
| Internal tests                                 | 🌔 In Progress                                        |
| Compatibility with Reanimated's UI thread      | 🌓 Partly done (Not possible to jump between threads) |
| Provide detailed documentation and examples    | 🌘 In Progress                                        |
| Internal benchmarks                            | 🌘 In Progress                                        |
| Jest mocks                                     | 🌘 In Progress                                        |
| Spacer primitive (like SwiftUI)                | 🌑 Planned                                            |
| Migrate to Nitro Module                        | 🌑 Planned                                            |

---

## Examples

Here are a few examples demonstrating the use of this library:

### Example 1: Text Layout

[View Example](./testProj/src/navigators/children/TextLayout/TextLayout.tsx)

### Example 2: Animated Layout

[View Example](./testProj/src/navigators/children/AnimatedExample/AnimatedExample.tsx)

---

## Architecture

The structural foundation of this library originates from [react-native-quick-crypto](https://github.com/margelo/react-native-quick-crypto/tree/v0.7.11).

---

## Contribution

This library is experimental and open to contributions. Please submit issues, feature requests, or pull requests via the repository.

---

## License

MIT

---

Happy Hacking! 🚀
