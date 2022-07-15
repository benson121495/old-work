export class AttachingUtils {

    

    constructor() { }

    filecheck(name: any,additionalist: any[]){
        let additionalerror = false;
        for(let i=0;i<additionalist.length;i++){
            if(additionalist[i].filename == name){
                additionalerror = true;
            }    
        }
        return additionalerror;
    }

    fileType(name: any){
        let typecheck = false;
        if(name.match("jpeg") || name.match("jpg") || name.match("tif")){
            typecheck = false;
        }
        else {
            typecheck = true;
        }
        return typecheck;
    }
    fileSize(size: any,limit: any){
        let sizeError = false;
        if(size/1000>limit){
            sizeError = true;
        }
        return sizeError;

    }
          
          
    createErrorMessage(listofErros, errors, listofFiles, filelength, errorLength){
      
        if(listofErros != null){
             
          listofErros.push({
            error: true,
            filename: errors[errorLength].error,
            message: errors[errorLength].message,
            code: errors[errorLength].code
          })
      
      }
      else{
         listofErros.push({
         error: false,
         filename: "",
         message: "",
         code: ""
         })
      }
      return listofErros;
    }

    removeList(listofFiles,i){
        let addi = listofFiles.slice(0,i);
        for(let id=i+1;id<listofFiles.length;id++){
          addi.push(listofFiles[id]);
        }
        return addi;
      
       }


    removeERN(listofFiles, ern, cropLength){
      for(let i = 0;i<listofFiles.length;i++){
      if(listofFiles[i].filename.includes(ern)){
        listofFiles[i].filename = listofFiles[i].filename.substring(cropLength);
       }
      }
    //   return listofFiles[i];
     }
       
}