import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton.vue'

describe('BaseButton', () => {
  it('renders default button with text', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.text()).toContain('Click me')
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('renders as anchor tag when `as="a"` is passed', () => {
    const wrapper = mount(BaseButton, {
      props: { as: 'a', href: '/test' },
      slots: { default: 'Go to link' }
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/test')
  })

  it('applies the correct variant classes', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'outline' },
      slots: { default: 'Outline Btn' }
    })

    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('text-gray-700')
  })

  it('disables the button when `disabled` is true', () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
      slots: { default: 'Disabled' }
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('shows spinner and disables content when `loading` is true', () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
      slots: { default: 'Save' }
    })

    expect(wrapper.find('span').classes()).toContain('animate-spin')
    expect(wrapper.text()).not.toContain('Save')
  })

  it('renders left icon slot', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        icon: '<svg class="test-icon" />',
        default: 'With Icon'
      }
    })

    expect(wrapper.find('.test-icon').exists()).toBe(true)
  })

  it('renders right icon slot', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        'icon-right': '<svg class="test-icon-right" />',
        default: 'With Right Icon'
      }
    })

    expect(wrapper.find('.test-icon-right').exists()).toBe(true)
  })
})
