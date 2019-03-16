import Router from 'vue-router'
import { createLocalVue } from '@vue/test-utils'
import { registerModuleRouter, reset } from '../../lib'

describe('Vue router', () => {
  let module
  let router

  beforeEach(() => {
    reset()
    const localVue = createLocalVue()
    localVue.use(Router)
    router = new Router()
    module = {
      router: {
        routes: [
          {
            path: '/foo',
            name: 'foo',
            component: { render: h => h('div', 'Bar') }
          }
        ]
      }
    }
  })

  it('can register module router routes', () => {
    registerModuleRouter(module, router)
    const matches = router.getMatchedComponents('foo')
    expect(matches).toHaveLength(1)
  })

  it('can register module router guards', () => {
    const lifecycleHook = { call: () => true }
    module.router.beforeEach = function(from, to, next) {
      lifecycleHook.call()
      next()
    }
    const spy = jest.spyOn(lifecycleHook, 'call')
    registerModuleRouter(module, router)
    expect(router.currentRoute.name).toBe(null)
    router.push('foo')
    expect(router.currentRoute.name).toBe('foo')
    expect(spy).toHaveBeenCalled()
  })

  it('cannot register module without router property', () => {
    const result = registerModuleRouter({}, router)
    expect(result).toBe(false)
  })
})
