import React, {type FormEvent, useState} from "react";
import styles from "./styles.module.css";
import {spawnSchema} from "./schemas"; // TODO: add syntax highlighting

// TODO: add syntax highlighting
const ControlValidator: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [validating, setValidating] = useState<boolean>(false);

  const handleValidation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("validating...");

    setValidating(true);
    setError(null);
    setSuccess(null)

    try {
      const json = JSON.parse(text);
      console.log(json);
      setText(JSON.stringify(json, null, 2));

      // TODO: figure out how to check which schema is being used
      //  maybe a union of each schema?
      const result = spawnSchema.safeParse(json);
      if (result.success) {
        console.log("valid!");
        // @ts-ignore
        console.log(result.data);

        setSuccess("Valid!");
      } else {
        console.log("invalid!");
        // @ts-ignore
        console.log(result.error);
        // @ts-ignore
        setError(result.error.message);
      }
    } catch (e) {
      setError(e.message);
    }

    setValidating(false);
  };

  return (
    <form onSubmit={handleValidation} className={styles.form}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter control schema"
        required
        style={{ fontFamily: "monospace", width: "100%", height: "400px" }}
      />
      <br />
      <button
        type="submit"
        className="button button--primary button--lg"
        disabled={validating}
      >
        {validating ? "Validating..." : "Validate"}
      </button>
      {error && (
        <>
          <br />
          <p>{error}</p>
        </>
      )}
      {success && (
          <>
            <br />
            <p>{success}</p>
          </>
      )}
    </form>
  );
};

export default ControlValidator;
