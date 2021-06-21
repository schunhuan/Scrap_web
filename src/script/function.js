const axios = require("axios").default
const cheerio = require("cheerio");

async function getHtml(uri) {
    const html = await axios.get(uri)
    return html
}


async function scraping(html, element) {

    const $ = await cheerio.load(html.data);
    return $(element)

}

exports.getHtml = getHtml;
exports.scraping = scraping;
