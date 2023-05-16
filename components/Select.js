import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Stack from '@mui/joy/Stack';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const content = ["Images", "Videos","All"];

export default function MultipleSelectCheckmarks() {
  const [personName, setPersonName] = React.useState(["All"]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <div className="w-80">
        <Stack direction="row" spacing={{sm: 1, md:2}} alignItems={"center"}>
        <h1 className="font-sans  text-xl font-medium">Select content</h1>
        <div className=" ">
          <FormControl sx={{ m: 1, width: 120 }}>
            <InputLabel id="demo-multiple-checkbox-label">Content</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {content.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
        </div>
        <button type="button" className="bg-blue-800 text-white px-4 py-2 rounded-xl">
            Fetch
          </button>
        </Stack>
      </div>
    </>
  );
}
