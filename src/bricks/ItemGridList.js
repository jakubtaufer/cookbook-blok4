import React from "react";
import Item from "./Item";

function ItemGridList(props) {
  return props.recipes.map((recipe) => {
    return <Item key={recipe.id} recipe={recipe} />;
  });
}

export default ItemGridList;







