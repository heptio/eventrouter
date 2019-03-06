// Libraries
import React, {PureComponent, ChangeEvent} from 'react'
import _ from 'lodash'

// Components
import {Form} from 'src/clockface'
import ConfigFieldSwitcher from 'src/onboarding/components/configureStep/streaming/ConfigFieldSwitcher'

// Actions
import {
  updateTelegrafPluginConfig,
  addConfigValue,
  removeConfigValue,
  setPluginConfiguration,
  setConfigArrayValue,
} from 'src/onboarding/actions/dataLoaders'

// Types
import {
  TelegrafPlugin,
  ConfigFields,
  ConfigFieldType,
} from 'src/types/v2/dataLoaders'

interface Props {
  telegrafPlugin: TelegrafPlugin
  configFields: ConfigFields
  onUpdateTelegrafPluginConfig: typeof updateTelegrafPluginConfig
  onSetPluginConfiguration: typeof setPluginConfiguration
  onAddConfigValue: typeof addConfigValue
  onRemoveConfigValue: typeof removeConfigValue
  onSetConfigArrayValue: typeof setConfigArrayValue
}

class PluginConfigForm extends PureComponent<Props> {
  public render() {
    const {
      telegrafPlugin: {name},
    } = this.props
    return (
      <>
        <h3>{_.startCase(name)}</h3>
        <Form>{this.formFields}</Form>
      </>
    )
  }

  private get formFields(): JSX.Element[] | JSX.Element {
    const {configFields, telegrafPlugin, onSetConfigArrayValue} = this.props

    if (!configFields) {
      return <p>No configuration required.</p>
    }

    return Object.entries(configFields).map(
      ([fieldName, {type: fieldType, isRequired}], i) => {
        return (
          <ConfigFieldSwitcher
            key={fieldName}
            fieldName={fieldName}
            fieldType={fieldType}
            index={i}
            onChange={this.handleUpdateConfigField}
            value={this.getFieldValue(telegrafPlugin, fieldName, fieldType)}
            isRequired={isRequired}
            addTagValue={this.handleAddConfigFieldValue}
            removeTagValue={this.handleRemoveConfigFieldValue}
            onSetConfigArrayValue={onSetConfigArrayValue}
            telegrafPluginName={telegrafPlugin.name}
          />
        )
      }
    )
  }

  private handleAddConfigFieldValue = (
    value: string,
    fieldName: string
  ): void => {
    const {onAddConfigValue, telegrafPlugin} = this.props

    onAddConfigValue(telegrafPlugin.name, fieldName, value)
  }

  private handleRemoveConfigFieldValue = (value: string, fieldName: string) => {
    const {onRemoveConfigValue, telegrafPlugin} = this.props

    onRemoveConfigValue(telegrafPlugin.name, fieldName, value)
  }

  private getFieldValue(
    telegrafPlugin: TelegrafPlugin,
    fieldName: string,
    fieldType: ConfigFieldType
  ): string | string[] {
    let defaultEmpty: string | string[]
    if (
      fieldType === ConfigFieldType.String ||
      fieldType === ConfigFieldType.Uri
    ) {
      defaultEmpty = ''
    } else {
      defaultEmpty = []
    }
    return _.get(telegrafPlugin, `plugin.config.${fieldName}`, defaultEmpty)
  }

  private handleUpdateConfigField = (e: ChangeEvent<HTMLInputElement>) => {
    const {onUpdateTelegrafPluginConfig, telegrafPlugin} = this.props
    const {name, value} = e.target

    onUpdateTelegrafPluginConfig(telegrafPlugin.name, name, value)
  }
}

export default PluginConfigForm
