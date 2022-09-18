import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import RecipesList from "../bricks/RecipesList";
import styles from "../css/App.module.css";

function RecipeList() {
  const [recipesLoadCall, setRecipesLoadCall] = useState({ state: "pending" });
  const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch("recipe/list", { method: "GET" }).then(async (response) => {
      const responseJSON = await response.json();
      if (response.status >= 400) {
        setRecipesLoadCall({ state: "error", error: responseJSON });
      } else {
        setRecipesLoadCall({ state: "success", data: responseJSON });
      }
    });
  }, []);

  useEffect(() => {
    fetch("ingredient/list", { method: "GET" }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setIngredientsLoadCall({ state: "error", error: responseJson });
      } else {
        setIngredientsLoadCall({ state: "success", data: responseJson });
      }
    });
  }, []);

  function getChild() {
    const isPending =
      recipesLoadCall.state === "pending" ||
      ingredientsLoadCall.state === "pending";
    const isLoaded =
      recipesLoadCall.state === "success" &&
      ingredientsLoadCall.state === "success";
    const isError =
      recipesLoadCall.state === "error" ||
      ingredientsLoadCall.state === "error";

    if (isPending) {
      return (
        <div>
          <Icon size={2} path={mdiLoading} spin={true} />
          <p>Načítá se</p>
        </div>
      );
    } else if (isLoaded) {
      return (
        <div className={styles.app}>
          <h1>Nejlepší recepty</h1>
          <RecipesList
            recipes={recipesLoadCall.data}
            ingredients={ingredientsLoadCall.data}
          />
        </div>
      );
    } else if (isError) {
      return (
        <div>
          <div>Chyba</div>
          <br />
          <pre>{JSON.stringify(recipesLoadCall.error, null, 2)}</pre>
        </div>
      );
    }
    return null;
  }

  return <div>{getChild()}</div>;
}

export default RecipeList;
