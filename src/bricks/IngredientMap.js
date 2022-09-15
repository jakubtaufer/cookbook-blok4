import React from "react";
import Ingredientview from "./Ingredientview";

function IngredientMap(props) {
  const ingredients = props.ingredients;
  console.log(ingredients);

  return props.recipes.map((recipe) => {
    return (
      <Ingredientview
        key={recipe.id}
        recipe={recipe}
        ingredient={ingredients}
      />
    );
  });
}

export default IngredientMap;
