import Router from 'vue-router'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import plugin, { registerModules, getModules, reset } from '../../lib'

describe('Vue plugin', () => {
  let localVue

  beforeEach(() => {
    reset()
    localVue = createLocalVue()
  })

  it('will not throw error if no options are supplied', () => {
    expect(() => {
      localVue.use(plugin)
    }).not.toThrow()
  })

  it('can register module after plugin registration', () => {
    const modules = { moduleA: { foo: 'bar' } }
    localVue.use(plugin)
    registerModules(modules)
    const registeredModules = getModules()
    expect(registeredModules).toEqual(modules)
  })

  it('cannot register modules that doesnt fit the expected shape', () => {
    localVue.use(plugin)
    const result = registerModules('foo')
    const registeredModules = getModules()
    expect(result).toBe(false)
    expect(registeredModules).toEqual({})
  })

  it('can install multiple modules with store and router', () => {
    const modules = {
      moduleA: {
        store: { state: 'foo' }
      },
      moduleB: {
        router: {
          routes: [
            {
              path: '/foo',
              name: 'foo',
              component: { render: h => h('div', 'Hi') }
            }
          ]
        }
      }
    }
    localVue.use(Router)
    localVue.use(Vuex)
    const router = new Router()
    const store = new Vuex.Store()
    expect(() => {
      localVue.use(plugin, {
        modules,
        store,
        router
      })
    }).not.toThrow()
    const registeredModules = getModules()
    expect(Object.keys(registeredModules)).toHaveLength(2)
  })
})
