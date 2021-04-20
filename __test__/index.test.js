const assert = require("assert");
const { data1, data2 } = require("./data");
const { ConfigToJSXFile } = require("../src");

const transfrom = new ConfigToJSXFile();

/**
 * Test genComponent func.
 */
const expected2 = `<Counter nums={"1"}></Counter>`;
assert.strictEqual(transfrom.init(data2).genComponent(data2), expected2);

/**
 * Test genRenderString func.
 */
const expected1 = `<>
  <div toWhat={"world"}>Hello</div>
  <Counter nums={"1"}>a</Counter>
</>`;
assert.strictEqual(transfrom.init(data1).genRenderString(), expected1);

/**
 * Test ship all things.
 */
const expected3 = `
import React from 'react';
import Counter from './components/Counter'

export default class Activity extends React.PureComponent {

  render() {
    return (
      <>
        <div toWhat={"world"}>Hello</div>
        <Counter nums={"1"}>a</Counter>
      </>
    )
  }
}`;
assert.strictEqual(transfrom.init(data1).ship(), expected3);

console.log("All assertions passed~");
