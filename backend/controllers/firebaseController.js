import { db } from "../../frontend/shared/firebase_config";

import {
  ref,
  set,
  get,
  push,
  update,
  child,
  increment,
  orderByChild,
  limitToFirst,
} from "firebase/database";

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
      const regRef = ref(db, `reg/${quizId}/${userId}`);
      set(regRef, {
        points: 0,
        position: 0,
      });
    });
  } else {
    console.log("No quizzes to register");
  }
  return {
    userId,
    userName,
    avatar,
  };
};

const editUser = async (userId, userName, avatar) => {
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
      const regRef = ref(db, `reg/${quizId}/${userId}`);
      set(regRef, {
        points: 0,
        position: 0,
      });
    });
  } else {
    console.log("No users to register");
  }
  return quizId;
};

const editQuiz = async (quizId, quizName, image, status) => {
  const quizRef = ref(db, `quiz/${quizId}`);
  const snapshot = await get(quizRef);
  if (snapshot.exists()) {
    if (image === undefined) {
      image = snapshot.val().image;
    }
    if (quizName === undefined) {
      quizName = snapshot.val().quizName;
    }
    if (status === undefined) {
      status = snapshot.val().status;
    }
  }
  set(quizRef, {
    quizName,
    image,
    status,
  });
  return quizId;
};

const editStatus = async (quizId, status) => {
  const quizRef = ref(db, `quiz/${quizId}`);
  const updates = {
    status: status,
  };
  update(quizRef, updates);
  return quizId;
};

const deleteQuiz = async (quizId) => {
  const quizRef = ref(db, `quiz/${quizId}`);
  set(quizRef, null);
  const regRef = ref(db, `reg/${quizId}`);
  set(regRef, null);
  return quizId;
};

const addQuestion = async (question) => {
  const questionRef = ref(db, "ques");
  const newRef = push(questionRef);
  const questionId = newRef.key;
  set(newRef, question);
  return questionId;
};

const markCrctOpn = async (qnId, idx) => {
  const questionRef = ref(db, `ques/${qnId}`);
  const updates = {
    correctOpnIdx: idx,
  };
  update(questionRef, updates);
  return qnId;
};

const activateQuestion = async (qnId) => {
  const questionRef = ref(db, `ques/${qnId}`);

  //* setting the starting and ending Instant for mark tabulation purposes
  const questionSnapshot = await get(questionRef);
  const now = new Date();
  const allottedMin = questionSnapshot.val().allottedMin;
  const allottedSec = questionSnapshot.val().allottedSec;
  const endingInstant = addMinutesAndSeconds(
    now.toISOString(),
    allottedMin,
    allottedSec
  );
  const updates = {
    startedInstant: now,
    endingInstant: endingInstant,
  };
  update(questionRef, updates);

  //to invoke the display tab
  const seconds = (endingInstant - now) / 1000;
  const options = questionSnapshot.val().options;
  const postContent = {
    type: "ques",
    description: questionSnapshot.val().description,
    options,
    allottedMin,
    allottedSec,
    seconds,
    qnId,
  };
  const displayRef = ref(db, "display");
  set(displayRef, postContent);
  return qnId;
};

const addAnswer = async (qnId, idx, uId, answeredInstant) => {
  const ansRef = ref(db, `ans/${qnId}`);
  const ans = {
    userId: uId,
    optionIdx: idx,
    answeredInstant: answeredInstant,
  };
  const newRef = push(ansRef);
  set(newRef, ans);

  return qnId;
};

const questionStats = async (qnId) => {
  const ansRef = ref(db, `ans/${qnId}`);
  const snapshot = await get(ansRef);
  const questionRef = ref(db, `ques/${qnId}`);
  const questionSnapshot = (await get(questionRef)).val();
  const options = questionSnapshot.options;
  let temp = {};
  for (let i = 0; i < options.length; i++) {
    temp[i] = 0;
  }
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const optionIdx = childSnapshot.val().optionIdx;
      temp[optionIdx]++;
    });
  }
  for (let i = 0; i < options.length; i++) {
    const idx = options[i].idx;
    options[i].count = temp[idx];
  }
  questionSnapshot.options = options;
  const postContent = {
    type: "stat",
    description: questionSnapshot.description,
    options,
    allottedMin: questionSnapshot.allottedMin,
    allottedSec: questionSnapshot.allottedSec,
    qnId,
  };
  const displayRef = ref(db, "display");
  set(displayRef, postContent);
  return qnId;
};

const evaluate = async (qnId) => {
  const qnRef = ref(db, `ques/${qnId}`);
  const qnSnapshot = (await get(qnRef)).val();
  const ansRef = ref(db, `ans/${qnId}`);
  const ansSnapshot = await get(ansRef);
  const correctOpnIdx = qnSnapshot.correctOpnIdx;
  const weightage = qnSnapshot.weightage;
  const startingInstant = new Date(qnSnapshot.startedInstant);
  const endingInstant = new Date(qnSnapshot.endingInstant);
  const quizId = qnSnapshot.quizId;

  //* alloting points to the correct answer
  if (ansSnapshot.exists()) {
    ansSnapshot.forEach((childSnapshot) => {
      const optionIdx = childSnapshot.val().optionIdx;
      if (optionIdx === correctOpnIdx) {
        const userId = childSnapshot.val().userId;
        const regRef = ref(db, `reg/${quizId}/${userId}`);
        const answeredInstant = new Date(childSnapshot.val().answeredInstant);
        const ratio =
          (endingInstant - answeredInstant) / (endingInstant - startingInstant);
        const points = parseInt(weightage * ratio);
        const updates = {
          points: increment(points),
        };
        update(regRef, updates);
      }
    });
  }

  //* setting position of each user
  const regRef = ref(db, `reg/${quizId}`);
  try {
    const snapshot = await get(regRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const orderedEntries = Object.entries(data).sort(
        (a, b) => b[1].points - a[1].points
      );

      orderedEntries.forEach((entry, index) => {
        const [userId, userData] = entry;
        const newPosition = index + 1;

        set(ref(db, `reg/${quizId}/${userId}/position`), newPosition);
      });
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching or updating data:", error);
  }

  return quizId;
};

const extendPoints = async (quizId) => {
  const prevLeadRef = ref(db, "prevLead");
  const snapshot = await get(prevLeadRef);
  let entries = snapshot.val();
  entries = entries.map(async (entry) => {
    const userId = entry.userId;
    const regRef = ref(db, `reg/${quizId}/${userId}`);
    const snapshot = await get(regRef);
    const newPoints = snapshot.val().points;
    const userRef = ref(db, `user/${userId}`);
    const snapshot2 = await get(userRef);
    const userName = snapshot2.val().userName;
    return {
      userId,
      points: newPoints,
      userName,
    };
  });
  entries = await Promise.all(entries);
  const postContent = {
    type: "extend",
    data: entries,
  };
  const displayRef = ref(db, "display");
  set(displayRef, postContent);
  return quizId;
};

const getLeaderBoard = async (quizId) => {
  const regRef = ref(db, `reg/${quizId}`);
  const snapshot = await get(regRef);
  const data = snapshot.val();
  let orderedEntries = Object.entries(data).sort(
    (a, b) => b[1].points - a[1].points
  );
  orderedEntries = orderedEntries.slice(0, 10);
  orderedEntries = orderedEntries.map(async (entry) => {
    const [userId, userData] = entry;
    const userRef = ref(db, `user/${userId}`);
    const snapshot = await get(userRef);
    const userInfo = snapshot.val();
    return {
      userId,
      userName: userInfo.userName,
      avatar: userInfo.avatar,
      points: userData.points,
      position: userData.position,
    };
  });
  orderedEntries = await Promise.all(orderedEntries);
  const postContent = {
    type: "lead",
    data: orderedEntries,
  };
  const displayRef = ref(db, "display");
  set(displayRef, postContent);
  const prevLeadRef = ref(db, "prevLead");
  set(prevLeadRef, orderedEntries);
  return quizId;
};

function addMinutesAndSeconds(timeString, minutesToAdd, secondsToAdd) {
  const dateTime = new Date(timeString);
  dateTime.setMinutes(dateTime.getMinutes() + minutesToAdd);
  dateTime.setSeconds(dateTime.getSeconds() + secondsToAdd);
  return dateTime;
}

export {
  createUser,
  createQuiz,
  deleteQuiz,
  editQuiz,
  editStatus,
  editUser,
  addQuestion,
  markCrctOpn,
  activateQuestion,
  addAnswer,
  questionStats,
  evaluate,
  getLeaderBoard,
  extendPoints,
};
