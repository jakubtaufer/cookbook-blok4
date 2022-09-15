import Icon from "@mdi/react";
import { mdiClipboardListOutline } from "@mdi/js";
import { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

function RecipeModal() {
  const [isModalShown, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imgUri: "",
    amount: "",
    unit: "",
    ingredients: [
      {
        name: "",
        amount: "",
        unit: "",
      },
    ],
  });

  // const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
  //   state: "pending",
  // });

  // useEffect(() => {
  //   fetch("http://localhost:8000/ingredient/list", { method: "GET" }).then(
  //     async (response) => {
  //       const responseJson = await response.json();
  //       if (response.status >= 400) {
  //         setIngredientsLoadCall({ state: "error", error: responseJson });
  //       } else {
  //         setIngredientsLoadCall({ state: "success", data: responseJson });
  //       }
  //     }
  //   );
  // }, []);

  // function IngredientsOption() {
  //   return ingredientList.map((ingredient) => {
  //     return <option value={ingredient.id}>{ingredient.name} </option>;
  //   });
  // }

  // const ingredientList = ingredientsLoadCall.data;

  // const handleClose = () => setAddGradeShow(false);

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const payload = {
      ...formData,
      // studentId: student.id,
      // subjectId: subject.id,
    };

    console.log(payload);
  };

  return (
    <>
      <Modal show={isModalShown} onHide={handleCloseModal}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Přidat známku</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nazov</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setField("name", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Postup</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setField("description", e.target.value)}
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ingrediencie</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setField("ingredients", e.target.value)}
                >
                  <option value="Cibula">Cibula</option>
                  <option value="Cesnak">Cesnak</option>
                  <option value="Paprika">Paprika</option>
                  {/* {IngredientsOption()} */}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Počet</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1-5"
                  value={formData.grade}
                  onChange={(e) => setField("amount", parseInt(e.target.value))}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Jednotka</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setField("unit", e.target.value)}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Zavřít
              </Button>
              <Button variant="primary" type="submit">
                Vytvořit
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>

      <Icon
        path={mdiClipboardListOutline}
        style={{ color: "grey", cursor: "pointer" }}
        size={1}
        onClick={handleShowModal}
      />
    </>
  );
}

export default RecipeModal;
