import { AppDataSource } from "../data-source";
import { Article } from "./Article";

export async function initializeDatabase(){
    await AppDataSource.initialize();
}

export async function getArticlesCount(): Promise<number>{
    return await AppDataSource.manager.createQueryBuilder(Article, "articles").getCount();
}