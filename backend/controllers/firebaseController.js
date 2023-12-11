import { db } from "../../frontend/shared/firebase_config";

import { ref, set, get, push, onValue } from "firebase/database";

const createUser = async (userName, avatar) => {
  const userRef = ref(db, "user");
  const newRef = push(userRef);
  const userId = newRef.key;
  if (avatar === undefined) {
    avatar = "";
  }
  set(newRef, {
    userName,
    avatar,
  });
  const quizRef = ref(db, "quiz");
  const snapshot = await get(quizRef);
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const quizId = childSnapshot.key;
      const regRef = ref(db, `reg/${quizId}`);
      const newRegRef = push(regRef);
      const regId = newRegRef.key;
      set(newRegRef, {
        userId,
        points: 0,
        position: 0,
      });
    });
  } else {
    console.log("No quizzes to register");
  }
  return userId;
};

const createQuiz = async (quizName, image) => {
  const quizRef = ref(db, "quiz");
  const newRef = push(quizRef);
  const quizId = newRef.key;
  set(newRef, {
    quizName,
    image,
    status: "upcoming",
  });

  const userRef = ref(db, "user");
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const userId = childSnapshot.key;
      const regRef = ref(db, `reg/${quizId}`);
      const newRegRef = push(regRef);
      const regId = newRegRef.key;
      set(newRegRef, {
        userId,
        points: 0,
        position: 0,
      });
    });
  } else {
    console.log("No users to register");
  }
  // for each entry user in db/user
  //   create entry in db/reg/quizId (uid,points = 0, position)

  return quizId;
};
const deleteQuiz = async (quizId) => {
  const quizRef = ref(db, `quiz/${quizId}`);
  set(quizRef, null);
  const regRef = ref(db, `reg/${quizId}`);
  set(regRef, null);
  return quizId;
};
export { createUser, createQuiz, deleteQuiz };
