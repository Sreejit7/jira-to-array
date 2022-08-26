import { useState } from "react";
import "./App.css";
import { convert } from "./utils";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [type, setType] = useState("CSV");
  const [field, setField] = useState("title");

  const handleShowOutput = (typeOfInput, valueOfInput, fieldName) => {
    const output = convert(typeOfInput, valueOfInput, fieldName);
    setOutput(output);
  };

  const handleChange = (change, value) => {
    if (change === "input") {
      setInput(value);
      handleShowOutput(type, value, field);
    } else if (change === "type") {
      setType(value);
      handleShowOutput(value, input, field);
    } else if (change === "field") {
      setField(value);
      handleShowOutput(type, input, value);
    }
  };

  const handleResetField = (value) => {
    if (value === "") {
      setField("title");
      handleShowOutput(type, input, "title");
    }
  };

  const handleResetInput = (e) => {
    e.preventDefault();
    setInput("");
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="App">
      <label htmlFor="input" className="label">
        <div className="label-group">
          Enter the input here
          <span className="clear" onClick={(e) => handleResetInput(e)}>
            Clear
          </span>
        </div>
        <textarea
          id="input"
          className="input"
          value={input}
          onChange={(e) => handleChange("input", e.target.value)}
        ></textarea>
      </label>
      <section className="input-group">
        <label htmlFor="type" className="label">
          Select the type of input
          <select
            id="type"
            value={type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="input"
          >
            <option key="CSV" value="CSV" className="input">
              CSV
            </option>
            <option key="List" value="List" className="input">
              List
            </option>
          </select>
        </label>
        <label htmlFor="field" className="label">
          Enter the field name
          <input
            id="field"
            value={field}
            onChange={(e) => handleChange("field", e.target.value)}
            onBlur={(e) => handleResetField(e.target.value)}
            className="input"
          />
        </label>
      </section>
      <section>
        <h4>Output</h4>
        {/* <code> */}
        <pre className="output">
          {input && (
            <button className="copy-output" onClick={handleCopyOutput}>
              Copy
            </button>
          )}
          {input ? output : "Please provide an input!"}
        </pre>
        {/* </code> */}
      </section>
    </div>
  );
}

export default App;
