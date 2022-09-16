import React, { useState, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import ItemChange from "./ItemChange";
import ItemTableList from "./ItemTableList";
import RecipeModal from "./RecipeModal";

function ListItem(props) {
  const [viewType, setViewType] = useState("list");
  const isToggled = viewType === "list";
  const [searchBy, setSearchBy] = useState("");

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
    return props.recipes.filter((input) => {
      return (
        input.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        input.description.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
  }, [searchBy, props.recipes]);

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
              <RecipeModal ingredients={props.ingredients} />
            </Form>
          </Navbar.Collapse>
        </div>
      </Navbar>
      {isToggled ? (
        <ItemChange recipes={filteredRecipes} ingredients={props.ingredients} />
      ) : (
        <ItemTableList recipes={filteredRecipes} />
      )}
    </div>
  );
}

export default ListItem;
