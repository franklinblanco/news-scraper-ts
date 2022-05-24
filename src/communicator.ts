import axios, { AxiosResponse } from "axios";

const url: string = "https://www.diariolibre.com/";

export async function getNews(page: number): Promise<AxiosResponse> {
    let resp: AxiosResponse;
    try{
        resp = await axios.request({
            method: "POST",
            url: (url + "funcionalidades/search/index.aspx/search?t=1"),
            headers: {"Content-type" : "application/json"},
            data: {
                excludeIds: "",
                q: "",
                page: page,
                top: "1000",
                orderby: "creationdate asc",
                anio: "",
                tags: "",
                Autor: "",
                seccion: "",
                subseccion: "",
                columnista: ""
            },
            params: { t: 1 }
        })
    } catch (error) {
        console.log(error);
    }
    return resp;
}