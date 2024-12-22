const formatValue = (value) => {
    if (typeof value === "object" && value !== null) {
        const entries = Object.entries(value).map(([key, val]) => {
            return `${key}: ${formatValue(val)}`;
        });
        return `{\n${entries.join('\n')}\n}`;
    }
    if (typeof value === 'string') {
        return `"${value}"`; 
    }
    return String(value);
};

const plain = (node) => {
    const iter = (node) => {
        const { type, key, value, children } = node;
        if (type === 'added') {
            return [`Property '${key}' was added with value: ${formatValue(value)}`];
        }
        if (type === 'removed') {
            return [`Property '${key}' was removed`];
        }
        if (type === 'changed') {
            return [`Property '${key}' was changed from ${formatValue(value.old)} to ${formatValue(value.new)}`];
        }
        if (type === 'nested') {
            return [`Property '${key}': ${iter(children).join('\n')}`];
        }
        return [];
    };

    if (node.type === 'root') {
        return `{\n${node.children.flatMap((child) => iter(child)).join('\n')}\n}`;
    }
};

export default plain;