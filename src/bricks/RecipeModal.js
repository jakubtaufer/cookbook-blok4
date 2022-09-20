import React, { useState, useEffect } from "react";
import { Modal, Form, ModalFooter } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiLoading, mdiPencilOutline } from "@mdi/js";

function RecipeModal(props) {
  const recipe = props.recipes;
  const onComplete = props.onComplete;
  const ingredients = props.ingredients;
  const [validated, setValidated] = useState(false);
  const [recipeAddCall, setRecipeAddCall] = useState({ state: "inactive" });
  const [isShown, setIsShown] = useState({ state: false });
  const [formData, setFormData] = useState({
    name: "ahoj",
    description: "",
    ingredients: [],
  });

  const defaultForm = {
    name: "",
    description: "",
    ingredients: [],
  };

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
      });
    } else setFormData(defaultForm);
  }, [recipe, isShown]);

  const emptyIngredient = () => {
    return { amount: 0, unit: "", id: "" };
  };

  const addEmptyIngredient = () => {
    const newFormData = {
      ...formData,
      ingredients: [...formData.ingredients, emptyIngredient()],
    };
    setFormData(newFormData);
  };

  const sortedIngredientsList = ingredients.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  const setIngredientField = (inputName, val, index) => {
    return setFormData((formData) => {
      const newData = { ...formData };

      newData.ingredients[index][inputName] = val;
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    // e.preventDefault();
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    const newData = { ...formData };
    newData.ingredients.forEach((ing) => {
      ing.amount = parseFloat(ing.amount);
    });

    const payload = { ...newData, id: recipe ? recipe.id : null };

    setRecipeAddCall({ state: "pending" });
    const res = await fetch(`recipe/${recipe ? "update" : "create"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.status >= 400) {
      setRecipeAddCall({ state: "error", error: data });
    } else {
      console.log(data);
      setRecipeAddCall({ state: "success", data });
    }

    if (typeof onComplete === "function") {
      onComplete(data);
    }

    handleCloseModal();

    console.log(formData);
  };

  function removeIngredient(index) {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);

    const newFormData = {
      ...formData,
      ingredients: newIngredients,
    };
    setFormData(newFormData);
  }

  const handleShowModal = (data) => setIsShown({ state: true, data });
  const handleCloseModal = () => {
    setIsShown({ state: false });
    setRecipeAddCall({ state: "inactive" });
    setValidated(false);
  };

  const ingredientInputGroup = (ingredient, index) => {
    return (
      <div key={index} className={"d-flex justify-content-center gap-1"}>
        <Form.Group className="mb-2 w-75" controlId="ingredients">
          <Form.Select
            value={ingredient.id}
            onChange={(e) => setIngredientField("id", e.target.value, index)}
          >
            <option></option>
            {sortedIngredientsList.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-1" controlId="amount">
          <Form.Control
            type="number"
            value={ingredient.amount}
            onChange={(e) =>
              setIngredientField("amount", parseInt(e.target.value), index)
            }
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="unit">
          <Form.Control
            placeholder="jednotka"
            value={ingredient.unit}
            onChange={(e) => setIngredientField("unit", e.target.value, index)}
          />
        </Form.Group>
        <div className={"mb-2"}>
          <Button
            variant={"outline-danger"}
            onClick={() => removeIngredient(index)}
          >
            X
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal show={isShown.state} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{recipe ? "Změna receptu" : "Nový recept"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            id={"form"}
            onSubmit={(e) => handleSubmit(e)}
          >
            <Form.Group className="mb-3" controlId="recipeName">
              <Form.Label>Název</Form.Label>
              <Form.Control
                value={formData.name}
                maxLength={60}
                required
                onChange={(e) => setField("name", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte název (maximální délka 60 znaků)
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Postup</Form.Label>
              <Form.Control
                value={formData.description}
                required
                as="textarea"
                onChange={(e) => setField("description", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte popis
              </Form.Control.Feedback>
            </Form.Group>
            <div className={"d-flex flex-column"}>
              <Form.Label>Ingredience</Form.Label>
              {formData.ingredients.map((ing, index) => {
                return ingredientInputGroup(ing, index);
              })}
            </div>

            <Button onClick={addEmptyIngredient}>Přidej ingredienci</Button>

            <Modal.Footer>
              <div className="d-flex flex-row gap-2">
                <div>
                  {recipeAddCall.state === "error" && (
                    <div className="text-danger">
                      Error: {recipeAddCall.error.errorMessage}
                    </div>
                  )}
                </div>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Zavřít
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={recipeAddCall.state === "pending"}
                >
                  {recipeAddCall.state === "pending" ? (
                    <Icon size={0.8} path={mdiLoading} spin={true} />
                  ) : recipe ? (
                    "Změnit"
                  ) : (
                    "Přidat"
                  )}
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {recipe ? (
        <div className={"d-flex w-100 justify-content-center"}>
          <Button onClick={handleShowModal} variant={"light"} size={"sm"}>
            Upravit
            <Icon size={1} path={mdiPencilOutline} />
          </Button>
        </div>
      ) : (
        <Button
          className={"d-none d-md-block"}
          variant="outline-primary"
          onClick={handleShowModal}
        >
          Přidej recept
        </Button>
      )}
    </>
  );
}

export default RecipeModal;
