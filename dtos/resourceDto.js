class ResourceDto{
    relativePath = null;
    isDirectory = null;  
    constructor({relativePath, isDirectory}){
        this.relativePath = relativePath;
        this.isDirectory = isDirectory
    }
}

module.exports = class ResourceDtoList {
    resourceDtoList = [];
    constructor(){}
    addResource({relativePath, isDirectory}){
        const resourceDto = new ResourceDto({relativePath,isDirectory});
        this.resourceDtoList.push(resourceDto);
    }

    getResources(){
        return this.resourceDtoList;
    }

} 