> **⚠️ Experimental Warning**  
> This library is in its experimental phase and may have breaking changes. It is considered **unstable** and may have issues. Do not use in production.

---

## Supported Versions

| Platform    | Supported Versions |
| ----------- | ------------------ |
| **iOS**     | Above 0.73.0       |
| **Android** | 0.73.\*            |

---

## Aim

This library aims to expose Yoga APIs to javascript, enabling advanced layout functionalities with any canvas or svg.

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

| Feature                                     | Status         |
| ------------------------------------------- | -------------- |
| Core Yoga API bindings                      | ✅ Implemented |
| Derived React Native style like API         | 🚧 In Progress |
| Performance optimizations                   | 🚧 In Progress |
| Write tests                                 | 🚧 In Progress |
| Support more Android versions               | 📝 Planned     |
| Compatibility with Reanimated's UI thread   | 📝 Planned     |
| Spacer primitive (SwiftUI like)             | 📝 Planned     |
| Migrate to Nitro Module                     | 📝 Planned     |
| Improved TypeScript support                 | 📝 Planned     |
| Provide detailed documentation and examples | 📝 Planned     |

---

## Examples

Here are a few examples demonstrating the use of this library:

### Example 1: Text Layout with Core API

[View Example](./testProj/src/navigators/children/TextLayout/TextLayout.tsx)

### Example 2: Animated Layout with Derived API

[View Example](./testProj/src/navigators/children/AnimatedExample/AnimatedExample.tsx)

---

## Contribution

This library is experimental and open to contributions. Please submit issues, feature requests, or pull requests via the repository.

---

## License

MIT

---

Happy Coding! 🚀
