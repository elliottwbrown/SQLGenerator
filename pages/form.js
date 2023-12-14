import React from 'react';
import Head from "next/head";
import styles from "./index.module.css";

class SQLForm extends React.Component {

  render() {
    async function onSubmit(event) {
      event.preventDefault();
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ TableDef1: tableDef1Input, TableDef2: tableDef2Input, TableDef3: tableDef3Input, Query: queryInput }),
      });
      const data = await response.json();
      setResult(data.result);
    }
    return (
      <div>
        <Head>
          <title>OpenAI Quickstart</title>
        </Head>

        <main className={styles.main}>
          <h3>SQL Generator</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="tableDef1"
              placeholder="Enter an Table"
              value={tableDef1Input}
              onChange={(e) => setTableDef1Input(e.target.value)}
            />
            <input
              type="text"
              name="tableDef2"
              placeholder="Enter an Table"
              value={tableDef2Input}
              onChange={(e) => setTableDef2Input(e.target.value)}
            />
            <input
              type="text"
              name="tableDef3"
              placeholder="Enter an Table"
              value={tableDef3Input}
              onChange={(e) => setTableDef3Input(e.target.value)}
            />
            <input
              type="text"
              name="query"
              placeholder="Enter a query"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
            />
            <input type="submit" value="Generate SQL" />
          </form>
          <div className={styles.result}>
            <code>SELECT{result}</code>
          </div>
        </main>
      </div>
    );
  }
}

export default SQLForm;