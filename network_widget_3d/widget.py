import ipywidgets as widgets
from traitlets import Unicode, List, Dict, Integer, Float


@widgets.register
class Widget3D(widgets.DOMWidget):
    """The widget."""

    _view_name = Unicode("NetworkWidget3DView").tag(sync=True)
    _model_name = Unicode("NetworkWidget3DModel").tag(sync=True)
    _view_module = Unicode("network_widget_3d").tag(sync=True)
    _model_module = Unicode("network_widget_3d").tag(sync=True)
    _view_module_version = Unicode("^0.1.0").tag(sync=True)
    _model_module_version = Unicode("^0.1.0").tag(sync=True)

    nodes = List(Dict()).tag(sync=True)
    edges = List(
        Dict(
            per_key_traits={
                "source": Integer(),
                "target": Integer(),
                "distance": Float(),
            }
        )
    ).tag(sync=True)

    def __init__(self, node_data, network):
        super().__init__()
        tmp = node_data.reset_index().rename(columns={"id": "label"})
        tmp["id"] = list(range(tmp.shape[0]))
        self.nodes = tmp.to_dict(orient="records")
        self.show(network)

    def show(self, network):
        self.edges = [
            {
                "source": int(network.row[i]),
                "target": int(network.col[i]),
                "distance": float(network.data[i]),
            }
            for i in range(len(network.row))
        ]
