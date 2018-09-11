const t1 = React.createElement('h1', {
  className: 'clsss'
});

const t2 = React.createElement('h1', null, "title");

const t3 = React.createElement('h2', {
  id: 'id',
  className: 'class'
}, "world");

const t4 = React.createElement('h2', {
  className: 'class'
}, "hello world");

const t4_1 = React.createElement('h2', null, React.createElement('span', null, 'A child'));

const t4_2 = React.createElement('h2', {}, React.createElement('span', null, 'A child'));

const t4_3 = React.createElement('h2', {}, React.createElement('span', null, 'A child'), React.createElement('span', null, 'B child'));

const t5 = React.createElement('h3', {
  className: 'foo bar'
});

const t6 = React.createElement('div', {
  className: 'class'
}, React.createElement('p', null, "first paragraph"), React.createElement('p', null, "second paragraph"));

const t7 = React.createElement('div', {
  className: 'class'
}, React.createElement('p', null, "first paragraph"), React.createElement('p', null, "second paragraph"));

const t8 = React.createElement('div', {}, React.createElement('p', null, "first paragraph"), React.createElement('p', null, "second paragraph"));

const t9 = React.createElement('div', {
  'data-foo': 'bar',
  'data-bar': 'foo'
});

const t10 = React.createElement(MyComponent);

const t11 = React.createElement(MyComponent, { prop: 'param' });

const t12 = React.createElement(MyComponent, null, React.createElement('span', null, 'A child'));

const t13 = React.createElement(MyComponent, { open: false, good: "yes", parent: this.parent });

/* Don't need to replace */
let arr1 = ['1', '2', '3'];
let arr2 = ['MyComponent'];
let arr3 = [0, 1, 2, 3, 4];
let arr4 = ['divIs?', 'not-sure'];
let arr5 = [{ obj: "new" }, { name: "second" }];
