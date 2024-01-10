import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/material";

interface IFilterProps {
  searchText: string | null;
  isActive: boolean | null;
  order: "ASC" | "DESC" | null;
  orderBy: string | null;
  onSearchTextChange: (value: string | null) => void;
  onIsActiveChange: (value: boolean | null) => void;
  onOrderChange: (value: "ASC" | "DESC" | null) => void;
  onOrderByChange: (value: string | null) => void;
}

const FilterRow = ({
  searchText,
  isActive,
  order,
  orderBy,
  onSearchTextChange,
  onIsActiveChange,
  onOrderChange,
  onOrderByChange,
}: IFilterProps) => {
  return (
    <Box display={"flex"} gap={2} alignItems="center" marginBottom={4}>
      <TextField
        fullWidth
        label="Search"
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id="activeLabel">Active</InputLabel>
        <Select
          labelId="activeLabel"
          label="Active"
          value={isActive == null ? "null" : isActive ? "active" : "inactive"}
          onChange={(e) =>
            onIsActiveChange(
              e.target.value == "active"
                ? true
                : e.target.value == "inactive"
                ? false
                : null
            )
          }
        >
          <MenuItem value={"null"}>None</MenuItem>
          <MenuItem value={"active"}>Active</MenuItem>
          <MenuItem value={"inactive"}>Inactive</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="orderLabel">Order</InputLabel>
        <Select
          value={order == null ? "null" : order}
          onChange={(e) =>
            onOrderChange(
              e.target.value == "null"
                ? null
                : (e.target.value as "ASC" | "DESC" | null)
            )
          }
          labelId="orderLabel"
          label="Order"
        >
          <MenuItem value="null">None</MenuItem>
          <MenuItem value="ASC">Ascending</MenuItem>
          <MenuItem value="DESC">Descending</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="orderByLabel">Order By</InputLabel>
        <Select
          labelId="orderByLabel"
          label="Order By"
          value={orderBy == null ? "null" : orderBy}
          onChange={(e) =>
            onOrderByChange(e.target.value == "null" ? null : e.target.value)
          }
        >
          <MenuItem value="null">None</MenuItem>
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="nameCourse">Name</MenuItem>
          <MenuItem value="topic">Topic</MenuItem>
          <MenuItem value="room">Room</MenuItem>
          <MenuItem value="code">Code</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterRow;
