const express = require("express");
const router = express.Router();

const { fetchFileDetails, getDownloadPath } = require("../services/fileservice");
router.get('/root/:rootPath', async function(req, res){
    try{
        const rootPath = req.params['rootPath'];
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

module.exports = router;