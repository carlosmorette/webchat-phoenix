defmodule ChatWeb.UserSocket do
  use Phoenix.Socket

  # This módule is the same as the Router Module, it orchestrates client connections

  # Defining topic for specific channel
  channel "chat:*", ChatWeb.ChatChannel

  @impl true
  def connect(_params, socket, _connect_info) do
    {:ok, socket}
  end

  @impl true
  def id(_socket), do: nil
end
