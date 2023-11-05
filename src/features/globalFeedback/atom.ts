import { atom, useRecoilState, useRecoilValue } from "recoil";
import { IGlobalFeedback } from "./types";
import { getRecoil, setRecoil } from "recoil-nexus";
import CapitalizeFirstChar from "src/utils/capitalizeFirstChar";

export const globalFeedbacks:IGlobalFeedback[] = [];

const globalFeedbackAtom = atom({
    key: 'globalFeedbackState',
    default: globalFeedbacks
});

export const useGlobalFeedbackState = ()=> useRecoilState(globalFeedbackAtom)
export const useGlobalFeedbackStateValue = ()=> useRecoilValue(globalFeedbackAtom)

export function createGlobalFeedback(status:"error"|"success", message:string, time?:number) {
    const feedbacks = getRecoil(globalFeedbackAtom)
    setRecoil(globalFeedbackAtom, [{ status, message: CapitalizeFirstChar(message), timeOutInSecs: time ?? 3 }, ...feedbacks])
}

export function removeGlobalFeedback(feedbackIndex:number) {
    const feedbacks = [...getRecoil(globalFeedbackAtom)];
    feedbacks.splice(feedbackIndex, 1)
    setRecoil(globalFeedbackAtom, feedbacks)
}