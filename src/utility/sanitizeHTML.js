export const sanitizeHTML=(html)=>{
    const doc=new DOMParser().parseFromString(html,'text/html')
    return doc.body.textContent || ''
}



export const truncatedStory=(description,maxLength)=>{
    //eltávolítjuk a HTML elemeket:
    const sanitizedDescription=sanitizeHTML(description)
    let truncatedStory=sanitizedDescription
    if(sanitizedDescription.length>maxLength){
        const lastIndexSpace=sanitizedDescription.lastIndexOf(' ',maxLength)
        if(lastIndexSpace!=-1){
            truncatedStory=sanitizedDescription.substring(0,lastIndexSpace)
        }else{
            truncatedStory=sanitizedDescription.substring(0,maxLength)
        }

    }
    return truncatedStory
}