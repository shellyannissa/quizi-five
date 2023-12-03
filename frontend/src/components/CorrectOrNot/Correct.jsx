import React from "react";
import "./Correct.css";

const Correct = ({ correct }) => {
  return (
    <div className="evaluate">
      {correct === true ? (
        // <iframe src="../../assets/lotties/correct.json" />
        <iframe
          className="correct"
          src="https://lottie.host/embed/80bc9560-81b5-4d08-87d1-cca6984e737d/inSq0ZTtNa.json"
        ></iframe>
      ) : (
        <iframe
          className="wrong"
          src="https://lottie.host/embed/a342f581-d943-469e-a311-9d7fc92f7ba9/zYdUhmNSt2.json"
        ></iframe>
      )}
    </div>
  );
};

export default Correct;
