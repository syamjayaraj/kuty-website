import { apiUrl } from "../config";

let getQuiz = async (slug, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = `${apiUrl}/quiz/${slug}`;
      let requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

let startQuiz = async (name, phoneNumber, quiz, entryToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = `${apiUrl}/entry`;
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phoneNumber: phoneNumber,
          quizId: quiz._id,
        }),
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

let submitAnswer = async (entryId, quiz, question, answer, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = `${apiUrl}/entry/${entryId}`;
      let requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          quizId: quiz._id,
          questionId: question._id,
          answer: answer,
        }),
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

let createQuiz = async (title, instructions, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = `${apiUrl}/quiz`;
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          title: title,
          instructions: instructions,
        }),
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

let addQuestion = async (quizId, question, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = `${apiUrl}/question`;
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          quizId: quizId,
          title: question.title,
          options: question.options,
          correctOption: question.correctOption,
        }),
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

let deleteQuestion = async (quizId, questionId, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = `${apiUrl}/question/${quizId}/${questionId}`;
      let requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

let publishQuiz = async (quizId, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = `${apiUrl}/quiz/publish`;
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          quizId: quizId,
        }),
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

let getQuizPublic = async (slug, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = `${apiUrl}/quiz/${slug}/public`;
      let requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

export {
  getQuiz,
  startQuiz,
  submitAnswer,
  createQuiz,
  addQuestion,
  deleteQuestion,
  publishQuiz,
  getQuizPublic,
};
