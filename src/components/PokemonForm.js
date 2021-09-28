import React from "react";
import { Form } from "semantic-ui-react";

function PokemonForm({handleForm}) {
  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form
        onSubmit={(event) => {
          event.preventDefault()
          const newData={
            name: event.target.name.value,
            hp: event.target.hp.value,
            sprites: {
              front: event.target.frontUrl.value,
              back: event.target.backUrl.value
            }
          }

          fetch("http://localhost:3001/pokemon",{
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
          })
          .then(r=>r.json())
          .then(data=>handleForm(data))

          event.target.name.value = ""
          event.target.hp.value= ""
          event.target.frontUrl.value= ""
          event.target.backUrl.value= ""
        }}
      >
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" name="name" />
          <Form.Input fluid label="hp" placeholder="hp" name="hp" />
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
