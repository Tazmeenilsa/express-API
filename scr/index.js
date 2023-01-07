const express = require("express")
const app = express()
const requests = require("requests")
const path=require("path")

const templatePath=path.join(__dirname,"../views")
// to set view engine
app.set("view engine", "hbs"); 

app.set("views",templatePath)

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/about", (req, res) => {
    requests(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=f7cad12987b05eee0828fc21385fd946`
    )
    .on("data",(chunkData)=>{
        console.log(chunkData)
        const objData=JSON.parse(chunkData)
        console.log(objData)

        const arrData=[objData]
        console.log(`city name is ${arrData[0].name} temp is ${arrData[0].main.temp}`)
        res.write(`city name is ${arrData[0].name} and temperature is ${arrData[0].main.temp}`)
    })
    .on("end",(err)=>{
        if(err) return console.log(err)
        res.end()

    })
})

app.listen(8000, () => {
    console.log("port 8000")
})