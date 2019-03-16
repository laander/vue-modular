import { createLocalVue, shallowMount } from '@vue/test-utils'
import plugin, { registerVmProperty, reset } from '../../lib'

describe('VM property', () => {
  let localVue

  beforeEach(() => {
    reset()
    localVue = createLocalVue()
  })

  it('can use the vm helper property in components', () => {
    const modules = {
      moduleA: { foo: 'bar' },
      moduleB: {}
    }
    localVue.use(plugin, { modules })
    const comp = { render: h => h('div', 'Hi') }
    const wrapper = shallowMount(comp, { localVue })
    expect(localVue.prototype.$modules).toBeDefined()
    expect(wrapper.vm.$modules).toBeDefined()
    expect(wrapper.vm.$modules.moduleA.foo).toBe('bar')
    expect(Object.keys(wrapper.vm.$modules)).toHaveLength(2)
  })

  it('can change the vm helper property name', () => {
    localVue.use(plugin, { vmProperty: '$foo' })
    expect(localVue.prototype.$modules).not.toBeDefined()
    expect(localVue.prototype.$foo).toBeDefined()
  })

  it('can disable the vm helper property name', () => {
    localVue.use(plugin, { vmProperty: false })
    expect(localVue.prototype.$modules).not.toBeDefined()
  })

  it('cannot overwrite existing vue properties', () => {
    localVue.prototype.$foo = 'doNotChange'
    const result = registerVmProperty(localVue, '$foo')
    expect(result).toBe(false)
    expect(localVue.prototype.$foo).toBe('doNotChange')
  })
})
