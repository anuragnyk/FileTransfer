const express = require("express");
const router = express.Router();
const path = require("path");
const { fetchFileDetails, getDownloadPath } = require("../services/fileservice");
const fs = require("fs");

router.get('/root/:rootPath', async function(req, res){
    try{
        let rootPath = req.params['rootPath'];
        //decode to string from base64
        rootPath = Buffer.from(rootPath, 'base64').toString('utf8');
        const results = await fetchFileDetails(rootPath);
        res.json(results);
    } catch (err){
        console.log(err);
        res.status(404).send("Error happened while processing request");
    }
});

router.get('/root', async function(req, res){
    try{
        const results = await fetchFileDetails(null);
        res.json(results);
    } catch (err){
        console.log(err);
        res.status(404).send("Error happened while processing request");
    }
})

router.get("/download/:resourcePath", async (req, res) => {
    const fileName = Buffer.from(req.params.resourcePath, 'base64').toString();
    const resourcePath = getDownloadPath(fileName);
    res.download(resourcePath, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
})

router.get("/view/*",async (req, res) => {
    let keys = Object.keys(req.params);
    if(keys.length <= 0 || typeof req.params[keys[0]] == 'undefined' ){
        return res.send(404);
    }
    const imagePath = path.resolve(process.env.DATA_FOLDER,  req.params[keys[0]]);
    console.log(imagePath);

    let contentType = "text/plain";
    let ext = path.extname(imagePath);
    if(ext.toLowerCase() == '.png'){
        contentType = 'image/png'
    }
    res.writeHead(200, {
        "Content-Type": contentType
    })
    fs.readFile(imagePath, (err, content) => {
        if(err){
            return res.send(404);
        }
        return res.end(content);

    })
})

module.exports = router;