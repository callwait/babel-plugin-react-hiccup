import { parseTag, pragma } from './helper'
import htmlTags from './tags'
import hiccup from './hiccup'

export default function ({ types }) {
  return {
    name: 'babel-plugin-react-hiccup',
    visitor: {
      ArrayExpression: function (path) {
        let element = path.node.elements[0]
        let props = path.node.elements ? path.node.elements[1] : false
        let children = false
        if (props && props.type === 'ArrayExpression') {
          children = path.node.elements.slice(1)
          props = types.ObjectExpression([])
        } else {
          children = path.node.elements.slice(2)
        }
        const [componentOrTagName, attrs] = parseTag(types, element)
        const isHtml = htmlTags.indexOf(componentOrTagName.value)
        if (isHtml !== -1 || types.isIdentifier(element)) {
          path.replaceWith(
            types.CallExpression(
              pragma(),
              hiccup(types, componentOrTagName, attrs, props, children)
            )
          )
        }
      }
    }
  }
}
