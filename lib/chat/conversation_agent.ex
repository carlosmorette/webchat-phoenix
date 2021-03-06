defmodule Chat.ConversationAgent do
  use Agent

  @default_conversation [
    %{
      author: "carlos morette",
      message: "Hello World!"
    }
  ]

  def start_link(opts) do
    {initial_value, _opts} = Keyword.pop(opts, :initial_value, @default_conversation)
    Agent.start_link(fn -> initial_value end, name: __MODULE__)
  end

  def get_all do
    Agent.get(__MODULE__, & &1)
  end

  def add(author, message) do
    Agent.update(__MODULE__, fn c ->
      c ++ [%{author: author, message: message}]
    end)
  end

  def delete_all do
    Agent.update(__MODULE__, fn _c -> [] end)
  end
end
