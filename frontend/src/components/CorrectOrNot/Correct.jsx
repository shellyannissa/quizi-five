import React from "react";
import "./Correct.css";

const Correct = ({ correct, points = 100 }) => {
  return (
    <div className="evaluate">
      {correct === true ? (
        // <iframe src="../../assets/lotties/correct.json" />
        <div className="correct-wrap">
          <iframe
            className="correct"
            src="https://lottie.host/embed/80bc9560-81b5-4d08-87d1-cca6984e737d/inSq0ZTtNa.json"
          ></iframe>
          <span>+{points}</span>
        </div>
      ) : (
        <div className="wrong-wrap">
          <iframe
            className="wrong"
            src="https://lottie.host/embed/a342f581-d943-469e-a311-9d7fc92f7ba9/zYdUhmNSt2.json"
          ></iframe>
          <span>+0</span>
        </div>
      )}
    </div>
  );
};

export default Correct;
