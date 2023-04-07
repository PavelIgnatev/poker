import b_ from "b_";
import { useState } from "react";
import { ErrNot } from "../NotificationService";
import "./index.scss";

export const b = b_.with("stop-words-section");

const StopWordsSection = () => {
  const [newWord, setNewWord] = useState("");
  const [test, setTest] = useState([
    "SCOOP",
    "WORSE",
    "LAZY",
    "HELLO",
    "BAD",
    "SOO",
  ]);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWord(e.currentTarget.value);
  };

  const addHandler = () => {
    if (!newWord.length) ErrNot("Input is empty");
    else if (test.includes(newWord)) ErrNot("Word is already added");
    else setTest([...test, newWord]);
  };

  const deleteHandler = (wordIndex: number) => {
    console.log(`Удалён ${test[wordIndex]} под индексом ${wordIndex}`);

    const newWords = [...test];

    newWords.splice(wordIndex, 1);

    setTest(newWords);
  };

  return (
    <section className={b()}>
      <h2 className={b("title")}>Stop Words:</h2>
      <div className={b("input-wrapper")}>
        <input
          value={newWord}
          onChange={inputChange}
          placeholder="enter a new word here"
          className="BaseInputString"
        ></input>
        <button onClick={addHandler} className="base-button">
          add word
        </button>
      </div>
      <div className={b("words")}>
        {test.map((word, i) => {
          return (
            <span
              key={word}
              onClick={() => deleteHandler(i)}
              className={b("words__word")}
            >
              {word}
            </span>
          );
        })}
      </div>
    </section>
  );
};

export default StopWordsSection;
