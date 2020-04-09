import * as path from "path";

const templateConfig = {
  directory: path.join(__dirname, "../views")
};

class TemplateEngine {
  constructor() {
    this.engine = require("edge.js");
  }
  start() {
    this.engine.registerViews(templateConfig.directory);
  }
}

export default new TemplateEngine();
