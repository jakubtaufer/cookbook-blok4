import React from "react";
import RecipeIngredientView from "./RecipeIngredientView";

function IngredientMap(props) {
  const ingredients = props.ingredients;

  return props.recipes.map((recipe) => {
    return (
      <RecipeIngredientView
        key={recipe.id}
        recipe={recipe}
        ingredients={ingredients}
      />
    );
  });
}

export default IngredientMap;
