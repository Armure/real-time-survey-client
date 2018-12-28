import React from 'react'
import socketIOClient from 'socket.io-client'
import SurveyContainer from './components/SurveyContainer'
import AdminPanel from './components/AdminPanel'

const socket = socketIOClient('http://127.0.0.1:4001')

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      clients: [],
      results: {},
      length: null
    }
  }

  componentDidMount() {
    socket.on('change', (state) => {
      const results = {}
      state.clients.forEach(({ selection }) => {
        if (!results[selection]) results[selection] = 1
        else results[selection]++
      })
      this.setState({ ...state, results })
    })
  }

  render() {
    const { clients, length, results } = this.state
    const isAdmin = this.isAdmin()
    const numberOfClients = clients.length
    const client = clients.find(client => client.id === socket.id)
    const selection = client ? client.selection : null
    return (
      <div style={{ textAlign: 'center' }}>
        { length === null && <p>Loading...</p> }
        { length !== null && <p>{this.getNumberReport(numberOfClients)}</p> }
        { length !== null && <SurveyContainer length={length} results={results} selection={selection} onSelect={value => this.onSelection(value)} /> }
        { isAdmin && <AdminPanel onSubmit={value => this.setLength(value)}/> }
      </div>
    )
  }

  onSelection (value) {
    socket.emit('makeSelection', value)
  }

  setLength (length) {
    socket.emit('setLength', length)
  }

  getNumberReport (number) {
    if (number === 1) return `There is ${number} user connected.`
    return `There are ${number} users connected.`
  }

  isAdmin () {
    const { match } = this.props
    if (!match) return false
    const { params } = match
    if (!params) return false
    return params.id === 'admin'
  }
}
