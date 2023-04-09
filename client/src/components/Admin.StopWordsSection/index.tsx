import b_ from "b_";
import { useStore } from "effector-react";
import { useState } from "react";
import { $stopWords, getStopWords, postStopWords } from "../../store/StopWords";
import { ErrNot } from "../NotificationService";
import "./index.scss";

export const b = b_.with("stop-words-section");

const StopWordsSection = () => {
  const [newWord, setNewWord] = useState("");
  const stopWords = useStore($stopWords)

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWord(e.currentTarget.value);
  };

  const addHandler = () => {
    if (!newWord.length) ErrNot("Input is empty");
    else if (stopWords.includes(newWord)) ErrNot("Word is already added");
    else {
      setNewWord('')
      postStopWords([...stopWords, newWord]);
    }
  };

  const deleteHandler = (wordIndex: number) => {
    const newWords = [...stopWords];

    newWords.splice(wordIndex, 1);

    postStopWords(newWords);
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
      {
        stopWords.length? 
        <div className={b("words")}>
        {stopWords.map((word, i) => {
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
      :
      <h2 className={b("title")}>
        You can add new stop-words here!
      </h2>
      }
    </section>
  );
};

export default StopWordsSection;
