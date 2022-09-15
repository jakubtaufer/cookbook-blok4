import React, { useState, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import ItemChange from "./ItemChange";
import ItemTableList from "./ItemTableList";


function ListItem(props) {
  const [viewType, setViewType] = useState("list");
  const isToggled   = viewType === "list";
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
        <div className="container-fluid">
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              id={"searchInput"}
              style={{ maxWidth: "150px" }}
              type="search"
              placeholder="Vyhledat"
              aria-label="Vyhledat"
             
            />
            <Button
              style={{ marginRight: "5px" }}
              variant="outline-success"
              type="submit"
            >
              <Icon size={1} path={mdiMagnify} />
            </Button>
            <Button variant="outline-primary" onClick={toggler}>
              {isToggled ? "Tabulka" : "Recepty"}
            </Button>
          </Form>
        </div>
      {isToggled ? (
        <ItemChange
          recipes={filteredRecipes}
          ingredients={props.ingredients}
        />
      ) : (
        <ItemTableList recipes={filteredRecipes} />
      )}
    </div>
  );
}

export default ListItem;



