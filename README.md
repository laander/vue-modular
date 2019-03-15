# Vue Modular

> Helps you implement a folder-by-feature module structure in large Vue projects 👷‍👷‍

## Building large Vue projects

When Vue projects grow, the classic [folder-by-type](https://itnext.io/how-to-structure-a-vue-js-project-29e4ddc1aeeb) folder structure can become unmanageable because dependencies across files are hard to refactor and mentally compute.

Instead, you should consider structuring your code into "features" that are encapsulated with their own components, vuex module, routes and more. Think of it as a structural design pattern that encourages encapsulation of related code.

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

Vue.use(VueModular, {
  modules: {
    // each of your modules
    foo,
    bar
  },
  store, // your vuex instance
  router // your vue router instance
})
```

The plugin currently achieves three things:

1. **Vuex stores** defined in each module are registered on the global vuex instance
2. **Vue router** definitions in each module are merged and registered on the global router instance
3. **A vue instance helper** `vm.$modules` is injected into all components which makes it easy to access custom values that each module exports

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

For small and medium-sized projects, the folder-by-type approach is usually simpler to navigate because it's helpful to have all your routes and stores in one place.

If you're a one or two people building a small Vue app, that's usually fine. Don't over-engineer prematurely.

However, when projects grow to hundreds of components with large developer teams working on the same code base, things start to change.

Do remember though that not all your code can or should be self-contained: common components, services, utilities etc. should probably not be modules.

But an authentication module with it's own routes (ex. /login), store (ex. currentUser), tests (ex. login.spec.js) and components (ex. Login.vue) is ideal for encapsulation.

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

Use it, fork it, change it, do what you want.
