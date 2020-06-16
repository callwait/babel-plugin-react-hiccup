'use strict';

import { parse } from '@babel/parser';

function parsePragma() {
  return parse('React.createElement').program.body[0].expression;
}

function memoize(fn) {
  let mem;
  return (...args) => {
    if (mem) {
      return mem;
    } else {
      mem = fn(...args);
      return mem;
    }
  }
}
export const pragma = memoize(parsePragma);

const classIdSplit = /([\.#]?[a-zA-Z0-9_:-]+)/;

const notClassId = /^\.|#/;

export function parseTag(t, tag) {
  
  if (t.isStringLiteral(tag) === false) {
    return [tag, {}];
  }

  let out = [];
  const props = {};
  const tagRawName = tag.value;

  if (!tagRawName) {
    return ['div', props];
  }

  const tagParts = tagRawName.split(classIdSplit);
  let tagName = null;

  if (notClassId.test(tagParts[1])) {
    tagName = 'div';
  }

  let classes;
  let part;
  let type;
  let i;

  for (let i = 0; i < tagParts.length; i++) {
    part = tagParts[i];

    if (!part) {
      continue;
    }

    type = part.charAt(0);

    if (!tagName) {
      tagName = part;
    } else if (type === '.') {
      classes = classes || [];
      classes.push(part.substring(1, part.length));
    } else if (type === '#') {
      props.id = part.substring(1, part.length);
    }
  }

  if (classes) {
    if (props.className) {
      classes.push(props.className);
    }

    props.className = classes.join(' ');
  }

  return tagName ? [t.StringLiteral(tagName.toLowerCase()), props] : [t.StringLiteral('div'), props];
}
