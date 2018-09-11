function isChild(t, x) {
    return t.isStringLiteral(x) || t.isNumericLiteral(x);
}

function isChildren(t, x) {
    return isChild(t, x) || t.isArrayExpression(x);
}

export default function hiccup(t, componentOrTagName, attrs, properties, children) {
    const attrEntries = Object.entries(attrs);

    if (attrEntries.length > 0) {

        properties = properties || t.ObjectExpression([])

        if (t.isObjectExpression(properties)) {

            const hasClassName = properties.properties.find((prop) => prop.key.name === 'className');
            const hasId = properties.properties.find((prop) => prop.key.name === 'id');

            attrEntries
                .forEach(([key, value]) => {
                    if (key === 'className' && hasClassName) {
                        properties.properties = properties.properties.filter((prop) => prop.key.name !== 'className');
                        properties.properties.push(
                            t.ObjectProperty(
                                t.Identifier(key),
                                t.StringLiteral(value + ' ' + hasClassName.value.value)));
                    } else if (key === 'id' && hasId) {
                        properties.properties = properties.properties.filter((prop) => prop.key.name !== 'id');
                        properties.properties.push(
                            t.ObjectProperty(
                                t.Identifier(key),
                                t.StringLiteral(value + ' ' + hasId.value.value)));
                    } else {
                        properties.properties.push(
                            t.ObjectProperty(
                                t.Identifier(key),
                                t.StringLiteral(value)));
                    }
                });
        } else {
            children.unshift(properties);
            properties = t.ObjectExpression((
                attrEntries
                    .map(([key, value]) => {
                        return (
                            t.ObjectProperty(
                                t.Identifier(key),
                                t.StringLiteral(value)));
                    })
            ))
        }
    }

    if (t.isObjectExpression(properties)) {

        const dataSet = (
            properties.properties
                .find((prop) => prop.key && prop.key.name === 'dataset' && t.isObjectExpression(prop.value))
        );

        const attributes = (
            properties.properties
                .find((prop) => prop.key && prop.key.name === 'attributes' && t.isObjectExpression(prop.value))
        );

        const attrChildren = (
            properties.properties
                .find((prop) => prop.key && prop.key.name === 'children' && t.isArrayExpression(prop.value))
        );

        if (dataSet) {
            dataSet
                .value
                .properties
                .map((prop) => [prop.key.name, prop.value.value])
                .forEach(([name, value]) => {
                    properties.properties.push(
                        t.ObjectProperty(
                            t.StringLiteral('data-' + name),
                            t.StringLiteral(value)))
                });

            properties.properties = properties.properties
                .filter((prop) => !prop.key || prop.key.name !== 'dataset');
        }

        if (attributes) {
            attributes
                .value
                .properties
                .map((prop) => [prop.key.name, prop.value.value])
                .forEach(([name, value]) => {
                    properties.properties.push(
                        t.ObjectProperty(
                            t.Identifier(name),
                            t.StringLiteral(value)))
                });

            properties.properties = properties.properties
                .filter((prop) => !prop.key || prop.key.name !== 'attributes');
        }

        if (attrChildren) {
            children = children.concat(attrChildren.value.elements);

            properties.properties = properties.properties
                .filter((prop) => prop.key.name !== 'children');

            if (properties.properties.length === 0) {
                properties = t.Identifier('null');
            }
        }
    }

    let args = [componentOrTagName, properties, ...children];

    if (t.isObjectExpression(properties) && children.length > 0) {
        args = [componentOrTagName, properties, ...children];
    }

    if (t.isObjectExpression(properties) && children.length === 0) {
        args = [componentOrTagName, properties];
    }

    if (isChildren(t, properties) && children.length === 0) {
        args = [componentOrTagName, t.Identifier('null'), properties];
    }

    if (isChild(t, properties) && children.length > 0) {
        args = [componentOrTagName, t.Identifier('null'), properties, ...children];
    }

    if (properties === undefined) {
        args = [componentOrTagName, ...children];
    }

    return args;
}
