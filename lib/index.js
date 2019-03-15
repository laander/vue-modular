// extract and register all module stores
export const registerStores = (modules, store) => {
  Object.keys(modules)
    .filter(mod => typeof modules[mod].store !== 'undefined')
    .forEach(mod => {
      store.registerModule(mod, modules[mod].store)
    })
}

// extract and register all module routers
export const registerRouters = (modules, router) => {
  Object.keys(modules)
    .filter(mod => typeof modules[mod].router !== 'undefined')
    .forEach(mod => {
      const { routes: moduleRoutes, ...moduleMethods } = modules[mod].router
      if (moduleRoutes) {
        // console.log(`Registering router routes`, moduleRoutes)
        router.addRoutes(moduleRoutes)
      }
      if (moduleMethods && Object.keys(moduleMethods).length > 0) {
        Object.keys(moduleMethods).forEach(moduleMethod => {
          const methodName = moduleMethods[moduleMethod].name || moduleMethod
          if (typeof router[methodName] !== 'function') return
          // console.log(`Registering router method`, methodName)
          router[methodName].call(router, moduleMethods[moduleMethod])
        })
      }
    })
}

// main plugin
export default (Vue, { modules, store, router }) => {
  if (
    !modules ||
    typeof modules !== 'object' ||
    Object.keys(modules).length < 1
  ) {
    throw new Error('No modules supplied to package-loader')
  }

  if (store) registerStores(modules, store)
  if (router) registerRouters(modules, router)

  Vue.prototype.$modules = {
    get(name) {
      return modules[name]
    },
    all() {
      return modules
    }
  }
}
