# Talkie Web App

## Build Setup

```bash
# install dependencies
yarn install

# serve with hot reload at port 8080
yarn serve

# build for production with minification
yarn build

# unit testing
yarn test:unit

# linting
yarn lint
```

## Project Structure

```
.
├── dist                    # Compiled files (not tracked)
├── src                     # Source files
│   ├── api                 # Api services, client and config
│   ├── assets              # Brand assets (images, fonts)
│   ├── components          # App modules, ui elements and manipulators
│   │   ├── Layouts         # Layouts (dark, light, grids, header, footer)
│   │   ├── Modules         # Page level reusable components (will be used in views)
│   │   ├── SubModules      # Component level reusable components (will be used in modules)
│   │   ├── SVGs            # SVG components
│   │   ├── UIActions       # UI manipulators (to make/indicate ui change)
│   │   ├── UICore          # Core elements with theming and variants (buttons, input etc)
│   ├── router              # App routing, urls (will use views)
│   ├── store               # Global store/state management
│   ├── styles              # Global styles, theming
│   ├── utils               # App utilities, helpers, validations, mixins, constants
│   ├── views               # Pages and flows (uses modules from components)
│   ├── App.vue             # Vue App
│   ├── main.js             # Entry point
├── tests                   # Unit tests
```
