export function createElement(tag, value) {
  const element = document.createElement(tag)

  if (typeof value === "string") {
    const content = document.createTextNode(value)
    element.appendChild(content)
    return element
  }

  element.appendChild(value)
  return element
}

export function createDefaultMessageLine(author, message) {
  const a = createElement("b", author)
  const p = createElement("p", a)
  p.appendChild(document.createTextNode(": " + message))
  return p
}

