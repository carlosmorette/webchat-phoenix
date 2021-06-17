defmodule ChatWeb.ChatChannel do
  use ChatWeb, :channel

  @impl true
  def join("chat:lobby", _payload, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_in(
        "new_message",
        %{"body" => %{"usermessage" => user_message, "username" => username}},
        socket
      ) do
    broadcast(socket, "new_message", %{id: 1, context: "Deu bom man"})
    {:noreply, socket}
  end
end
