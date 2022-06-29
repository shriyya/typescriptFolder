import { AgGridReact } from "ag-grid-react";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "ag-grid-enterprise"; //for adding group headers
import { render } from "react-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { StyledEngineProvider } from "@mui/material/styles";

import {
  ColDef,
  ColGroupDef,
  StatusPanelDef,
  SideBarDef,
  GetContextMenuItemsParams,
  GridApi,
  MenuItemDef,
  ColumnApi,
} from "ag-grid-enterprise";
// import {
//   ColDef,
//   ColGroupDef,
//   GetContextMenuItems,
//   GetContextMenuItemsParams,
//   Grid,
//   GridOptions,
//   GridReadyEvent,
//   MenuItemDef,
// } from 'ag-grid-community';
import CoustomTooltip from "./coustomTooltip";
import ClickableStatusBarComponent from "./clickableStatusBarComponent";
import CustomheaderGroup from "./customheaderGroup";
import DialogBox from "./DailogBox";
import api from "../Api";
import DeleteDailog from "./DeleteDailog";
interface dataFormate {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface chg {
  addRowCompListener: {};
  api: {};
  colDef: {};
  column: {};
  columnApi: {};
  context: undefined;
  data: { id: string };
  eGridCell: {};
  eParentOfValue: {};
  formatValue: {};
  getValue: {};
  node: {};
  refreshCell: {};
  registerRowDragger: {};
  rowIndex: {};
  setValue: {};
  value: string;
  buttonText: string;
}
// useEffect(() => {
//   const valueByApi = api as any;
//   const value = valueByApi.valuePost(); //.then(function (result) {

//   console.log(value);
// }, []);

const TableView: React.FC<{ data: dataFormate[] }> = (props) => {
  const [dataValue, ChangeDataValue] = useState<dataFormate[]>([]);
  // console.log(props.data);
  const [deleteDailog, setDeleteDailog] = useState(false);
  useEffect(() => ChangeDataValue(props.data), [props.data]);
  // console.log(dataValue);
  useEffect(() => {
    // const value = () => {
    //   // api.valuePost(userValue); //.then(function (result) {
    //   // DialogBox(setOpen);
    //   // console.log(value);
    // };
    const hgfh = async () => {
      await api
        .valueGet()
        .then(function (result) {
          return result.json();
        })
        .then((res) => {
          return res;
        });
    };
    hgfh();
  }, []);
  // console.log(dataValue);

  const [rowData] = [
    dataValue
      ? dataValue.map((ele, index) => {
          return {
            make: ele.title,
            model: ele.body,
            price: ele.id,
            id: ele.id,
          };
        })
      : null,
  ];

  const statusBar = useMemo<{
    statusPanels: StatusPanelDef[];
  }>(() => {
    return {
      statusPanels: [
        {
          statusPanel: ClickableStatusBarComponent,
        },
      ],
    };
  }, []);

  const SimpleComp = (p: chg) => {
    const dollar = useCallback<() => void>(() => {
      window.alert("Dollar" + p.value);
    }, []);
    return (
      <>
        <button onClick={dollar}>{p.buttonText}</button>
        {p.value}
      </>
    );
  };

  const [gridRef, setGridRef] = useState(useRef<AgGridReact>(null));

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      tooltipComponent: CoustomTooltip,
      // filter: true,
      enabledRowGroup: true, //enterprise
      // cellRenderer: (p: chg) => {
      //   console.log(p.data.id);

      //   return localStorage.setItem("id", p.data.id);
      // },
      resizable: true,
      editable: true,
      filterParams: {
        // buttons: ["apply", "clear", "cancel", "reset"],
        debounceMs: 2000,
      },
    };
  }, []);

  // const;

  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: "Athlete Details",
      headerGroupComponent: CustomheaderGroup,
      children: [
        // {
        //   field: "make",
        //   filter: "agTextColumnFilter",
        //   cellRendererParams: { buttonText: "hello =" },
        // },
        // {
        //   field: "model",
        //   columnGroupShow: "open",
        //   cellRenderer: (p: chg) => <>{p.value}</>,
        // },
        // {
        //   field: "price",
        //   columnGroupShow: "open",
        //   filter: "agNumberColumnFilter",
        //   cellRendererParams: { buttonText: "+" },
        // },
        { field: "athlete", width: 90 },
        { field: "age", width: 100, columnGroupShow: "open" },
        {
          field: "button",
          width: 120,
          cellRenderer: (p: chg) => {
            return (
              <>
                {dataValue ? (
                  <DialogBox
                    selceted={p}
                    gridRef={setGridRef}
                    header="Update"
                    dataChange={ChangeDataValue}
                  />
                ) : null}
              </>
            );
          },
        },
        {
          field: "country",
          width: 120,
          columnGroupShow: "open",
        },
      ],
    },
    {
      headerName: "Medal details",
      headerGroupComponent: CustomheaderGroup,
      children: [
        {
          field: "model",
          filter: "agTextColumnFilter",
          cellRenderer: (p: chg) => <>{p.value}</>,
        },
        {
          field: "price",
          filter: "agTextColumnFilter",
          cellRendererParams: { buttonText: "+" },
        },
        { field: "year", width: 90 },
        { field: "date", width: 110 },
        {
          field: "sport",
          width: 110,
          columnGroupShow: "open",
        },
        {
          field: "gold",
          width: 100,
          columnGroupShow: "open",
        },
        {
          field: "silver",
          width: 100,
          columnGroupShow: "open",
        },
        {
          field: "bronze",
          width: 100,
          columnGroupShow: "open",
        },
        {
          field: "total",
          width: 100,
          columnGroupShow: "open",
        },
      ],
    },
  ]);
  function createFlagImg(flag: string) {
    return (
      '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' +
      flag +
      '.png"/>'
    );
  }

  const getContextMenuItems = useCallback(
    (params: GetContextMenuItemsParams): (string | MenuItemDef)[] => {
      var result: (string | MenuItemDef)[] = [
        {
          // custom item
          name: "Alert " + params.value,
          action: () => {
            window.alert("Alerting about " + params.value);
          },
          cssClasses: ["redFont", "bold"],
        },
        {
          // custom item
          name: "Always Disabled",
          disabled: true,
          tooltip:
            "Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!",
        },
        {
          name: "Country",
          subMenu: [
            {
              name: "Ireland",
              action: () => {
                console.log("Ireland was pressed");
              },
              icon: createFlagImg("ie"),
            },
            {
              name: "UK",
              action: () => {
                console.log("UK was pressed");
              },
              icon: createFlagImg("gb"),
            },
            {
              name: "France",
              action: () => {
                console.log("France was pressed");
              },
              icon: createFlagImg("fr"),
            },
          ],
        },
        {
          name: "Person",
          subMenu: [
            {
              name: "Niall",
              action: () => {
                console.log("Niall was pressed");
              },
            },
            {
              name: "Sean",
              action: () => {
                console.log("Sean was pressed");
              },
            },
            {
              name: "John",
              action: () => {
                console.log("John was pressed");
              },
            },
            {
              name: "Alberto",
              action: () => {
                console.log("Alberto was pressed");
              },
            },
            {
              name: "Tony",
              action: () => {
                console.log("Tony was pressed");
              },
            },
            {
              name: "Andrew",
              action: () => {
                console.log("Andrew was pressed");
              },
            },
            {
              name: "Kev",
              action: () => {
                console.log("Kev was pressed");
              },
            },
            {
              name: "Will",
              action: () => {
                console.log("Will was pressed");
              },
            },
            {
              name: "Armaan",
              action: () => {
                console.log("Armaan was pressed");
              },
            },
          ],
        },
        "separator",
        {
          // custom item
          name: "Delete",
          // shortcut: "Alt + W",
          action: () => {
            setDeleteDailog(true);
            console.log("delete Item Selected");
          },
          icon: '<i class="fa-solid fa-trash"></i>',
        },
        {
          // custom item
          name: "Filter",
          // shortcut: "Alt + W",
          action: () => {
            gridRef.current!.api.setQuickFilter(
              localStorage.getItem("filterValue")
            );
          },
          icon: '<i class="fa-solid fa-filter"></i>',
        },
        {
          // custom item
          name: "Mac",
          shortcut: "Alt + M",
          action: () => {
            console.log("Mac Item Selected");
          },
          icon: '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
        },
        "separator",
        {
          // custom item
          name: "Checked",
          checked: true,
          action: () => {
            console.log("Checked Selected");
          },
          icon: '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
        },
        "copy",
        "separator",
        "chartRange",
      ];
      return result;
    },
    []
  );
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, []);
  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
        },
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
        },
      ],
      defaultToolPanel: "customStats",
    };
  }, []);

  return (
    <div>
      <h1>Ag-Grid tabel</h1>
      <div
        data-testid="ag-grid"
        className="ag-theme-alpine"
        style={{ height: 400, width: 900 }}
      >
        <DialogBox
          gridRef={setGridRef}
          data={dataValue}
          dataChange={ChangeDataValue}
          header="Open form dialog to add data"
        />
        {deleteDailog ? (
          <DeleteDailog
            deleteDailog={setDeleteDailog}
            dataChange={ChangeDataValue}
          />
        ) : null}
        <AgGridReact
          // rowGroupPanelShow="always" //drag cloumn
          defaultColDef={defaultColDef}
          rowData={rowData}
          columnDefs={columnDefs}
          getContextMenuItems={getContextMenuItems}
          ref={gridRef}
          animateRows={true}
          sideBar={sideBar}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
          rowSelection={"multiple"}
          onCellContextMenu={(e) => {
            localStorage.setItem("id", e.data.id);
            localStorage.setItem("filterValue", e.value);
          }}
          allowContextMenuWithControlKey={true}
          // statusBar={statusBar}
        ></AgGridReact>
      </div>
    </div>
  );
};
export default TableView;
