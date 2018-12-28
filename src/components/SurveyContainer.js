import React from 'react'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'

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
    const { length, results, onSelect, selection } = this.props
    return [...Array(parseFloat(length))].map((val, idx) => {
      const color = selection === idx ? 'secondary' : 'primary'
      const total = results[idx] || 0
      return this.getButton(idx, color, total, onSelect)
    })
  }

  getButton (idx, color, total, onSelect) {
    return (
      <Badge key={idx} color='error' badgeContent={total}
        style={{ marginTop: '20px' }}>
        <Button variant='contained' color={color}
          onClick={() => onSelect(idx)}>
          {`Option ${idx + 1}`}
        </Button>
      </Badge>
    )
  }
}
