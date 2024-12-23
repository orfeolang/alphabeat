# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Run

```sh
npm run dev
```

## Build a Distribution

1)

```
npm run build
```

This creates a distribution in the ```dist``` folder.

2) In the ```index.html``` file, change the ```/assets/index...css``` and
```/assets/index...js``` links to ```index...css``` and ```index...js```,
and put the CSS and JS files outside the assets folder.

3) Delete the ```assets``` folder.

4) Finally, add ```src/assets/fonts``` and ```src/assets/sounds```.

Example structure:

- index.html
- index-DJ2_fw6A.css
- index-DxmceFAk.js
- src
  - assets
    - fonts/
    - sounds/
