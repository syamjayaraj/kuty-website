let { createRandomString } = require("../lib/createRandomString");
let models = require("../model");
const { getMetadata } = require("page-metadata-parser");
const domino = require("domino");
const fetch = require("node-fetch");
const geoip = require("fast-geoip");

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

        // Create stats
        let stat = new models.Stat();
        stat.url = url._id;
        stat.shortenedUrl = url.shortenedUrl;
        stat = await stat.save();

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

        // Create stats
        let stat = new models.Stat();
        stat.url = url._id;
        stat.shortenedUrl = url.shortenedUrl;
        stat = await stat.save();

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
      let url = await models.Url.findOne({
        shortenedUrl: req.body.shortenedUrl,
      });
      if (url) {
        let ip = req?.body?.ip;
        if (ip) {
          let geo = await geoip.lookup(ip);
          if (geo) {
            let click = new models.Click();
            click.country = geo.country;
            click.region = geo.region;
            click.timezone = geo.timezone;
            click.city = geo.city;
            click.location = {
              type: "Point",
              coordinates: [geo?.ll[1], geo?.ll[0]],
            };
            click = await click.save();

            let stat = await models.Stat.findOne({
              url: url._id,
            });
            if (stat) {
              stat.totalClicks = stat.totalClicks + 1;
              stat.clicks.push(click._id);
              stat.markModified("clicks");
              stat = await stat.save();
            } else {
              let stat = new models.Stat();
              stat.url = url._id;
              stat.shortenedUrl = url.shortenedUrl;
              stat.totalClicks = stat.totalClicks + 1;
              stat.clicks.push(click._id);
              stat.markModified("clicks");
              stat = await stat.save();
            }
          } else {
            let stat = await models.Stat.findOne({
              url: url._id,
            });
            if (stat) {
              stat.totalClicks = stat.totalClicks + 1;
              stat = await stat.save();
            } else {
              let stat = new models.Stat();
              stat.url = url._id;
              stat.shortenedUrl = url.shortenedUrl;
              stat.totalClicks = stat.totalClicks + 1;
              stat = await stat.save();
            }
          }
        }

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
      console.log(err, "error");
      reject({ status: 200, message: err.message });
    }
  });
};

let getStats = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let stat = await models.Stat.findOne({
        shortenedUrl: req.body.shortenedUrl,
      })
        .populate("url")
        .populate("clicks");
      if (stat) {
        resolve({
          status: 200,
          data: stat,
        });
      } else {
        resolve({
          status: 200,
          message: "Stat does not exist",
        });
      }
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

let getShortUrls = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let urls = await models.Url.find({
        isListed: true,
      }).select("shortenedUrl");
      if (urls) {
        resolve({
          status: 200,
          data: urls,
        });
      } else {
        resolve({
          status: 200,
          message: "Stat does not exist",
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
  getStats,
  getShortUrls,
};
