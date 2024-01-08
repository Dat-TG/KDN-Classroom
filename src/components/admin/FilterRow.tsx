import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/material";

interface IFilterProps {
  searchText: string;
  isActive: boolean;
  order: "ASC" | "DESC";
  orderBy: string;
  onSearchTextChange: (value: string) => void;
  onIsActiveChange: (value: boolean) => void;
  onOrderChange: (value: "ASC" | "DESC") => void;
  onOrderByChange: (value: string) => void;
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
          value={isActive}
          onChange={(e) => onIsActiveChange(Boolean(e.target.value))}
        >
          <MenuItem value={1}>Active</MenuItem>
          <MenuItem value={0}>Inactive</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="orderLabel">Order</InputLabel>
        <Select
          value={order}
          onChange={(e) => onOrderChange(e.target.value as "ASC" | "DESC")}
          labelId="orderLabel"
          label="Order"
        >
          <MenuItem value="ASC">Ascending</MenuItem>
          <MenuItem value="DESC">Descending</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="orderByLabel">Order By</InputLabel>
        <Select
          labelId="orderByLabel"
          label="Order By"
          value={orderBy}
          onChange={(e) => onOrderByChange(e.target.value)}
        >
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
