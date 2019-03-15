import Router from 'vue-router'
import { createLocalVue } from '@vue/test-utils'
import { registerRouters } from '../../lib'

describe('Vue router', () => {
  let modules
  let router

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Router)
    router = new Router({
      mode: 'abstract',
      base: process.env.BASE_URL,
      routes: []
    })
    modules = {
      moduleA: {
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
    }
  })

  it('can register module router routes', () => {
    registerRouters(modules, router)
    const matches = router.getMatchedComponents('foo')
    expect(matches).toHaveLength(1)
  })

  it('can register module router guards', () => {
    const lifecycleHook = { call: () => true }
    modules.moduleA.router.beforeEach = function(from, to, next) {
      lifecycleHook.call()
      next()
    }
    const spy = jest.spyOn(lifecycleHook, 'call')
    registerRouters(modules, router)
    expect(router.currentRoute.name).toBe(null)
    router.push('foo')
    expect(router.currentRoute.name).toBe('foo')
    expect(spy).toHaveBeenCalled()
  })
})
