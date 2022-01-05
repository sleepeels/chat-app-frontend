import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useState } from "react";

const InputComp = ({ essence }) => {
  const [name, setName] = useState("");

  const onMessageSubmit = (e) => {
    e.preventDefault();
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h1>{essence}</h1>
      <div id="chat-wrapper">
        <form id="chat-form" autoComplete="off" onSubmit={onMessageSubmit}>
          <TextField
            name="name"
            onChange={(e) => onNameChange(e)}
            value={name}
            label="Name"
          />
          <Button
            type="submit"
            variant="secondery"
            size="small"
            color="Primary"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InputComp;
