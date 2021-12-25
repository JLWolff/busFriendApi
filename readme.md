## Non official STCP api
- link of the api for reqs: https://busfriendapi.herokuapp.com/

## get lines:

get to /lines

- returns the list of all lines available in the following format:
   ` {
  "sort": null,
  "recordsReturned": 73,
  "totalRecords": 73,
  "records": [
    {
      "accessibility": 1,
      "code": "200",
      "pubcode": "200",
      "description": "200 - BOLHÃO-CAST. QUEIJO"
    },
    {
      "accessibility": 2,
      "code": "201",
      "pubcode": "201",
      "description": "201 - ALIADOS-VISO"
    },`

## lines dir:

get to /lines/dir

pass the line you wish to get the directions object by query. for example /lines/dir?line=903

returns an object with the following data:

`{
  "sort": null,
  "recordsReturned": 2,
  "totalRecords": 2,
  "records": [
    {
      "descr_dir": "BOAVISTA-VILAR DO PARAÍSO",
      "descr": "903 VILAR DO PARAÍSO",
      "dir": 0
    },
    {
      "descr_dir": "VILAR DO PARAÍSO-BOAVISTA",
      "descr": "903 BOAVISTA",
      "dir": 1
    }
  ],
  "startIndex": 0,
  "dir": "asc"
}`

## get stops list of a given line

get to /stops

pass the line and direction by query, just like this: /stops?line=902&dir=0

returns a json object with the following data:

`{
  "sort": null,
  "recordsReturned": 29,
  "totalRecords": 29,
  "records": [
    {
      "zone": "PRT1",
      "code": "CMS1",
      "name": "CASA DA MÚSICA (METRO)",
      "address": "CASA DA MÚSICA",
      "sequence": 1
    },
    {
      "zone": "PRT1",
      "code": "BCM5",
      "name": "BOAVISTA-CASA DA MÚSICA",
      "address": "AV.FRANÇA",
      "sequence": 2
    },
    {
      "zone": "PRT1",
      "code": "BS8",
      "name": "BOM SUCESSO",
      "address": "LGO.FERREIRA LAPA",
      "sequence": 3
    },
}`

## get times for the upcoming buses in a stop

get to /stoptimes

pass the stop code you want to check as a query param, like: /stoptimes?stop=BCM5

returns a json like this:

`[
  {
    "line": "704",
    "dir": "BOAVISTA B.S",
    "estHour": "a passar",
    "timeUntil": ""
  },
  {
    "line": "803",
    "dir": "BOAVISTA B.S",
    "estHour": "19:35",
    "timeUntil": "15min"
  },
  {
    "line": "704",
    "dir": "BOAVISTA B.S",
    "estHour": "19:42",
    "timeUntil": "22min"
  },
  {
    "line": "902",
    "dir": "LAVADORES -",
    "estHour": "19:45",
    "timeUntil": "24min"
  }
]`

