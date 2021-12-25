import { Request, Response} from 'express';
const axios = require("axios");
const cheerio = require("cheerio");

class BusPointController {
    async show(req: Request, res: Response){
        let { stop } = req.query;

        const url = `https://www.stcp.pt/pt/viajar/horarios/?paragem=${stop}&t=smsbus`;
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        const element = new String($("body > div.divGeralContent > div.divContentCenter > div.divContentBorder > div.divmiddleContent > div.content-padding > table > tbody > tr > td > script"));
        const arrParams = element.slice(element.indexOf("(")+1, element.indexOf(")")).split(",");
        const hashCode = arrParams[arrParams.length-1].slice(1, arrParams[arrParams.length-1].length-1)
        const linha = arrParams[0].slice(1, arrParams[0].length-1)
        let url2 = `https://www.stcp.pt/pt/itinerarium/soapclient.php?codigo=${linha}&linha=0&hash123=${hashCode}`;

        axios.get(url2).then((resp: any) =>{
            const pageCode = cheerio.load(resp.data);
            let obj = []
            let times = pageCode("#smsBusResults .even");
            for(let i = 0; i< times.length; i++){
                let name = pageCode(pageCode(times[i]).find('td')[0]).text();
                let filtered = name.replace(/(\r\n|\n|\r|\t)/gm, "");
                let indexForSplit = filtered.indexOf(" ");
                let line = filtered.slice(0, indexForSplit).trim();
                let dir = filtered.slice(indexForSplit).trim();
                let estHour = pageCode(pageCode(times[i]).find('td')[1]).text()
                let timeUntil = pageCode(pageCode(times[i]).find('td')[2]).text()
                let data = {
                    line,
                    dir,
                    estHour,
                    timeUntil
                }
                obj.push(data);
            }
            res.json(obj);
        })
    }

    async stopLists(req: Request, res: Response){
        let {line} = req.query;
        let {dir} = req.query;
        const url = `https://www.stcp.pt/pt/itinerarium/callservice.php?action=linestops&lcode=${line}&ldir=${dir}`
        const {data} = await axios.get(url);
        res.json(data);
    }

    async getLinhas(req: Request, res: Response){
        const url = "https://www.stcp.pt/pt/itinerarium/callservice.php?action=lineslist&service=1&madrugada=0";
        const {data} = await axios.get(url);
        res.json(data);
    }

    async getLinhasDir(req: Request, res: Response){
        let {line} = req.query;
        const url = `https://www.stcp.pt/pt/itinerarium/callservice.php?action=linedirslist&lcode=${line}`;
        const {data} = await axios.get(url);
        res.json(data);
    }
    
}

export default BusPointController;