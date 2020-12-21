import React, { useState } from "react";
import "./styles.css";
import ReactDataGrid from "react-data-grid";
import SdgFormatter from "./SdgFormatter";
import SdgEditor from "./SdgEditor";
import ProgressBarFormatter from "./ProgressBarFormatter";
import { Toolbar, Data } from "react-data-grid-addons";

const {
  DraggableHeader: { DraggableContainer }
} = require("react-data-grid-addons");

const selectors = Data.Selectors;

const columns = [
  { key: "id", name: "ID", type: "number", draggable: true },
  {
    key: "name",
    name: "Name",
    editable: true,
    sortable: true,
    sortDescendingFirst: true,
    resizable: true,
    draggable: true
  },
  {
    key: "projectTitle",
    name: "Project Title",
    editable: true,
    width: 200,
    resizable: true,
    draggable: true
  },
  {
    key: "projectProgress",
    name: "Progress",
    formatter: ProgressBarFormatter,
    width: 200,
    resizable: true,
    filterable: true,
    draggable: true
  },
  {
    key: "sdg",
    name: "SDG",
    editor: SdgEditor,
    formatter: SdgFormatter,
    width: 600,
    resizable: true,
    draggable: true
  }
];

const rows = [
  {
    id: 1,
    name: "Juan dela Cruz",
    projectTitle: "Water pump",
    projectProgress: 20,
    sdg: [5]
  },
  {
    id: 2,
    name: "Jane Doe",
    projectTitle: "English lessons for refugees",
    projectProgress: 60,
    sdg: [9, 3]
  },
  {
    id: 3,
    name: "John Doe",
    projectTitle: "Solar powered generator",
    projectProgress: 0,
    sdg: [6, 10, 12]
  }
];

const handleFilterChange = (filter) => (filters) => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

export default function App() {
  const [state, setState] = useState({ columns: columns, rows: rows });

  const [filters, setFilters] = useState({});

  const filteredRows = getRows(state.rows, filters);

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    setState((state) => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  const onGridSort = (sortColumn, sortDirection) => {
    if (sortDirection === "ASC") {
      let newRows = [...state.rows];

      newRows.sort(function (a, b) {
        if (a[sortColumn] < b[sortColumn]) {
          return -1;
        }
        if (a[sortColumn] > b[sortColumn]) {
          return 1;
        }
        return 0;
      });

      setState({ rows: newRows });
    } else if (sortDirection === "DESC") {
      let newRows = [...state.rows];

      newRows.sort(function (a, b) {
        if (a[sortColumn] > b[sortColumn]) {
          return -1;
        }
        if (a[sortColumn] < b[sortColumn]) {
          return 1;
        }
        return 0;
      });

      setState({ rows: newRows });
    } else {
      setState({ rows: rows });
    }
  };

  const onHeaderDrop = (source, target) => {
    const stateCopy = Object.assign({}, state);
    const columnSourceIndex = state.columns.findIndex((i) => i.key === source);
    const columnTargetIndex = state.columns.findIndex((i) => i.key === target);

    const newCol = stateCopy.columns.splice(columnSourceIndex, 1)[0];
    stateCopy.columns.splice(columnTargetIndex, 0, newCol);

    setState({ ...state, columns: [] });

    setState({ ...state, columns: [...stateCopy.columns] });
  };

  return (
    <DraggableContainer onHeaderDrop={onHeaderDrop}>
      <ReactDataGrid
        columns={state.columns}
        rowGetter={(i) => filteredRows[i]}
        rowsCount={filteredRows.length ?? 3}
        onGridRowsUpdated={onGridRowsUpdated}
        onGridSort={(sortColumn, sortDirection) =>
          onGridSort(sortColumn, sortDirection)
        }
        enableCellSelect={true}
        toolbar={<Toolbar enableFilter={true} />}
        onAddFilter={(filter) => setFilters(handleFilterChange(filter))}
        onClearFilters={() => setFilters({})}
      />
    </DraggableContainer>
  );
}
