import { useState } from "react";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "../individualhealthinformation.module.css"
import TagInputField from "src/components/FormComponents/InputField/TagInputField/TagInputField";
import { useIndividualState } from "src/features/Individual/state";

export default function IndividualAllergiesInformationForm() {

    const [individualState, setIndividualState] = useIndividualState()

    const [foodAllergiesModel, setFoodAllergiesModel] = useState({
        type:'text',
        label: 'Food allergies',
        placeholder:'Food allergies',
        value: individualState.newIndividual?.allergies.food,
        error:'',
        validated:false
    })

    const [medAllergiesModel, setMedAllergiesModel] = useState({
        type:'text',
        label: 'Med allergies',
        placeholder:'Med allergies',
        value:individualState.newIndividual?.allergies.med,
        error:'',
        validated:false
    })

    const [otherAllergiesModel, setOtherAllergiesModel] = useState({
        type:'text',
        label: 'Other allergies',
        placeholder:'Other allergies',
        value:individualState.newIndividual?.allergies.other,
        error:'',
        validated:false
    })

    function setAllergy(tags:Array<string>, allergyModel:any, setAllergyModel:any) {
        allergyModel.value = tags;
        validateAllergyModel(allergyModel);
        setAllergyModel({...allergyModel})

        submit()
    }

    function validateAllergyModel(updatedAllergyModel:any) {
        if(!updatedAllergyModel.value.length) {
            updatedAllergyModel.error = `${updatedAllergyModel.label} cannot be empty`
            updatedAllergyModel.validated = false
            return;
        }
        
        updatedAllergyModel.error = ''
        updatedAllergyModel.validated = true
        return;
    }

    function submit() {
        setIndividualState((state)=> {
            return {
                ...state,
                newIndividual: {
                    ...state.newIndividual!,
                    allergies: {
                        food: foodAllergiesModel.value!,
                        med: medAllergiesModel.value!,
                        other: otherAllergiesModel.value!
                    }
                }
            }
        })
    }

    return (
        <FormWrapper extraStyles={styles.staff_personal_information_form}>
            {/* <div className={styles.heading}>
                <div className={styles.number_circle}>5</div>
                <div className={styles.text}>Allergies</div>
                <div className={styles.info}>(Press enter to add allergy)</div>
            </div> */}

            <div className={styles.form_content}>
                <div className={styles.row}>
                    <TagInputField 
                        label={""}
                        placeholder={foodAllergiesModel.placeholder!}
                        value={foodAllergiesModel.value!}
                        error={foodAllergiesModel.error}
                        onTagAdded={(tags:Array<string>)=> setAllergy(tags, foodAllergiesModel, setFoodAllergiesModel)}
                    />

                    <TagInputField 
                        label={""}
                        placeholder={medAllergiesModel.placeholder!}
                        value={medAllergiesModel.value!}
                        error={medAllergiesModel.error}
                        onTagAdded={(tags:Array<string>)=> setAllergy(tags, medAllergiesModel, setMedAllergiesModel)}
                    />

                    <TagInputField 
                        label={""}
                        placeholder={otherAllergiesModel.placeholder!}
                        value={otherAllergiesModel.value!}
                        error={otherAllergiesModel.error} 
                        onTagAdded={(tags:Array<string>)=> setAllergy(tags, otherAllergiesModel, setOtherAllergiesModel)}
                    />
                </div>
            </div>
        </FormWrapper>
    )
}