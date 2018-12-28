import React from 'react'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: '50px'
}

export default class SurveyContainer extends React.Component {
  constructor () {
    super()
    this.state = { value: 0 }
  }

  render() {
    const { value } = this.state
    const { onSubmit } = this.props
    return (
      <div style={style}>
        <Input type='number' value={value} onChange={e => this.handleChange(e)}/>
        <Button variant='contained' color='default' onClick={() => onSubmit(value)}
          style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </div>
    )
  }

  handleChange (e) {
    const value = Math.max(0, e.target.value)
    this.setState({ value })
  }
}
