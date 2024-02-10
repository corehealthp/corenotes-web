import styles from "./addquestioncategory.module.css"
import ModalContainer from "src/components/Modal/ModalContainer"
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg"
import InputField from "src/components/FormComponents/InputField"
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import { useState } from "react";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useAssessmentState } from "src/features/assessment/state";
import { AssessmentCategoriesResponseType, createAssessmentQuestionCategoryAction } from "src/features/assessment/action";

export default function AddQuestionCategoryModal({closeModal}:{closeModal:()=> void}) {

    const [assessmentState, setAssessmentState] = useAssessmentState();
    
    const [questionCategoryNameModel, setQuestionCategoryNameModel] = useState<formFieldType>({
        label:'Question category',
        placeholder:'Enter question category name',
        name:'question-category',
        value:'',
        error:'',
        validated:false
    });

    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;
        validateModel(model)
        setModel({...model})
    }

    function validateModel(updatedModel:formFieldType){
        if(!updatedModel.value) {
            updatedModel.validated = false;
            updatedModel.error = `${updatedModel.label} field cannot be empty`
            return;
        }

        if(updatedModel.name === 'question-category') {
            const temp = assessmentState.questionCategories.filter(category => category.name === updatedModel.value)
            if(temp.length && temp[0].name) {
                console.log('HERE')
                updatedModel.validated = false;
                updatedModel.error = `Category already exists`
                return;
            }
        }

        updatedModel.validated = true;
        updatedModel.error = ''
        return;
    }

    function saveCategory(){
        if(questionCategoryNameModel.validated) {
            const payload = {
                questionCategoryName: questionCategoryNameModel.value
            }

            setAssessmentState(state => ({
                ...state,
                status:'LOADING',
                error:false,
                message:'',
            }))

            createAssessmentQuestionCategoryAction(payload)
            .then(({data}:AssessmentCategoriesResponseType)=> {
                setAssessmentState(state => ({
                    ...state,
                    status:'SUCCESS',
                    error:false,
                    message:'Question category added successfully',
                    questionCategories: data.questionCategories.map(category => ({
                        id: category.id,
                        name: category.name
                    }))
                }))
                closeModal()
            })
            .catch(()=> {
                setAssessmentState(state => ({
                    ...state,
                    status:'FAILED',
                    error:true,
                    message:'There was an error saving new question category, please try again',
                }))
            })
        }
    }

    return(
        <ModalContainer>
            <div className={styles.add_question_category_modal}>
                <div className={styles.header}>
                    <div className={styles.titiel}>Add question category</div>
                    <IconCancelCircle onClick={()=> assessmentState.status === 'LOADING' ? ()=>({}) :closeModal()} />
                </div>

                <div className={styles.content}>
                    <InputField
                        inputContainer={"80%"}
                        placeholder={questionCategoryNameModel.placeholder}
                        value={questionCategoryNameModel.value}
                        error={questionCategoryNameModel.error}
                        onInput={(value:string)=> setInput(value, questionCategoryNameModel, setQuestionCategoryNameModel)}
                    />
                </div>

                <div className={styles.buttons}>
                    <PrimaryTextButton
                        isLoading={assessmentState.status === 'LOADING'}
                        disabled={!questionCategoryNameModel.validated}
                        width={"20%"}
                        label="Save"
                        backgroundColor="green"

                        clickAction={()=> saveCategory()}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}