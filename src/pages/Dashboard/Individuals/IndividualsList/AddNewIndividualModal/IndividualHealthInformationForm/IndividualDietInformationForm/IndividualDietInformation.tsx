import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "../individualhealthinformation.module.css"
import { useState } from "react";
import MultiSelectDropDownField from "src/components/FormComponents/DropDownField/MultiSelectDropDownField/MultiSelectDropDownField";
import { MultiSelectDropDownFormData } from "src/components/FormComponents/DropDownField/MultiSelectDropDownField/types";


export default function IndividualDietInformationForm({userState,setIndividuals}:any) {


    const [dietSelection, setDietSelection] = useState<MultiSelectDropDownFormData>({
        label: '',
        placeholder: 'Select diet',
        relative: true,
        error:'',
        options: ['Unspecified', 'Low Sodium', 'Diabetic', 'Pureed', 'Low Cholestrol', 'Regular', 'Low fat', 'Salt-free', 'Low potassium', 'Soft', 'Glutten free', 'Low fiber', 'Sugar free'],
        value:userState?.diet,
        validated: false
    })

    function storeNewDietSelections(selections:Array<string>) {
        dietSelection.value = selections;
        setDietSelection({...dietSelection})
       
            setIndividuals((state: any) => ({
              ...state,
              diet: dietSelection.value,
            }));
         
    }

    return (
        <FormWrapper extraStyles={styles.staff_personal_information_form}>
            <div className={styles.heading}>
                <div className={styles.number_circle}>4</div>
                <div className={styles.text}>Diet</div>
            </div>

            <div className={styles.form_content}>
                <div className={styles.row}>
                    <MultiSelectDropDownField
                        width={"100%"}
                        label={dietSelection.label!} 
                        placeholder={dietSelection.placeholder}
                        options={dietSelection.options}
                        error={dietSelection.error} 
                        onSelect={(selections:Array<string>)=> storeNewDietSelections(selections)}
                    />
                </div>
            </div>
        </FormWrapper>
    )
}