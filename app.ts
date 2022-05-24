import { AxiosResponse } from "axios";
import { Article } from "./src/Article";
import { getNews } from "./src/communicator";
import { initializeDatabase } from "./src/dao";

const INTERVAL_SECONDS: number = 60; 
initializeDatabase().then(async () => {


    let currPage: number = 1;
    setInterval(async () => {
        let resp: AxiosResponse = await getNews(currPage);
        console.log(resp.data.d.Results.length);
        resp.data.d.Results.forEach(async doc => {
            try{
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
                currPage = currPage + 1;
            } catch(error){
                console.log(error);
            }
        });
    }, INTERVAL_SECONDS * 1000);
});