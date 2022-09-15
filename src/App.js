import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import ListItem from "./bricks/ListItem";
import styles from "./css/App.module.css";

function App() {
  const [recipesLoadCall, setRecipesLoadCall] = useState({ state: "pending" });
  const [ingredientsLoadCall, setIngredientsLoadCall] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/recipe/list", { method: "GET" }).then(
      async (response) => {
        const responseJSON = await response.json();
        if (response.status >= 400) {
          setRecipesLoadCall({ state: "error", error: responseJSON });
        } else {
          setRecipesLoadCall({ state: "success", data: responseJSON });
        }
      }
    );
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/ingredient/list", { method: "GET" }).then(
      async (response) => {
        const responseJson = await response.json();
        if (response.status <= 400) {
          setIngredientsLoadCall(responseJson);
        }
      }
    );
  }, []);

  function getChild() {
    switch (recipesLoadCall.state) {
      case "pending":
        return (
          <div>
            <Icon size={2} path={mdiLoading} spin={true} />
            <p>Načítá se</p>
          </div>
        );
      case "success":
        return (
          <div className={styles.app}>
            <h1>Najlepšie recepty</h1>
            <ListItem
              recipes={recipesLoadCall.data}
              ingredients={ingredientsLoadCall}
            />
          </div>
        );
      case "error":
        return (
          <div>
            <div>Chyba</div>
            <br />
            <pre>{JSON.stringify(recipesLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }

  return <div>{getChild()}</div>;
}

export default App;
