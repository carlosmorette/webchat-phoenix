defmodule ChatWeb.ChatChannel do
  use ChatWeb, :channel
  alias Chat.ConversationAgent

  @impl true
  def join("chat:lobby", _payload, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_in("started_connection", _payload, socket) do
    push(socket, "started_connection", %{history: ConversationAgent.get_all()})
    {:noreply, socket}
  end

  @impl true
  def handle_in("new_message", %{"body" => payload}, socket) do
    %{"message" => message, "author" => author} = payload
    ConversationAgent.add(author, message)
    broadcast(socket, "new_message", %{message: message, author: author})
    {:noreply, socket}
  end
end
