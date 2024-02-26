import { useState } from "react";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import InputField from "src/components/FormComponents/InputField";
import ModalContainer from "src/components/Modal/ModalContainer";
import { AssessmentCategoriesResponseType, createAssessmentCategoryAction } from "src/features/assessment/action";
import { useAssessmentState } from "src/features/assessment/state";
import styles from "./addassessmentcategory.module.css";

export default function AddAssessmentCategoryModal({closeModal}:{closeModal:()=> void}) {

    const [assessmentState, setAssessmentState] = useAssessmentState();
    
    const [assessmentCategoryNameModel, setAssessmentCategoryNameModel] = useState<formFieldType>({
        label:'Question category',
        placeholder:'Enter assessment category name',
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
            const temp = assessmentState.assessmentCategories.filter(category => category.name === updatedModel.value)
            if(temp.length && temp[0].name) {
                updatedModel.validated = false;
                updatedModel.error = `This assessment category already exists`
                return;
            }
        }

        updatedModel.validated = true;
        updatedModel.error = ''
        return;
    }

    function saveCategory(){
        if(assessmentCategoryNameModel.validated) {
            const payload = {
                assessmentCategoryName: assessmentCategoryNameModel.value
            }

            setAssessmentState(state => ({
                ...state,
                status:'LOADING',
                error:false,
                message:'',
            }))

            createAssessmentCategoryAction(payload)
            .then(({data}:AssessmentCategoriesResponseType)=> {
                setAssessmentState(state => ({
                    ...state,
                    status:'SUCCESS',
                    error:false,
                    message:'Question category added successfully',
                    assessmentCategories: data.assessmentCategories.map(category => ({
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
                    <div className={styles.titiel}>Add assessment category</div>
                    <IconCancelCircle onClick={()=> assessmentState.status === 'LOADING' ?()=>({}) :closeModal() }/>
                </div>

                <div className={styles.content}>
                    <InputField
                        inputContainer={"80%"}
                        placeholder={assessmentCategoryNameModel.placeholder}
                        value={assessmentCategoryNameModel.value}
                        error={assessmentCategoryNameModel.error}
                        onInput={(value:string)=> setInput(value, assessmentCategoryNameModel, setAssessmentCategoryNameModel)}
                    />
                </div>

                <div className={styles.buttons}>
                    <PrimaryTextButton
                        isLoading={assessmentState.status === 'LOADING'}
                        disabled={!assessmentCategoryNameModel.validated}
                        width={"20%"}
                        label="Save"
                        clickAction={()=> saveCategory()}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}