const db = require("../database/firebase");
const asyncHandler = require("express-async-handler");
const {
  ref,
  set,
  get,
  push,
  update,
  child,
  increment,
  orderByChild,
  limitToFirst,
} = require("firebase/database");

const registerUserRW = asyncHandler(async (req, res) => {
  const { userName, avatar, bg } = req.body;
  if (!userName) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  try {
    const userRef = ref(db, "user");
    const newRef = push(userRef);
    const userId = newRef.key;
    if (avatar === undefined) {
      avatar = "";
    }
    set(newRef, {
      userName,
      avatar,
      bg,
    });
    const quizRef = ref(db, "quiz");
    const snapshot = await get(quizRef);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const quizId = childSnapshot.key;
        const regRef = ref(db, `reg/${quizId}/${userId}`);
        set(regRef, {
          points: 0,
          position: 0,
        });
      });
    } else {
      console.log("No quizzes to register");
    }
    res.status(201).json({
      userId,
      userName,
      avatar,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const editUserRW = async (req, res) => {
  const { userId, userName, avatar } = req.body;
  try {
    const userRef = ref(db, `user/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      if (avatar === undefined) {
        avatar = snapshot.val().avatar;
      }
      if (userName === undefined) {
        userName = snapshot.val().userName;
      }
    }
    set(userRef, {
      userName,
      avatar,
    });
    return {
      userId,
      userName,
      avatar,
    };
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

const createQuizRW = asyncHandler(async (req, res) => {
  const { quizName, image } = req.body;
  try {
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
        const regRef = ref(db, `reg/${quizId}/${userId}`);
        set(regRef, {
          points: 0,
          position: 0,
        });
      });
    } else {
      console.log("No users to register");
    }
    res.status(201).json({
      quizId,
      quizName,
      image,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  registerUserRW,
  editUserRW,
  createQuizRW,
};
