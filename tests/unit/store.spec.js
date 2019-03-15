import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { registerStores } from '../../lib'

describe('Vuex store', () => {
  let modules
  let store

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store()
    modules = {
      moduleA: {
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
    }
  })

  it('can register namespaced module getters', () => {
    registerStores(modules, store)
    expect(store.getters['moduleA/getFoo']).toBeDefined()
  })

  it('can register and call namespaced module mutations', () => {
    const spy = jest.spyOn(modules.moduleA.store.mutations, 'updateFoo')
    registerStores(modules, store)
    store.commit('moduleA/updateFoo', 'baz')
    expect(spy).toHaveBeenCalled()
    expect(store.state.moduleA.foo).toBe('baz')
  })
})
