import React from 'react'
import parse, { domToReact, attributesToProps } from 'html-react-parser'

// The original site used plain inline handlers like onclick="openDemo('cards')".
// React only recognizes camelCase event props (onClick) and silently drops
// lowercase "onclick" attributes (with a console warning), so those buttons
// would otherwise do nothing. This wraps html-react-parser so any inline
// on___ attribute becomes a real handler that runs the original code
// (which can still call the page's globally-defined functions, since those
// are attached via the injected <script> in each page's useEffect).
const EVENT_ATTR_TO_PROP = {
  onclick: 'onClick',
  onchange: 'onChange',
  oninput: 'onInput',
  onsubmit: 'onSubmit',
  onkeyup: 'onKeyUp',
  onkeydown: 'onKeyDown',
  onfocus: 'onFocus',
  onblur: 'onBlur',
  onmouseover: 'onMouseOver',
  onmouseout: 'onMouseOut',
  onmouseenter: 'onMouseEnter',
  onmouseleave: 'onMouseLeave',
}

function makeHandler(code) {
  // eslint-disable-next-line no-new-func
  const fn = new Function('event', code)
  return function (event) {
    return fn.call(event.currentTarget, event)
  }
}

const options = {
  replace(domNode) {
    if (domNode.type !== 'tag' || !domNode.attribs) return undefined

    const eventProps = {}
    let hasEvent = false
    for (const [attr, propName] of Object.entries(EVENT_ATTR_TO_PROP)) {
      if (domNode.attribs[attr] != null) {
        hasEvent = true
        eventProps[propName] = makeHandler(domNode.attribs[attr])
      }
    }
    if (!hasEvent) return undefined

    const attribsCopy = { ...domNode.attribs }
    for (const attr of Object.keys(EVENT_ATTR_TO_PROP)) delete attribsCopy[attr]
    const props = attributesToProps(attribsCopy)

    const children =
      domNode.children && domNode.children.length
        ? domToReact(domNode.children, options)
        : undefined

    return React.createElement(domNode.name, { ...props, ...eventProps }, children)
  },
}

export function parseWithHandlers(html) {
  return parse(html, options)
}
