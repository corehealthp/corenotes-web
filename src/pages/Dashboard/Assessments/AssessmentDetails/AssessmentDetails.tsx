// import GoBackButton from "src/components/Buttons/GoBackButton";
// import styles from "./assessmentdetails.module.css";
// import { useFetchAssessmentDetailsResponse } from "src/features/assessment/selector";
import { Link, useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { useAssessmentState } from "src/features/assessment/state";
// import DataLoadingError from "src/components/DataLoadingError";
// import GridList from "src/components/GridList/GridList";
// import AssessmentQuestion from "../AssessmentQuestion";
import { FaChevronLeft } from "react-icons/fa";
import { useSetIndividualState } from "src/features/Individual/state";
import { useAssessmentState } from "src/features/assessment/state";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
// import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import { addAssessmentsToIndividualAction } from 'src/features/Individual/action';
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import InputField from "src/components/FormComponents/InputField/InputField";
import RadioButtonField from "src/components/FormComponents/RadioButtonField";
import TextField from "src/components/FormComponents/TextField";
import DataLoadingError from "src/components/DataLoadingError/DataLoadingError";
import { selectRadioOption } from "src/components/FormComponents/RadioButtonField/RadioButtonField";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";

interface AssessmentQuestionsType {
  options: any,
  id: number;
  questionType: string;
  label: string;
  inputState: string;
  setInputState: string;
 
}

interface SubCategoryProp {
  name: string;
  questions: AssessmentQuestionsType[]
}

interface AssessmentQuestionDataProps {
  id: number;
  questions: AssessmentQuestionsType[];
  title: string;
  subCategory: SubCategoryProp[]
}



export default function AssessmentDetails() {
  const { individualId } = useParams();
  const {id} = useParams();
  const assessmentId = Number(id)
  const [assessmentQuestions, setAssessmentQuestions] = useState<any>();
  const selectedAssessment = assessmentQuestions?.find((assessment:AssessmentQuestionsType) => assessment?.id === assessmentId ) as AssessmentQuestionDataProps;

  const setIndividualState = useSetIndividualState();
  const [assessmentState, setAssessmentState] = useAssessmentState();
  const [isFormValid, setIsFormValid] = useState(false)

  const [formFields, setFormFields] = useState<any>({});


//   const [assessmentState, setAssessmentState] = useAssessmentState();

//   const assessmentDetailsResponse = useFetchAssessmentDetailsResponse(
//     params.assessmentId!
//   );

  useEffect(() => {
    console.log("here")
    axios.get("/question.json").then((res) => {

      console.log(res.data, "jsd");

      setAssessmentQuestions(res.data.assessmentQuestions);
    });
  }, []);

  function selectOption (optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
    model.value = model.options[optionIndex];
    model.selected = true;
    model.selectedOptionIndex = optionIndex;

    setModel({...model})
}

function setInput(inputValue:string, model:formFieldType, setModel:setFormFieldType) {
    model.value = inputValue;
    validateModel(model);
    setModel({...model})

    enableButton()
}

function validateModel(updatedModel:formFieldType) {

    if(!updatedModel.value) {
        updatedModel.validated = true
        updatedModel.error = ''
        return;
    }

    updatedModel.validated = true
    updatedModel.error = ''
    return;
}

function enableButton() {
    if(validateForm()) {
      console.log("hshsa")
      setIsFormValid(true)
    }
    else {
      console.log("aadd")
      setIsFormValid(false)
    }
}

  const validateForm = () => {
    for (const key of Object.keys(formFields)) {
      const field = formFields[key];
      if (!field.selected) {
        return false;
      }      
    }
    return true;
  };


  function submitForm() {
    const questions = Object.keys(formFields).map((key) => {
      const field = formFields[key];
      return {
        question: field.label, 
        category: field.category,
        replyType: field.questionType === 'radio' ? 'YES_NO' : 'STRING', 
        answer: field.value,
      };
    });
    
    const payload = {
      category: selectedAssessment?.title,
      questions,
    }

    setAssessmentState(state => ({
        ...state,
        status: "LOADING",
        error: false,
        message: ""
    }))

    addAssessmentsToIndividualAction(individualId!, payload)
    .then((response)=> {
        setIndividualState((state:any) => ({
            ...state,
            assessments: {
                ...state.assessments,
                ...response.data.individualAssessments
            }
        }))

        createGlobalFeedback("error", response.message ?? "Assessment added successfully");
    })
    .catch((error)=> {
        createGlobalFeedback("error", error.message ?? "There was an error adding assessment to user")
        assessmentState.status === 'FAILED'
    })
    .finally(()=> {
        setIndividualState((state:any) => ({
            ...state,
            status: "IDLE",
        }))
    })
  }

//   useEffect(() => {
//     console.log(assessmentDetailsResponse.assessment);
//     setAssessmentState((state) => ({
//       ...state,
//       error: assessmentDetailsResponse.error,
//       assessmentDetails: assessmentDetailsResponse.assessment,
//     }));
//   }, [assessmentDetailsResponse, setAssessmentState]);

const renderDynamicForm = (questions:AssessmentQuestionsType[]) => {
  return questions?.map((question, index) => {
      if(question.questionType === 'input'){
          const model = formFields[question.inputState] || {
              placeholder: question.label,
              value: '',
              error: '',
              validated: false,
          }
          return (
              <InputField
                key={index}
                label={question.label}
                placeholder={model.placeholder}
                value={model.value}
                error={model.error}
                onInput={(value) => setInput(value, model, (newModel) => setFormFields({ ...formFields, [question.inputState]: newModel }))}
              />
          );
      } else if(question.questionType === 'radio') {
          
          const model = formFields[question.inputState] || {
              options: [
                { label: 'YES', value: 'YES' },
                { label: 'NO', value: 'NO' }
              ],
              selected: false,
              selectedIndex: 0,
              error: '',
              label: question.label,
              value: '',
              validated: false,
          };

          return (
              <RadioButtonField
                label={model.label}
                options={model.options}
                selected={model.selected}
                selectedIndex={model.selectedIndex}
                selectOption={(optionIndex) =>
                  selectRadioOption(optionIndex, model, (newModel) => setFormFields({ ...formFields, [question.inputState]: newModel }))
                }
              />
          );
      } else if(question.questionType === 'text-area'){
          const model = formFields[question.inputState] || {
              placeholder: question.label,
              value:'',
              error:'',
              validated:false   
          }

          return (
              <TextField 
                  placeholder={model.placeholder}
                  value={model.value}
                  onInput={(value) => setInput(value, model, (newModel) => setFormFields({ ...formFields, [question.inputState]: newModel }))}
              />
          )
      } else if (question.questionType === "dropdown") {
        const model = formFields[question.inputState] || {
          options: question.options,
          placeholder: 'Choose',
          error: '',
          selected: false,
          selectedOptionIndex: 0,
          label: question.label
        }



        return (
          <DropDownField
            // width={"65%"}
            // height={"60px"}
            label={model.label}
            // placeholder={model.placeholder}
            options={model.options}
            error={model.error}
            selected={model.selected}
            selectedOptionIndex={model.selectedOptionIndex}
            onSelect={(optionIndex: number) => selectOption(optionIndex, model, (newModel) => setFormFields({ ...formFields, [question.inputState]: newModel }))} 
        />

        )
      }
  })
}

  return (
    <>
      <div className="flex gap-2 items-center text-md mb-12">
        <label htmlFor="">Assessment</label>
        <Link to={"/dashboard/individuals/assessments"}><FaChevronLeft/></Link>
        <label htmlFor="" className="text-[#0A66D3] ">{selectedAssessment?.title?.toUpperCase()}</label>
      </div>
      {
        selectedAssessment?.questions?.length > 0 ? (
          <>
            <FormWrapper>
              <div className="grid grid-cols-3 gap-5 items-center">
                {renderDynamicForm(selectedAssessment.questions)}

                {selectedAssessment.subCategory && selectedAssessment.subCategory.map((subcategory, index) => (
                  <Fragment key={index}>
                    <h3 className="font-semibold text-2xl col-span-3">{subcategory.name}</h3>
                    {renderDynamicForm(subcategory.questions)}
                  </Fragment>
                ))}
              </div>
            </FormWrapper>
            <PrimaryTextButton
              // disabled={!isFormValid}
              isLoading={assessmentState.status === 'LOADING'}
              width={"20%"}
              label={"Save"}
              backgroundColor="green"          
              clickAction={()=> submitForm()}
            />
          </>

        ) :(
          <DataLoadingError message="There are no questions for this assessment" />
        )
      }       
      {/* {params?.title === "ddp oversight review" && <DdpOversightReview />}
      {params?.title === "nurse notes" && <NursesNote />}
      {params?.title === "rn oversight - monthly" && <RNOversightMonthly />} */}
    </>
  );
}
