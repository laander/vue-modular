import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { registerModuleStore, reset } from '../../lib'

describe('Vuex store', () => {
  let module
  let store

  beforeEach(() => {
    reset()
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store()
    module = {
      store: {
        namespaced: true,
        state: { foo: 'bar' },
        mutations: {
          updateFoo(state, value) {
            state.foo = value
          }
        },
        getters: {
          getFoo(state) {
            return state.foo
          }
        }
      }
    }
  })

  it('can register namespaced module getters', () => {
    registerModuleStore('moduleA', module, store)
    expect(store.getters['moduleA/getFoo']).toBeDefined()
  })

  it('can register and call namespaced module mutations', () => {
    const spy = jest.spyOn(module.store.mutations, 'updateFoo')
    registerModuleStore('moduleA', module, store)
    store.commit('moduleA/updateFoo', 'baz')
    expect(spy).toHaveBeenCalled()
    expect(store.state.moduleA.foo).toBe('baz')
  })

  it('cannot register module without store property', () => {
    const result = registerModuleStore('moduleA', {}, store)
    expect(result).toBe(false)
  })
})
