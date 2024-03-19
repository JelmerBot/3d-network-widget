const widgets = require("@jupyter-widgets/base");
const _ = require("lodash");
const App = require("./app.js").default;

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
const NetworkWidget3DModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
    _model_name: "NetworkWidget3DModel",
    _view_name: "NetworkWidget3DView",
    _model_module: "network_widget_3d",
    _view_module: "network_widget_3d",
    _model_module_version: "0.1.0",
    _view_module_version: "0.1.0",
    nodes: [],
    edges: [],
  }),
});

// Custom View. Renders the widget model.
const NetworkWidget3DView = widgets.DOMWidgetView.extend({
  // Defines how the widget gets rendered into the DOM
  render() {
    new App({
      target: this.el,
      props: {
        model: this.model,
      },
    });
  },
});

module.exports = {
  NetworkWidget3DModel,
  NetworkWidget3DView,
};
