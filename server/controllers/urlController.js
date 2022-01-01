let { createRandomString } = require("../lib/createRandomString");
let models = require("../model");
const { getMetadata } = require("page-metadata-parser");
const domino = require("domino");
const fetch = require("node-fetch");

let shortenUrl = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let urlExists = await models.Url.findOne({
        url: req.body.url,
      });
      if (urlExists) {
        resolve({
          status: 200,
          data: urlExists,
        });
      } else {
        let urlBody = req.body.url;

        if (!/^(?:f|ht)tps?\:\/\//.test(urlBody)) {
          urlBody = "http://" + urlBody;
        }
        const response = await fetch(urlBody);
        const html = await response.text();
        const doc = domino.createWindow(html).document;
        const metadata = getMetadata(doc, urlBody);

        let url = new models.Url();
        url.url = urlBody;
        url.metaData = metadata;
        url.shortenedUrl = await createRandomString();
        url = await url.save();
        resolve({
          status: 200,
          data: url,
        });
      }
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

let shortenUrlWhatsapp = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let mobileAndMessageExists = await models.Url.findOne({
        mobileNumber: req.body.mobileNumber,
        message: req.body.message,
      });
      if (mobileAndMessageExists) {
        resolve({
          status: 200,
          data: mobileAndMessageExists,
        });
      } else {
        let mobileNumberBody = req.body.mobileNumber;
        let messageBody = req.body.message;

        let whatsappUrl = `https://api.whatsapp.com/send?phone=${mobileNumberBody}&text=${messageBody}`;

        let url = new models.Url();
        url.type = "whatsapp";
        url.mobileNumber = mobileNumberBody;
        url.message = messageBody;
        url.url = whatsappUrl;
        url.shortenedUrl = await createRandomString();
        url = await url.save();
        resolve({
          status: 200,
          data: url,
        });
      }
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

let getUrl = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(req.params);
      let url = await models.Url.findOne({
        shortenedUrl: req.params.shortenedUrl,
      });
      if (url) {
        resolve({
          status: 200,
          data: url,
        });
      } else {
        resolve({
          status: 200,
          message: "URL does not exist",
        });
      }
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

module.exports = {
  shortenUrl,
  shortenUrlWhatsapp,
  getUrl,
};
