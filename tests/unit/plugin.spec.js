import Router from 'vue-router'
import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import plugin from '../../lib'

describe('Vue plugin', () => {
  let router
  let store
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
  })

  it('will throw error if no modules are supplied', () => {
    expect(() => {
      localVue.use(plugin, {
        modules: null
      })
    }).toThrow('No modules supplied to package-loader')
  })

  it('can install use the vm helper property in components', () => {
    const modules = {
      moduleA: { foo: 'bar' },
      moduleB: {}
    }
    localVue.use(plugin, { modules })
    const comp = { render: h => h('div', 'Hi') }
    const wrapper = shallowMount(comp, { localVue })
    expect(wrapper.vm.$modules).toBeDefined()
    expect(wrapper.vm.$modules.get('moduleA').foo).toBe('bar')
    expect(Object.keys(wrapper.vm.$modules.all())).toHaveLength(2)
  })

  it('can install the plugin with everything included', () => {
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
    router = new Router()
    store = new Vuex.Store()
    expect(() => {
      localVue.use(plugin, {
        modules,
        store,
        router
      })
    }).not.toThrow()
  })
})
