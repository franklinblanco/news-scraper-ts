import { AxiosResponse } from "axios";
import { Article } from "./src/Article";
import { getNews } from "./src/communicator";
import { getArticlesCount, initializeDatabase } from "./src/dao";

const INTERVAL_SECONDS: number = 60; 
let currPage: number = 1;
initializeDatabase().then(async () => {
    try{
        const currentArticleCount: number = await getArticlesCount();
        console.log(`Resuming collection of articles. Current article amount: ${currentArticleCount}`);
        currPage = Math.round(( currentArticleCount / 1000 ) + 1);
        console.log(`Changing page number to: ${currPage}`);
    } catch(error){
        console.log(error);
    }
    setInterval(async () => {
        let resp: AxiosResponse = await getNews(currPage);

        try {
            console.log("Amount of articles to be stored: " + resp.data.d.Results.length);
        } catch (error) {
            console.log(error);
        }
        try{
        resp.data.d.Results.forEach(async doc => {
            const document = doc.Document;
            let article: Article = new Article();
            article.newsId = document.Id;
            article.title = document.Title;
            article.author = document.Author ? document.Author : "NONE";
            article.text = document.Text ? document.Text : "EMPTY";
            article.dateCreated = new Date(document.Creationdate);
            article.dateModified = new Date(document.Moddate);
            article.tags = document.Tags;
            await article.save();
        });
        } catch (error){
            console.log(error);
        }
        console.log("Done. Page " + currPage);
        currPage = currPage + 1;
    }, INTERVAL_SECONDS * 1000);
});