const plugin = require("./index");
const base = require("@jupyter-widgets/base");

module.exports = {
  id: "network_widget_3d:plugin",
  requires: [base.IJupyterWidgetRegistry],
  activate: function (app, widgets) {
    widgets.registerWidget({
      name: "network_widget_3d",
      version: plugin.version,
      exports: plugin,
    });
  },
  autoStart: true,
};
