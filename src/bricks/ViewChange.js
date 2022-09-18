import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import RecipeDescriptionView from "./RecipeDescriptionView";
import IngredientMap from "./IngredientMap";

function ViewChange(props) {
  const [viewType, setViewType] = useState("");
  const isChange = viewType === "++";

  function changeView() {
    if (isChange) {
      setViewType("");
    } else {
      setViewType("++");
    }
  }

  return (
    <div>
      <div className="container-fluid">
        <Button variant="outline-primary" onClick={changeView}>
          {isChange ? "Zobrazit ingredience" : "Zobrazit postup"}
        </Button>
      </div>

      {isChange ? (
        <RecipeDescriptionView recipes={props.recipes} />
      ) : (
        <IngredientMap
          recipes={props.recipes}
          ingredients={props.ingredients}
        />
      )}
    </div>
  );
}

export default ViewChange;
