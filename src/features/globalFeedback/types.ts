export interface IGlobalFeedback {
    status:"error"|"success" // error, success
    message:string;
    timeOutInSecs:number;

}