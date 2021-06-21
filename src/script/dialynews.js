const requri = `https://www.dailynews.co.th/`;
const axios = require("axios").default
const cheerio = require("cheerio");
const { getHtml, scraping } = require(`./function`);
var _ = require("lodash");

async function start() {

    let newscontentsuri = []
    const html = await getHtml(requri)
    const articlesNode = await scraping(html, '#latest-news > .content-box.-latest > .content-wrapper > article')
    articlesNode.each((i, elem) => {
        const $ = cheerio.load(elem)
        newscontentsuri.push(
            $(elem).find('.media').attr('href')
        )
    });
    const detailhtmllist = await getdetail(newscontentsuri)
    return await Promise.all(
        detailhtmllist.map(async function (html) {
            return await scrapingdetail(html);
        })
    );

}

async function getdetail(urls) {
    const htmllist = await Promise.all(
        urls.map(async function (url) {
            return await getHtml(requri + url);
        })
    );
    return htmllist
}

async function scrapingdetail(html) {
    const $ = await cheerio.load(html.data);
    return {

        image: $("meta")
            .filter(function (i, el) {
                return $(this).attr("property") === "og:image";
            })
            .attr("content"),
        title: $('title').text(),
        detail: $('.article-detail').text().trim(),
        link: $("link")
            .filter(function (i, el) {
                return $(this).attr("rel") === "canonical";
            })
            .attr("href")
    }
}

exports.dailynews = start;
