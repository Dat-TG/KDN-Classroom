import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
export default function UserManagementPage() {
  const { t } = useTranslation("global");
  return (
    <div
      style={{
        padding: "32px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          marginBottom: "32px",
        }}
      >
        {t("usersManagement")}
      </Typography>
      <ReactTabulator
        options={{
          layout: "fitDataTable",
          pagination: true, //enable pagination
          paginationSize: 5,
          paginationInitialPage: 1,
          paginationCounter: function (
            pageSize: number,
            currentRow: number,
            _currentPage: number,
            totalRows: number,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _totalPages: number
          ) {
            return (
              "Showing " +
              currentRow +
              "-" +
              (currentRow + pageSize - 1) +
              " of " +
              totalRows +
              " users total"
            );
          },
          paginationSizeSelector: [5, 10, 25, 50, 100],
          paginationMode: "remote",
          ajaxURL: `${import.meta.env.VITE_REACT_APP_BASE_URL}/user`,
          ajaxConfig: {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ajaxResponse: function (_url: string, _params: any, response: any) {
            return {
              last_page: response.pageCount,
              last_row: response.itemCount,
              data: response.data,
            };
          },
        }}
        events={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          rowSelectionChanged: (data: any[]) => {
            //rows - array of row components for the currently selected rows in order of selection
            //data - array of data objects for the currently selected rows in order of selection
            //selected - array of row components that were selected in the last action
            //deselected - array of row components that were deselected in the last action
            console.log(data);
          },
        }}
        columns={[
          {
            title: "",
            formatter: "rowSelection",
            titleFormatter: "rowSelection",
            hozAlign: "center",
            vertAlign: "middle",
            headerHozAlign: "center",
            headerSort: false,
          },
          {
            title: "#",
            formatter(cell) {
              return `${
                ((cell.getTable().getPage() || 1) - 1) *
                  cell.getTable().getPageSize() +
                cell.getRow().getPosition()
              }`;
            },
          },
          {
            title: "ID",
            field: "id",
            sorter: "number",
          },
          {
            title: "Email",
            field: "userName",
            sorter: "string",
          },
          {
            title: "First Name",
            field: "name",
            sorter: "string",
          },
          {
            title: "Last Name",
            field: "surname",
            sorter: "string",
          },
          {
            title: "Avatar",
            field: "avatar",
            formatter: "image",
            formatterParams: {
              height: "50px",
              width: "50px",
            },
          },
          {
            title: "Role",
            field: "roles",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            formatter(cell, _formatterParams, _onRendered) {
              const arr = cell.getValue();
              let roles = "";
              arr.forEach((element: { id: number; name: string }) => {
                roles += element.name + ", ";
              });
              roles = roles.slice(0, -2);
              return roles;
            },
          },
          {
            minWidth: 100,
            editable: true,
            title: "Status",
            formatter: () => {
              const isActive = Math.random() > 0.5;
              return isActive ? "✔️" : "❌"; // Display tick or cross based on status
            },
            editor: "select",
            editorParams: {
              values: {
                true: "Active ✔️",
                false: "Ban ❌",
              },
            },
            width: 30,
            hozAlign: "center",
            vertAlign: "middle",
          },
        ]}
      />
    </div>
  );
}
