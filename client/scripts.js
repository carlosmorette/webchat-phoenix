const ChatControll = (socket) => {
	return {
		requiredKeys: ["topic", "event", "payload", "ref"],
		
		connect(topic){
			const connectPayload = {
				topic: topic,
				event: "phx_join",
				payload: "",
				ref: ""
			}
			this.sendMessage(connectPayload)
		},

		sendMessage(payload){
			if(this.validatePayload(payload)) {
				socket.send(this.parseToJSON(payload))
			}
		},

		validatePayload(payload) {
			this.requiredKeys.forEach((rk) => {
				if (!(rk in payload)) {
					throw new Error("Missing required keys\nPayload is not valid")
				}

				return true
			})
		},

		parseToJSON(payload){
				JSON.stringify(payload)
		}
	}
}

