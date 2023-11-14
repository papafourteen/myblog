
export const elapsedTime=(serverTimestamp)=>{
    //Firestore időbélyeget Date objektummá alakítjuk:
    const serverTime=new Date(serverTimestamp.seconds*1000+serverTimestamp.nanoseconds/1000000)
    const currentTime=new Date()
    const elapsedMiliseconds=currentTime-serverTime

    const miliSecondsInSeconds=1000
    const miliSecondsInMinute=60*miliSecondsInSeconds
    const miliSecondsInHour=60*miliSecondsInMinute
    const miliSecondsInDay=24*miliSecondsInHour
    const miliSecondsInWeek=7*miliSecondsInDay

    if(elapsedMiliseconds<miliSecondsInMinute){
        const seconds=Math.floor(elapsedMiliseconds/miliSecondsInSeconds)
        return `${seconds} másodperce`
    }else if(elapsedMiliseconds<miliSecondsInHour){
        const minutes=Math.floor(elapsedMiliseconds/miliSecondsInMinute)
        return `${minutes} perce`
    }else if(elapsedMiliseconds<miliSecondsInDay){
        const hours=Math.floor(elapsedMiliseconds/miliSecondsInHour)
        return `${hours} órája`
    }else if(elapsedMiliseconds<miliSecondsInWeek){
        const days=Math.floor(elapsedMiliseconds/miliSecondsInDay)
        return `${days} napja`
    }else{
        const week=Math.floor(elapsedMiliseconds/miliSecondsInWeek)
        return `${week} hete`
    }
}