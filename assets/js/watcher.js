import { createDefaultMessageLine } from './functions'
import { messagesContainer } from './elements'

export const Watcher = (channel) => {
  channel.on("new_message", msg => {
    const line = createDefaultMessageLine(msg.author, msg.message)
    messagesContainer.appendChild(line)
  })

  channel.on("started_connection", msg => {
    const { history } = msg
    history.forEach((m) => {
      const line = createDefaultMessageLine(m.author, m.message)
      messagesContainer.appendChild(line)
    })
  })
}
