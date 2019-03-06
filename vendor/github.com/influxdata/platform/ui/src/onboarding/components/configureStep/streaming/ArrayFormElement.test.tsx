// Libraries
import React from 'react'
import {shallow} from 'enzyme'

// Components
import ArrayFormElement from 'src/onboarding/components/configureStep/streaming/ArrayFormElement'
import {FormElement} from 'src/clockface'
import MultipleInput from './MultipleInput'

import {TelegrafPluginInputCpu} from 'src/api'

const setup = (override = {}) => {
  const props = {
    fieldName: '',
    addTagValue: jest.fn(),
    removeTagValue: jest.fn(),
    autoFocus: true,
    value: [],
    helpText: '',
    onSetConfigArrayValue: jest.fn(),
    telegrafPluginName: TelegrafPluginInputCpu.NameEnum.Cpu,
    ...override,
  }

  const wrapper = shallow(<ArrayFormElement {...props} />)

  return {wrapper}
}

describe('Onboarding.Components.ConfigureStep.Streaming.ArrayFormElement', () => {
  it('renders', () => {
    const fieldName = 'yo'
    const {wrapper} = setup({fieldName})
    const formElement = wrapper.find(FormElement)
    const multipleInput = wrapper.find(MultipleInput)

    expect(wrapper.exists()).toBe(true)
    expect(formElement.exists()).toBe(true)
    expect(multipleInput.exists()).toBe(true)
  })
})
