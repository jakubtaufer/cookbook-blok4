import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/Card.css";

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

function Ingredientview(props) {
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

export default Ingredientview;
