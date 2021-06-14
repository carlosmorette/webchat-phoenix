import { Socket } from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

let channel = socket.channel("chat:lobby", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

const button = document.getElementById("send-button")
button.addEventListener('click', () => {
  channel.push("new_message", { body: "rola" })
})

export default socket
