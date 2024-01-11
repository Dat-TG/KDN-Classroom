import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import React from "react";
import ConfirmationDialog from "../../components/common/ConfirmDialog";
import { Tabulator } from "react-tabulator/lib/types/TabulatorTypes";
import {
  adminMapStudentId,
  banUser,
  unbanUser,
} from "../../api/admin/apiAdmin";
import toast from "../../utils/toast";
import ChangeStudentIdDialog from "./ChangeStudentIdDialog";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";
import ImportStudentList from "../TestUpload/ImportStudentList";
import DownloadStudentsTemplate from "../../components/admin/DownloadStudentsTemplate";
export default function UserManagementPage() {
  const user = useSelector(sGetUserInfo);
  const [t] = useTranslation("global");
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openChangeStudentId, setOpenChangeStudentId] = React.useState(false);
  const [confirmContent, setConfirmContent] = React.useState("");
  const [currentCell, setCurrentCell] =
    React.useState<Tabulator.CellComponent>();
  const onConfirm = () => {
    if (currentCell?.getValue() == true) {
      banUser(currentCell?.getRow().getData().id)
        .then(() => {
          toast.success(t("banUserSuccessfully"));
        })
        .catch((error) => {
          toast.error(error.detail.message);
          currentCell?.restoreOldValue();
        });
    } else {
      unbanUser(currentCell?.getRow().getData().id)
        .then(() => {
          toast.success(t("unbanUserSuccessfully"));
        })
        .catch((error) => {
          toast.error(error.detail.message);
          currentCell?.restoreOldValue();
        });
    }
    setOpenConfirm(false);
  };
  const onStudentIdChange = async (newStudentId: string) => {
    adminMapStudentId(
      currentCell?.getRow().getData().id,
      newStudentId,
      user?.id ?? 0
    )
      .then(() => {
        toast.success(t("updateStudentIdSuccessfully"));
        currentCell?.getRow().update({
          code: [
            {
              code: newStudentId,
            },
          ],
        });
      })
      .catch((error) => {
        toast.error(error.detail.message);
      });

    setOpenChangeStudentId(false);
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
          marginBottom: "16px",
        }}
      >
        {t("usersManagement")}
      </Typography>
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <ImportStudentList />
        <DownloadStudentsTemplate />
      </div>
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
              Math.min(currentRow + pageSize - 1, totalRows) +
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
            title: "Student ID",
            field: "code",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            formatter(cell, _formatterParams, _onRendered) {
              const arr = cell.getValue();
              if (arr == null || arr.length == 0 || arr[0].code == null)
                return "";
              return arr[0].code;
            },
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
            field: "isBan",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            formatter(cell, _formatterParams, _onRendered) {
              const isBan = cell.getValue();
              return isBan ? "Ban ❌" : "Active ✔️";
            },
            editor: "select",
            editorParams: {
              values: [
                {
                  label: "Ban ❌",
                  value: true,
                },
                {
                  label: "Active ✔️",
                  value: false,
                },
              ],
            },
            cellEdited: function (cell) {
              setCurrentCell(cell);
              const isBan = cell.getValue();
              const email = cell.getRow().getData().userName;
              setConfirmContent(
                `${t("areYouSureYouWantTo")} ${
                  isBan ? t("banUser") : t("unbanUser")
                } ${email}?`
              );
              setOpenConfirm(true);
            },
            width: 30,
            hozAlign: "center",
            vertAlign: "middle",
          },
          {
            minWidth: 100,
            title: "",
            formatter: function () {
              //plain text value
              return "<button>Edit</button>";
            },
            width: 40,
            hozAlign: "center",
            vertAlign: "middle",
            cellClick: function (_e, cell) {
              setCurrentCell(cell);
              setOpenChangeStudentId(true);
            },
          },
        ]}
      />
      <ConfirmationDialog
        open={openConfirm}
        content={confirmContent}
        onClose={() => onClose()}
        onConfirm={() => onConfirm()}
      />
      <ChangeStudentIdDialog
        open={openChangeStudentId}
        onClose={() => {
          setOpenChangeStudentId(false);
        }}
        onConfirm={onStudentIdChange}
      />
    </div>
  );
}
