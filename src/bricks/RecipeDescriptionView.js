import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/Card.css";

function RecipeDescriptionView(props) {
  return props.recipes.map((recipe) => {
    return (
      <Card className={styles.card}>
        <Card.Img src={recipe.imgUri} />
        <Card.Body>
          <div>
            <Card.Title>{recipe.name}</Card.Title>
          </div>
          <Card.Text style={{ textAlign: "left" }}>
            {recipe.description}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });
}

export default RecipeDescriptionView;
