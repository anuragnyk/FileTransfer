
const fs = require("fs");
const path = require("path");

const  ResourceDtoList  = require("../dtos/resourceDto.js");

exports.fetchFileDetails = async function(rootPath){
    const initialPath = rootPath;
    rootPath = rootPath ? path.resolve(process.env.DATA_FOLDER, rootPath) : process.env.DATA_FOLDER;
    const resourceDtoList = new ResourceDtoList();
    return await new Promise((resolve, reject) => {
        fs.readdir(rootPath, (err, files) =>{
            if(err){
                let message = "Error happened while processing request!!";
                if(err.code == 'ENOENT'){
                    message = "No such file or directory found";
                }
                const error = new Error(message);
                return reject(error);
            }
            try{
                for(file of files){
                    const resourcePath = path.resolve(rootPath, file);
                    const stats = fs.statSync( resourcePath);
                    resourceDtoList.addResource({relativePath: path.resolve(initialPath, file), isDirectory: stats.isDirectory()});
                }
                return resolve(resourceDtoList);
            } catch (err){
                console.log(err);
                const error = new Error("Error happened while processing request!!");
                return reject(error);
            }
        })
    })
}

exports.getDownloadPath = (resourcePath) => {
    if(!resourcePath){
        throw new Error("Invalid Input")
    }
    resourcePath = path.resolve(process.env.DATA_FOLDER, resourcePath);
    return resourcePath;
  };