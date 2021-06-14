defmodule ChatWeb.ChatChannel do
  use ChatWeb, :channel

  @impl true
  def join("chat:lobby", _payload, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_in("new_message", payload, socket) do
    IO.puts("new_message")
    IO.inspect(payload)
    {:noreply, socket}
  end
end
