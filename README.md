# Vue Modular

> Helps you implement a folder-by-feature module structure in large Vue projects

## Why?

When Vue projects grow, the classic [folder-by-type](https://itnext.io/how-to-structure-a-vue-js-project-29e4ddc1aeeb) folder structure can become unmanageable because dependencies across files are hard to refactor and mentally compute.

Instead, you should consider structuring your code into "features" that are encapsulated with their own components, vuex module, routes and more.

This simple plugin helps you do that easily by extracting vuex stores and router definitions from each module and registering them globally.

## How?

> Please see the [example](github.com) folder for a reference setup

Create a folder sturcture with your local modules

```
modules/
├── foo/
│   ├── index.js
│   ├── store.js
│   ├── router.js
│   └── ComponentA.vue
└── bar/
    ├── index.js
    ├── store.js
    ├── router.js
    └── ComponentB.vue
```

There's technically no restriction on how you structure your file tree or how you name your files, as long as each module exports an object like this

```javascript
// modules/foo/index.js

import store from './store.js'
import router from './router.js'

export default {
  store, // module vuex store (if any)
  router, // module vue router (if any)
  custom: {
    // optional extra info you to share
    foo: 'bar'
  }
}
```

Install the NPM module

```shell
yarn install vue-modular
```

In your main.js (or equivalent), add

```javascript
import VueModular from 'vue-modular'
import foo from './modules/foo'
import bar from './modules/bar'

Vue.use(VueModular, {
  modules: {
    foo,
    bar
  },
  store,
  router
})
```

This achieves three things:

1. Vuex stores defined in each module are registered on the global vuex instance
2. Vue router definitions in each module are merged and registered on the global router instance
3. A helper `vm.$modules` is injected into all components which makes it easy to access custom values that each module exports

## When?

For small and medium-sized projects, the folder-by-type approach is usually simpler to navigate because it's helpful to e.g. have all your routes in one place.

Don't optimize prematurely.

However, when projects grow to hundreds of components with large developer teams working on the same code base, things start to change.

Not all your code can or should be self-contained: common components, services, utilities etc. should probably not be modules.

But an auth module with it's own routes (ex. /login), store (ex. currentUser), tests (ex. login.spec.js) and components (ex. Login.vue) is ideal for encapsulation.

## Contribute

```bash
# Serve example app
yarn serve

# Production build
yarn build

# Run unit tests
yarn test:unit

# Lint files
yarn lint
```

## License

[MIT](http://opensource.org/licenses/MIT)

Use it, fork it, change it, do what you want.
