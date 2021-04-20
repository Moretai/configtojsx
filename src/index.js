const fs = require("fs");
const path = require("path");

const isObject = (obj) => typeof obj === "object" && obj !== null;

const defaultConfig = {
  template: (deps, compstr, name) => `
import React from 'react';
${[...deps].map((dep) => `import ${dep} from './components/${dep}'`).join("\n")}

export default class ${name} extends React.PureComponent {

  render() {
    return (
      ${compstr}
    )
  }
}`,
  dist: (name) => path.join(__dirname, `${name}.jsx`),
};

class ConfigToJSXFile {
  constructor(config = defaultConfig) {
    this._config = config;
  }

  init(data) {
    this._data = data;
    this._components = this._data.components;
    this._deps = new Set();
    return this;
  }

  genComponent(com) {
    const { type, props, children } = com;
    const propKeys = isObject(props) ? Object.keys(props) : [];

    const firstChar = type && type.charAt(0);
    if (firstChar.toUpperCase() === firstChar) {
      this._deps.add(type);
    }

    let s = `<${type}`;
    if (propKeys.length == 0) {
      s += `>`;
    } else {
      s += " ";
      s += propKeys
        .map((key) => `${key}={${JSON.stringify(props[key])}}`)
        .join(" ");
      s += `>`;
    }
    // simple value
    if (children) {
      s += `${children}`;
    }

    s += `</${type}>`;
    return s;
  }

  genRenderString(num = 0) {
    let str = `<>\n`;
    this._components.forEach((x) => {
      str += `${" ".repeat(num)}  ${this.genComponent(x)}\n`;
    });
    str += `${" ".repeat(num)}</>`;
    return str;
  }

  /**
   * combime template with render string
   */
  ship() {
    return this._config.template(
      this._deps,
      this.genRenderString(6),
      this._data.name || "Sample"
    );
  }

  genFile() {
    fs.writeFileSync(
      this.config.dist(this._data.name || "Sample"),
      this.ship()
    );
  }
}

module.exports = {
  ConfigToJSXFile,
};
