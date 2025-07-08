import TextField from "@mui/material/TextField";
function SearchInputComponent({ value, onChange }) {
  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchInputComponent;
