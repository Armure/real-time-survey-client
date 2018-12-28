import React from 'react'
import Button from '@material-ui/core/Button'

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
}

export default class SurveyContainer extends React.Component {
  render() {
    return (
      <div style={style}>
        { this.getOptions() }
      </div>
    )
  }

  getOptions () {
    const { length, results, onSelect } = this.props
    return [...Array(parseFloat(length))].map((val, idx) => {
      const total = results[idx] || 0
      return <Button variant='contained' color='primary'
        key={idx} onClick={() => onSelect(idx)}
        style={{ marginTop: '10px' }}>
        {`Option ${idx + 1} (${total})`}
      </Button>
    })
  }
}
