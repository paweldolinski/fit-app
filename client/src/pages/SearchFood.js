import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import Result from "./Result";
import { List } from "@mui/material";

const SearchFood = () => {
  const [query, setQuery] = useState();
  const [results, setResults] = useState([]);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "GET",
      url: `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "x-app-id": "18a11cf7",
        "x-app-key": "662c2b46150039648cf753e50942bea4",
      },
    }).then((re) => {
      console.log(re);
      setResults(re.data.branded);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          margin="normal"
          onChange={handleChange}
          required
          fullWidth
          name="Search..."
          label="search"
          type="search"
          id="search"
          autoComplete=""
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <List>
          {results &&
            results.map((item) => (
              <Result
                name={item.food_name}
                calories={item.nf_calories}
                id={item.nix_item_id}
              />
            ))}
        </List>
      </Box>
    </Container>
  );
};

export default SearchFood;
