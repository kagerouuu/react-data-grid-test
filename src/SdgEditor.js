import { Input, MenuItem, Paper, Select } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import sdgList from "./sdg";

export default class SdgEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sdg: [...this.props.rowData.sdg] };
  }

  getValue() {
    return this.state;
  }

  getInputNode() {
    return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
  }

  handleChangeComplete = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    if (this.state.sdg.find((x) => x == value)) {
      let newRows = this.state.sdg.filter((x) => x !== parseInt(value, 10));
      this.setState({ sdg: [...newRows] }, () => this.props.onCommit());
    } else {
      this.setState({ sdg: [...this.state.sdg, parseInt(value, 10)] }, () =>
        this.props.onCommit()
      );
    }
  };

  render() {
    return (
      <Paper elevation={3} style={{ padding: "24px" }}>
        <Select
          multiple
          native
          value={this.state.sdgList}
          onChange={this.handleChangeComplete}
        >
          {sdgList.map((x) => (
            <option key={x.id} value={x.id}>
              {x.value}
            </option>
          ))}
        </Select>
      </Paper>
    );
  }
}
