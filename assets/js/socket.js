/* Docs: https://hexdocs.pm/phoenix/js/ */

import { Socket } from "phoenix"
import { button, author, message  } from './elements'
import { Watcher } from './watcher'

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

let channel = socket.channel("chat:lobby", {})

channel.join()
  .receive("ok", () => {
    channel.push("started_connection")
  })
  .receive("error", resp => { console.log("Unable to join", resp) })

button.addEventListener('click', () => {
  if(!author.value || !message.value) {
    alert("Fill all fields")
    return
  }

  const payload = {
    author: author.value,
    message: message.value
  }
  channel.push("new_message", { body: payload })
})


Watcher(channel)
export default socket
