import { ChangeEvent, MouseEvent, useState, useMemo, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { setItem } from "../../library/localStorage";

// if theres time, build own search
import SearchBar from "@mkyy/mui-search-bar";

// 1. The ability to view the dataset in an organized, sensible way.

interface Data {
  id: number;
  name: string;
  nametype: string;
  recclass: string;
  mass: number;
  fall: string;
  year: Date;
  reclat: number;
  reclong: number;
  geolocation: {
    type: string;
    coordinates: [number, number];
  };
}

function createData(
  name: string,
  id: number,
  nametype: string,
  recclass: string,
  mass: number,
  fall: string,
  year: Date,
  reclat: number,
  reclong: number,
  geolocation: {
    type: string;
    coordinates: [number, number];
  }
): Data {
  return {
    name,
    id,
    nametype,
    recclass,
    mass,
    fall,
    year,
    reclat,
    reclong,
    geolocation,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Id",
  },
  {
    id: "nametype",
    numeric: true,
    disablePadding: false,
    label: "Name Type",
  },
  {
    id: "recclass",
    numeric: true,
    disablePadding: false,
    label: "Rec Class",
  },
  {
    id: "mass",
    numeric: true,
    disablePadding: false,
    label: "Mass",
  },
  {
    id: "fall",
    numeric: true,
    disablePadding: false,
    label: "Fall",
  },
  {
    id: "year",
    numeric: true,
    disablePadding: false,
    label: "Year",
  },
  {
    id: "reclat",
    numeric: true,
    disablePadding: false,
    label: "Reclat",
  },
  {
    id: "reclong",
    numeric: true,
    disablePadding: false,
    label: "Reclong",
  },
  {
    id: "geolocation",
    numeric: true,
    disablePadding: false,
    label: "Geo Location",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  tabNumber: number;
  selected: readonly number[];
  favorites: Data[];
  setFavorites: unknown;
  dataSet: Data[] | [];
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, selected, favorites, setFavorites, dataSet, tabNumber } =
    props;

  // 3. The ability to save a list of their favorite meteorites that persists across browser sessions and tabs.
  // localStorage for persisting across browser tab/sessosion
  // sessionStorage is cleared upon tab close
  // Could also be done with cookies

  const onDeleteClick = () => {
    if (dataSet.length === 0) {
      return;
    }

    selected.forEach((item) => {
      dataSet.filter((row, index) => {
        if (row.id === item) {
          dataSet.splice(index, 1);
        }
      });
    });
    // localStorage.setItem("favorites", JSON.stringify(dataSet));
    console.log(dataSet, "what am i");
    setItem("favorites", dataSet);
    setFavorites(dataSet);
  };

  const onFavoriteClick = () => {
    let temp: Data[] = [];
    if (favorites.length !== 0) {
      temp = [...favorites];
    }

    function hasDuplicate<T>(
      array: T[],
      newObj: T,
      property: keyof T
    ): boolean {
      return array.some((obj) => obj[property] === newObj[property]);
    }

    // Function to add a new object to the array if it doesn't already exist
    function addObjectIfNotExists<T>(
      array: T[],
      newObj: T,
      property: keyof T
    ): boolean {
      if (!hasDuplicate(array, newObj, property)) {
        array.push(newObj);
        return true; // Indicates successful insertion
      }
      return false; // Indicates duplicate, not inserted
    }

    selected.forEach((item) => {
      dataSet.filter((row) => {
        if (row.id === item) {
          addObjectIfNotExists(temp, row, "id");
        }
      });
    });

    setItem("favorites", temp);
    setFavorites(temp);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Meteorite Landings
        </Typography>
      )}
      {numSelected > 0 ? (
        tabNumber > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon onClick={onDeleteClick} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Favorite">
            <IconButton>
              <FavoriteIcon onClick={onFavoriteClick} />
            </IconButton>
          </Tooltip>
        )
      ) : (
        // 4. The ability to filter the dataset by the fall field. TODO
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function CustomTable({
  data = [],
  favorites = [],
  setFavorites = () => {},
  tabNumber = 0,
}) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("id");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataSet, setDataSet] = useState([]);
  const [originalDataSet, setOriginalDataSet] = useState([]);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = dataSet.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    const rows = data.map((item: Data) => {
      return createData(
        item.name,
        item.id,
        item.nametype,
        item.recclass,
        item.mass,
        item.fall,
        item.year,
        item.reclat,
        item.reclong,
        item.geolocation
      );
    });
    setDataSet(rows);
    setOriginalDataSet(rows);
  }, [data]);

  const handleClick = (event: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSet.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(dataSet, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, dataSet]
  );

  const [textFieldValue, setTextFieldValue] = useState("");

  const handleSearch = (searchValue: string) => {
    // 2. The ability to search for individual meteorites by Name and/or ID.

    const filteredRows = originalDataSet.filter((row: Data) => {
      return (
        row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.id.toString().toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setDataSet(filteredRows);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          favorites={favorites}
          setFavorites={setFavorites}
          dataSet={dataSet}
          tabNumber={tabNumber}
        />
        <SearchBar
          value={textFieldValue}
          onChange={(newValue) => {
            setTextFieldValue(newValue);
            handleSearch(newValue);
          }}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dataSet.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.nametype}</TableCell>
                    <TableCell align="right">{row.recclass}</TableCell>
                    <TableCell align="right">{row.mass}</TableCell>
                    <TableCell align="right">{row.fall}</TableCell>
                    <TableCell align="right">{row.year?.slice(0, 4)}</TableCell>
                    <TableCell align="right">
                      {row.reclat?.slice(0, 5)}
                    </TableCell>
                    <TableCell align="right">
                      {row.reclong?.slice(0, 5)}
                    </TableCell>
                    <TableCell align="right">
                      {row.geolocation?.type
                        ? row.geolocation?.coordinates[0] +
                          "," +
                          row.geolocation?.coordinates[1]
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataSet.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Compact Table"
      />
    </Box>
  );
}
