defmodule ChatWeb.ChatChannel do
  use ChatWeb, :channel
  alias Chat.ConversationAgent

  @impl true
  def join("chat:lobby", _payload, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_in("joined", _payload, socket) do
    IO.inspect("Joined asssssssASDASDASDASDASDASDASDSDASDASman")
    {:noreply, socket}
  end

  @impl true
  def handle_in("new_message", %{"body" => payload}, socket) do
    %{"message" => message, "username" => username} = payload
    broadcast(socket, "new_message", %{message: message, username: username})
    {:noreply, socket}
  end
end
