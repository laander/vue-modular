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

  it('can install the plugin with simple modules', () => {
    const options = {
      modules: {
        moduleA: { foo: 'bar' },
        moduleB: {}
      }
    }
    localVue.use(plugin, options)
    const comp = { render: h => h('div', 'Hi') }
    const wrapper = shallowMount(comp, { localVue })
    expect(wrapper.vm.$modules).toBeDefined()
    expect(wrapper.vm.$modules.get('moduleA').foo).toBe('bar')
    expect(wrapper.vm.$modules.get('moduleB')).toEqual({})
    expect(Object.keys(wrapper.vm.$modules.all())).toHaveLength(2)
  })

  it('will throw error if no modules are supplied', () => {
    expect(() => {
      localVue.use(plugin, {
        modules: null
      })
    }).toThrow('No modules supplied to package-loader')
  })

  it('can install the plugin with simple modules', () => {
    localVue.use(Router)
    localVue.use(Vuex)
    router = new Router({
      mode: 'abstract',
      base: process.env.BASE_URL
    })
    store = new Vuex.Store()
    localVue.use(plugin, {
      modules: {
        moduleA: {
          foo: 'bar'
        },
        moduleB: {}
      },
      store,
      router
    })
    const comp = { render: h => h('div', 'Hi') }
    const wrapper = shallowMount(comp, {
      localVue,
      store,
      router
    })
    expect(wrapper.vm.$modules).toBeDefined()
    expect(wrapper.vm.$modules.get('moduleA').foo).toBe('bar')
    expect(wrapper.vm.$modules.get('moduleB')).toEqual({})
    expect(Object.keys(wrapper.vm.$modules.all())).toEqual([
      'moduleA',
      'moduleB'
    ])
  })
})
