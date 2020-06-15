# babel-plugin-react-hiccup

[![npm](https://img.shields.io/npm/v/babel-plugin-react-hiccup.svg)](https://www.npmjs.com/package/babel-plugin-react-hiccup)

*Hiccup syntax for React components with Babel.*

*React Native ready.*
![Alt text](rn-demo.png?raw=true "React Native ready")


## Example

**Input**
```js
const element = ['h1', "title"]
const element = ['h2#myId.myClass', "title"]
const element = ['h3.foo', {className: 'bar'}];

const nested = ['div',
  ['p.first', "first paragraph"],
  ['p.second', "second paragraph"]
];

const component = [MyComponent, {open: true, good: "yes", parent: this.parent}];
```

**Same as**
```js
const element = <h1>title</h1>
const element = <h2 id="myId" className="myClass">title</h1>
const element = <h3 className="foo bar"></h1>

const nested = (<div>
    <p className="first">first paragraph</p>
    <p className="second">second paragraph</p>
</div>)

const component = <MyComponent open=true good="yes" parent={this.parent}>

```

**Output**
```js
const element = React.createElement('h1', {}, "title");
const element = React.createElement('h2', {id: 'myId', className: 'myClass'}, "title");
const element = React.createElement('h3', {className: 'foo bar'});

const nested = React.createElement('div', {}, 
    React.createElement('p', {className: 'first'}, "first paragraph"), 
    React.createElement('p', {className: 'second'}, "second paragraph")
);

const component = React.createElement(MyComponent, { open: true, good: "yes", parent: this.parent });


```

## Installation

```
npm i babel-plugin-react-hiccup
```

## Usage

### Via .babelrc

__.babelrc__
```json
{
  "plugins": ["react-hiccup"]
}
```

### Via CLI
```
babel --plugins react-hiccup script.js
```

### Via Node API
```js
require("babel-core").transform("code", {
  plugins: ["react-hiccup"]
});
```

## License
MIT
