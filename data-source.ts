import { DataSource } from "typeorm";
import { Article } from "./src/Article";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "news_scraper_db",
    entities: [Article],
    synchronize: true
})