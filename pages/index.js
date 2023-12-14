import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [inputs, setInputs] = useState([]);
  let counter = 1;

  const handleAddTable = (e) => {
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = `NewTable${counter}`;
    document.querySelector('form').appendChild(newInput);
    counter++;
  }
  return (
    <form>
      <label>TableName:</label>
      {inputs.map(input => input)}
      <input type="submit" value="Submit" />
      <button type="button" name="AddTable" onClick={handleAddTable}>AddTable</button>
    </form>
  );
}
