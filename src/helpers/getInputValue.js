const getInputValue = (event, name) =>
    event.target.elements.namedItem(name).value.trim()

export default getInputValue
