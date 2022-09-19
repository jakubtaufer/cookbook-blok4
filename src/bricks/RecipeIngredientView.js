import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/Card.css";
import RecipeModal from "./RecipeModal";
import UserContext from "../UserProvider";

function RecipeIngredientView(props) {
  const [recipeData, setRecipeData] = useState(props.recipe);
  const isAuthorized = useContext(UserContext);

  const callOnComplete = (recipe) => {
    setRecipeData(recipe);
  };

  function addNames(rIngredients, inList) {
    return rIngredients.map((el) => {
      return {
        id: el.id,
        amount: el.amount,
        unit: el.unit,
        name: inList.find((el2) => el2.id === el.id).name, // neriesi ak nebude ingrediencia dohladana v zozname
      };
    });
  }

  const namesIngredientList = addNames(
    props.recipe.ingredients,
    props.ingredients
  );

  return (
    <div style={{ float: "left" }}>
      <Card className={styles.card}>
        <Card.Img src={props.recipe.imgUri} />
        <Card.Title>{props.recipe.name}</Card.Title>

        <Card.Body>
          <Card.Text style={{ textAlign: "left" }} className="text-truncate">
            {props.recipe.description}
          </Card.Text>
          {isAuthorized ? (
            <RecipeModal
              ingredients={props.ingredients}
              onComplete={callOnComplete}
              recipes={recipeData}
            />
          ) : (
            <div></div>
          )}
          <div>
            <ul>
              {namesIngredientList.map((recipe) => {
                return <li>{recipe.name}</li>;
              })}
            </ul>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecipeIngredientView;
