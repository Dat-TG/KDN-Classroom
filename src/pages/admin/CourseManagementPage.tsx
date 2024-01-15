import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import React from "react";
import ConfirmationDialog from "../../components/common/ConfirmDialog";
import { Tabulator } from "react-tabulator/lib/types/TabulatorTypes";
import { RoleCourseNumber } from "../../types/course";
import FilterRow from "../../components/admin/FilterRow";
import { activeCourse, inactiveCourse } from "../../api/admin/apiAdmin";
import toast from "../../utils/toast";
export default function CourseManagementPage() {
  const [t] = useTranslation("global");
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [confirmContent, setConfirmContent] = React.useState("");
  const [currentCell, setCurrentCell] =
    React.useState<Tabulator.CellComponent>();
  const [isActive, setIsActive] = React.useState<boolean | null>(null);
  const [orderBy, setOrderBy] = React.useState<string | null>(null);
  const [order, setOrder] = React.useState<"ASC" | "DESC" | null>(null);
  const [searchText, setSearchText] = React.useState<string | null>(null);
  const onConfirm = () => {
    if (currentCell?.getValue() == true) {
      activeCourse(currentCell?.getRow().getData().id)
        .then(() => {
          toast.success(t("activeClassSuccessfully"));
        })
        .catch((error) => {
          toast.error(error.detail.message);
          currentCell?.restoreOldValue();
        });
    } else {
      inactiveCourse(currentCell?.getRow().getData().id)
        .then(() => {
          toast.success(t("inactiveClassSuccessfully"));
        })
        .catch((error) => {
          toast.error(error.detail.message);
          currentCell?.restoreOldValue();
        });
    }
    setOpenConfirm(false);
  };
  const onClose = () => {
    currentCell?.restoreOldValue();
    setOpenConfirm(false);
  };

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
        {t("classManagement")}
      </Typography>
      <FilterRow
        isActive={isActive}
        onIsActiveChange={(newValue) => setIsActive(newValue)}
        onOrderByChange={(newValue) => setOrderBy(newValue)}
        onOrderChange={(newValue) => setOrder(newValue)}
        onSearchTextChange={(newValue) => setSearchText(newValue)}
        order={order}
        orderBy={orderBy}
        searchText={searchText}
      />
      <div
        style={{ overflow: "auto", maxHeight: "500px", marginBottom: "32px" }}
      >
        <ReactTabulator
          key={`${isActive}-${orderBy}-${order}-${searchText}`}
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
                Math.min(currentRow + pageSize - 1, totalRows) +
                " of " +
                totalRows +
                " classes total"
              );
            },
            paginationSizeSelector: [5, 10, 25, 50, 100],
            paginationMode: "remote",
            ajaxURL:
              `${
                import.meta.env.VITE_REACT_APP_BASE_URL ||
                "https://web-advanced-server-v2.onrender.com/api"
              }/course/admin/all?` +
              (isActive !== null ? `isActive=${isActive}&` : "") +
              (orderBy !== null ? `orderBy=${orderBy}&` : "") +
              (order !== null ? `order=${order}&` : "") +
              (searchText !== null && searchText.length > 0
                ? `search=${searchText}`
                : ""),
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
              maxWidth: 150,
              title: t("className"),
              field: "nameCourse",
              sorter: "string",
            },
            {
              maxWidth: 200,
              title: t("topic"),
              field: "topic",
              sorter: "string",
            },
            {
              maxWidth: 100,
              title: t("room"),
              field: "room",
              sorter: "string",
            },
            {
              title: t("classCode"),
              field: "code",
              sorter: "string",
            },
            {
              title: t("teachers"),
              sorter: "number",
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              formatter(cell, _formatterParams, _onRendered) {
                return cell
                  .getRow()
                  .getData()
                  .userCourses.filter(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (item: any) =>
                      item.userRoleCourse === RoleCourseNumber.Teacher ||
                      item.userRoleCourse === RoleCourseNumber.Coteacher
                  ).length;
              },
            },
            {
              title: t("students"),
              sorter: "number",
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              formatter(cell, _formatterParams, _onRendered) {
                return cell
                  .getRow()
                  .getData()
                  .userCourses.filter(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (item: any) =>
                      item.userRoleCourse === RoleCourseNumber.Student
                  ).length;
              },
            },
            {
              title: t("gradeReviewRequest"),
              sorter: "number",
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              formatter(cell, _formatterParams, _onRendered) {
                return cell.getRow().getData().requestReview.length;
              },
            },
            {
              minWidth: 100,
              editable: true,
              title: "Status",
              field: "isActive",
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              formatter(cell, _formatterParams, _onRendered) {
                const isActive = cell.getValue();
                return isActive ? "Active ✔️" : "Inactive ❌";
              },
              editor: "select",
              editorParams: {
                values: [
                  {
                    label: "Active ✔️",
                    value: true,
                  },
                  {
                    label: "Inactive ❌",
                    value: false,
                  },
                ],
              },
              cellEdited: function (cell) {
                setCurrentCell(cell);
                const isActive = cell.getValue();
                const id = cell.getRow().getData().id;
                setConfirmContent(
                  `${t("areYouSureYouWantTo")} ${
                    isActive ? t("activeClass") : t("inactiveClass")
                  } ${id}?`
                );
                setOpenConfirm(true);
              },
              width: 30,
              hozAlign: "center",
              vertAlign: "middle",
            },
          ]}
        />
        <div
          style={{
            height: "32px",
          }}
        ></div>
      </div>
      <ConfirmationDialog
        open={openConfirm}
        content={confirmContent}
        onClose={() => onClose()}
        onConfirm={() => onConfirm()}
      />
    </div>
  );
}
