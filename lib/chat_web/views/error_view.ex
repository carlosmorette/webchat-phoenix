defmodule ChatWeb.ErrorView do
  use ChatWeb, :view

  # or /templates/error/404.html.eex
  def render("404.html", _assigns) do
    "Page not found"
  end

  def template_not_found(template, _assigns) do
    Phoenix.Controller.status_message_from_template(template)
  end
end
