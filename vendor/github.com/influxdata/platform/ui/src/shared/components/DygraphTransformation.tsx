import {PureComponent} from 'react'
import {FluxTable} from 'src/types'
import {ErrorHandling} from 'src/shared/decorators/errors'

import {
  fluxTablesToDygraph,
  FluxTablesToDygraphResult,
} from 'src/shared/parsing/flux/dygraph'

interface Props {
  tables: FluxTable[]
  children: (result: FluxTablesToDygraphResult) => JSX.Element
}

@ErrorHandling
class DygraphTransformation extends PureComponent<
  Props,
  FluxTablesToDygraphResult
> {
  public static getDerivedStateFromProps(props) {
    return {...fluxTablesToDygraph(props.tables)}
  }

  constructor(props) {
    super(props)

    this.state = {
      labels: [],
      dygraphsData: [],
      seriesDescriptions: [],
    }
  }

  public render() {
    const {children} = this.props
    return children(this.state)
  }
}

export default DygraphTransformation
