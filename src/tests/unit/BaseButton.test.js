import { mount } from '@vue/test-utils'
import BaseButton from '@/components/base/BaseButton.vue'

test('renders as button with text', () => {
  const wrapper = mount(BaseButton, {
    slots: { default: 'Click me' },
  })
  expect(wrapper.element.tagName).toBe('BUTTON')
  expect(wrapper.text()).toBe('Click me')
})

test('is disabled when prop is set', () => {
  const wrapper = mount(BaseButton, {
    props: { disabled: true },
  })
  expect(wrapper.attributes('disabled')).toBeDefined()
})

test('emits click event', async () => {
  const wrapper = mount(BaseButton)
  await wrapper.trigger('click')
  expect(wrapper.emitted()).toHaveProperty('click')
})