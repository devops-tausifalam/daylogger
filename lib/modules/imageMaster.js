/* 
    scriptName: imageMaster
    objectives: advance script which converts and/or compresses images for its memory efficiency and stores them as blob in JSON

    It's a standalone javascript module which can be imported in any other projects when and where its use is required.

    developer: Tausif Alam @devops-tausifalam On github
*/
class imageMaster {
    constructor (fetch) {
        this.fetch = fetch
    }
    // check for input type URL or Object
    isValidURL(str) {
        try {
            new URL(str); //try to create a new URL object
            return true; //if successful, it's a valid URL
        } catch (error){
            return false; //if an error is thrown, it's not a valid URL
        }
    }
    isValidObject (image_object) {
        if (image_object instanceof Object){
            return true
        } else {
            return false;
        }
    }
}

const imageHandler = new imageMaster();

console.log(imageHandler.isValidURL("devo"))