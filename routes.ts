import express from 'express';
import BusPointController from './controller/busStopController';

//index, show, create, update, delete

const routes = express.Router();
const busStopController = new BusPointController();



routes.get('/', function(req, res){
    res.send("<h1> yellouwwwwwww </h1>");
  });

routes.get("/stoptimes", function(req, res) {
  if(!req.query.stop){
    req.query.stop = "ARRB3"; 
  }
   busStopController.show(req, res)
});

routes.get("/lines", function(req, res) {
   busStopController.getLinhas(req, res);
});

routes.get("/lines/dir", function(req, res) {
  busStopController.getLinhasDir(req, res);
});

routes.get("/stops", function(req, res) {
  busStopController.stopLists(req, res);
});


export default routes;