# Vue Modular

> Helps you implement a folder-by-feature module structure in large Vue projects 👷‍👷‍

![CircleCI](https://img.shields.io/circleci/project/github/laander/vue-modular/master.svg)
![npm](https://img.shields.io/npm/v/vue-modular.svg)

## Building large Vue projects

When Vue projects grow, the classic [folder-by-type](https://itnext.io/how-to-structure-a-vue-js-project-29e4ddc1aeeb) folder structure can become unmanageable because dependencies across files are hard to refactor and mentally compute.

Instead, you should consider [structuring your code into "features"](https://softwareengineering.stackexchange.com/a/338610) that are encapsulated with their own components, vuex module, routes and more. Think of it as a structural design pattern that encourages encapsulation of related code.

The main purpose of this repo is simply to **prescribe a scalable project structure**. To ease the setup, this simple [Vue plugin](https://vuejs.org/v2/guide/plugins.html) helps you do that easily by extracting vuex stores and router definitions from each module and registering them globally.

## Plugin installation

Install the NPM module

```bash
yarn add vue-modular
```

In your main.js (or equivalent), add

```javascript
import VueModular from 'vue-modular'
import foo from './modules/foo'
import bar from './modules/bar'

// simplified for example purpose
const router = new Router()
const store = new Vuex.Store()

// install the plugin with modules and router + store references
Vue.use(VueModular, {
  modules: {
    foo,
    bar
  },
  router,
  store
})
```

The plugin currently achieves three things:

1. **Vuex stores** defined in each module are registered on the global vuex instance
2. **Vue router** definitions in each module are merged and registered on the global router instance
3. **A vue instance helper** `vm.$modules` is injected into all components which makes it easy to access custom values that each module can export

## Recommended setup

> Please see the [example](https://github.com/laander/vue-modular/tree/master/example) folder for a reference setup

Choose a folder structure that will with your local modules. Each module can be simple (`foo` below) or complex (`bar` below), depending on your need.

```
modules/
│
├── foo/
│   ├── index.js
│   ├── router.js
│   ├── store.js
│   └── ComponentA.vue
│
└── bar/
    ├── index.js
    ├── router.js
    ├── store/
    │   ├── mutations.js
    │   ├── actions.js
    │   └── getters.js
    │
    ├── views/
    │   ├── PageA.vue
    │   └── PageB.vue
    │
    ├── services/
    │   ├── datasource.js
    │   └── tracking.js
    │
    └── tests/
        ├── services.spec.js
        └── views.spec.js
```

There's technically no restriction on how you structure your directory tree or what you name your files, as long as each module exports an object like this

```javascript
// modules/foo/index.js

import router from './router.js'
import store from './store.js'

export default {
  router, // module vue router (if any)
  store, // module vuex store (if any)
  custom: {
    // optional extra info you to share
    foo: 'bar'
  }
}
```

The router and store objects are exactly what you'd expect and know from Vuex modules and Vue Router definitions

```javascript
// modules/foo/router.js

import ComponentA from './ComponentA.vue'

export default {
  routes: [
    {
      path: '/foo',
      name: 'foo',
      component: ComponentA
    }
  ],
  beforeEach: (to, from, next) => {
    next()
  }
}
```

```javascript
// modules/foo/store.js

export default {
  namespaced: true,
  state: {
    foo: []
  },
  mutations: {
    setFoo(state, foo) {
      state.foo = foo
    }
  },
  getters: {
    getFoo(state) {
      return state.foo
    }
  }
}
```

## When to use it

### Don't over-engineer prematurely

For small and medium-sized projects, the folder-by-type approach is usually simpler to navigate because it's helpful to have all your routes and stores in one place.

If you're a one or two people building a small Vue app, that's usually fine.

### LIFT your code base

When projects grow to hundreds of components with large developer teams working on the same code base, things start to change.

What you're looking to achieve can be abbreviated LIFT: Structure the app such that you can **Locate** code quickly, **Identify** the code at a glance, keep the **Flattest** structure you can, and **Try** to be DRY

Do remember though that not all your code can or should be self-contained: base UI components, API client, general purpose utilities etc. should probably not be modules.

But an authentication module with it's own routes (ex. /login), store (ex. currentUser), tests (ex. login.spec.js) and view components (ex. Login.vue) is ideal for encapsulation.

## Tips & tricks

### Exposing stuff from modules

As a thumb rule, the more isolated you can keep your modules from each other and the rest of your codebase, the easier it will be to maintain.

However, sometimes you do want to export a component, service or utility function for other code to use. In these cases, I recommend that you do it explicitly and only from your module's `index.js`

```javascript
// modules/foo/index.js

import ComponentA from './ComponentA.vue'
import { utilityFunction } from './utilities.js'

export { ComponentA, utilityFunction }
```

```javascript
// somewhere-else.js

import { ComponentA, utilityFunction } from './modules/foo'
```

This achieves two things:

1. The import statement reads well and is self explanatory i.e. _import x from module foo_
2. It's a lot easier to refactor and modify your module afterwards, because it's explicit what is exposed outside of your module. You can even change file names and still keep the named exports outwards in order to not break other stuff while refactoring.

### Lazy load modules async

When your code base grows, bundling everything together in one giant chunk results in a big up-front download for code that the client might never use.

Instead, consider using code splitting by loading your modules only when needed. You can do this inside each module with [lazy loading routes](https://router.vuejs.org/guide/advanced/lazy-loading.html#grouping-components-in-the-same-chunk), or you can load in entire module definitions with the `registerModules` function and [webpack's dynamic imports](https://webpack.js.org/guides/code-splitting#dynamic-imports)

```javascript
import { registerModules } from 'vue-modular'

const { default: foo } = await import('./modules/foo')
registerModules({ foo })
```

## Contribute

For the repo and install dependencies

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

PRs and issues are welcome!

## License

[MIT](http://opensource.org/licenses/MIT)

Use it, fork it, change it, do what you want 🖖
