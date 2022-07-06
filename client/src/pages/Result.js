import ListItem from "@mui/material/ListItem";
import axios from "axios";

const Result = ({ name, id }) => {
  const handleClick = () => {
    axios({
      method: "GET",
      url: `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${id}`,
      headers: {
        "x-app-id": "18a11cf7",
        "x-app-key": "662c2b46150039648cf753e50942bea4",
      },
    }).then((re) => {
      console.log(re, "item");
    });
  };

  return (
    <ListItem onClick={handleClick} button={true}>
      {name}
    </ListItem>
  );
};

export default Result;
