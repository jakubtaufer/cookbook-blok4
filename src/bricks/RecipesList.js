import React, { useState, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import ViewChange from "./ViewChange";
import RecipesTable from "./RecipesTable";
import RecipeModal from "./RecipeModal";

function RecipesList(props) {
  const [viewType, setViewType] = useState("list");
  const isToggled = viewType === "list";
  const [searchBy, setSearchBy] = useState("");
  const [recipesList, setRecipesList] = useState(props.recipes);

  function toggler() {
    if (isToggled) {
      setViewType("table");
    } else {
      setViewType("list");
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  const filteredRecipes = useMemo(() => {
    return recipesList.filter((input) => {
      return (
        input.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        input.description.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
  }, [searchBy, recipesList]);

  const callOnComplete = (data) => {
    const newRecipesList = [...props.recipes, data];
    setRecipesList(newRecipesList);
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="light">
        <div className="container-fluid">
          <Navbar.Brand>Seznam receptů</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse style={{ justifyContent: "right" }}>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Hledat"
                aria-label="Hledat"
              />
              <Button
                style={{ marginRight: "5px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
              <Button
                className={"d-none d-md-block"}
                variant="outline-primary"
                onClick={toggler}
              >
                {isToggled ? "Tabulka" : "Recepty"}
              </Button>
            </Form>
          </Navbar.Collapse>
          <RecipeModal
            ingredients={props.ingredients}
            onComplete={callOnComplete}
          />
        </div>
      </Navbar>
      {isToggled ? (
        <ViewChange recipes={filteredRecipes} ingredients={props.ingredients} />
      ) : (
        <RecipesTable recipes={filteredRecipes} />
      )}
    </div>
  );
}

export default RecipesList;
