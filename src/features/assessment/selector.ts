import { selector, selectorFamily, useRecoilValue } from "recoil";
import {
  AssessmentCategoriesResponseType,
  AssessmentListResponseType,
  fetchAssessmentCategoriesAction,
  fetchAssessmentsAction,
  getAssessmentDetailsAction,
} from "./action";
import { AssessmentInitState } from "./state";
import { AssessmentModelType } from "./types";

export interface IFetchAssessments {
  assessments: Pick<AssessmentListResponseType, "data">["data"];
  message: string;
  code: number;
  error: boolean;
}

const fetchAssessmentsListSelector = selectorFamily({
  key: "fetch_assessments_list_selector",
  get: (pageNumber: number) => async () => {
    return await fetchAssessmentsAction(pageNumber)
      .then((response: AssessmentListResponseType) => {
        return {
          assessments: response.data,
          code: response.code,
          message: response.message,
          error: false,
        } satisfies IFetchAssessments;
      })
      .catch((error) => {
        return {
          assessments: AssessmentInitState.assessments,
          code: error.code,
          message: error.message,
          error: true,
        } satisfies IFetchAssessments;
      });
  },
});
export const useFetchAssessmentsListSelector = (pageNumber: number) =>
  useRecoilValue(fetchAssessmentsListSelector(pageNumber));

// const fetchAssessmentsListSelector = selectorFamily({
//     key: 'fetch_assessments_list_selector',
//     get: (payload:{pageNumber:number, individualId:string})=> async ()=> {
//         return await fetchAssessmentsAction(payload)
//         .then(({data}:AssessmentListResponseType)=> {
//             return {
//                 assessments: data.assessments,
//                 code: 200,
//                 message: '',
//                 error: false
//             }
//         })
//         .catch((error)=> {
//             return {
//                 code: error.code,
//                 error: true,
//                 message: error.message,
//                 assessments: []
//             }
//         })
//     }
// })
// export const useFetchAssessmentsListSelector = (pageNumber:number, individualId:string)=> useRecoilValue(fetchAssessmentsListSelector({pageNumber, individualId}))

const fetchAssessmentCategoriesSelector = selector({
  key: "fetch_assessments_category_selector",
  get: async () => {
    return await fetchAssessmentCategoriesAction()
      .then((response: AssessmentCategoriesResponseType) => {
        console.log(response);
        return {
          status: response.status,
          code: response.code,
          error: false,
          assessmentCategories: response.data.assessmentCategories,
          questionCategories: response.data.questionCategories,
        };
      })
      .catch((error) => ({
        status: "ERROR",
        code: error.code,
        error: true,
        assessmentCategories: [],
        questionCategories: [],
      }));
  },
});
export const useFetchAssessmentCategories = () =>
  useRecoilValue(fetchAssessmentCategoriesSelector);

interface IFetchAssessmentDetails {
  assessment: AssessmentModelType;
  message: string;
  code: number;
  error: boolean;
}

const fetchAssessmentDetailsSelector = selectorFamily({
  key: "fetch_assessment_details_selector",
  get: (assessmentId: string) => async () => {
    return getAssessmentDetailsAction(assessmentId)
      .then((response) => {
        return {
          assessment: response.data.assessment,
          message: response.message,
          code: response.code,
          error: false,
        } satisfies IFetchAssessmentDetails;
      })
      .catch((error) => {
        return {
          assessment: AssessmentInitState.assessmentDetails,
          message: error.message,
          code: error.code,
          error: true,
        } satisfies IFetchAssessmentDetails;
      });
  },
});
export const useFetchAssessmentDetailsResponse = (assessmentId: string) =>
  useRecoilValue(fetchAssessmentDetailsSelector(assessmentId));
