const t1 = ['h1.clsss'];

const t2 = ['h1', "title"];

const t3 = ['h2#id.class', {}, "world"];

const t4 = ['h2.class', "hello world"];

const t4_1 = ['h2', {children: [['span', 'A child']]}];

const t4_2 = ['h2', ['span', 'A child']];

const t4_3 = ['h2', 
  ['span', 'A child'],
  ['span', 'B child']
];

const t5 = ['h3.foo', { className: 'bar' }];

const t6 = ['div.class', {},
  ['p', "first paragraph"],
  ['p', "second paragraph"]
];

const t7 = ['div.class',
  ['p', "first paragraph"],
  ['p', "second paragraph"]
];

const t8 = ['div',
  ['p', "first paragraph"],
  ['p', "second paragraph"]
];

const t9 = ['div', {dataset: {foo: 'bar', bar: 'foo'}}];

const t10 = [MyComponent];

const t11 = [MyComponent, {prop: 'param'}];

const t12 = [MyComponent, {children: [['span', 'A child']]}];

const t13 = [MyComponent, {open: false, good: "yes", parent: this.parent}];

/* Don't need to replace */
let arr1 = ['1', '2', '3']
let arr2 = ['MyComponent']
let arr3 = [0, 1, 2, 3, 4]
let arr4 = ['divIs?', 'not-sure']
let arr5 = [{obj: "new"}, {name: "second"}]
