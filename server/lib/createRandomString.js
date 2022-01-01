let { customAlphabet } = require("nanoid");
let models = require("../model");

let createRandomString = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let number = 3;
      let randomString = customAlphabet(
        "123456789abcdefghijklmnopqrstuvwxyz",
        number
      );
      let shortenedUrlStringExist = null;
      do {
        shortenedUrlStringExist = await models.Url.findOne({
          shortenedUrl: randomString,
        });
        if (shortenedUrlStringExist) {
          number = number + 1;
          randomString = customAlphabet(
            "123456789abcdefghijklmnopqrstuvwxyz",
            number
          );
        }
        console.log(shortenedUrlStringExist);
      } while (shortenedUrlStringExist);
      resolve(randomString());
    } catch (err) {
      reject("");
    }
  });
};

module.exports = {
  createRandomString,
};
