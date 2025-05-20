import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from '@/components/ui/BaseInput.vue'

describe('BaseInput', () => {
  it('renders with default props', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('text')
  })

  it('updates modelValue on input', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('hello')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('hello')
  })

  it('shows label when provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        label: 'Email',
      },
    })
    expect(wrapper.find('label').text()).toBe('Email')
  })

  it('shows hint when no error is present and field not touched', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        hint: 'This is a hint',
      },
    })
    expect(wrapper.text()).toContain('This is a hint')
  })

  it('shows error only after blur (touched)', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        error: 'This is required',
      },
    })

    expect(wrapper.text()).not.toContain('This is required')

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.text()).toContain('This is required')
  })

  it('renders left and right icons when provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
      },
      slots: {
        'icon-left': '<svg class="icon-left"></svg>',
        'icon-right': '<svg class="icon-right"></svg>',
      },
    })

    expect(wrapper.find('.icon-left').exists()).toBe(true)
    expect(wrapper.find('.icon-right').exists()).toBe(true)
  })

  it('sets correct input type', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        type: 'email',
      },
    })
    expect(wrapper.find('input').attributes('type')).toBe('email')
  })

  it('disables input when disabled is true', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        disabled: true,
      },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })
})
