import { useState } from "react";
import FormWrapper from "src/components/FormComponents/FormWrapper"
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types"
import InputField from "src/components/FormComponents/InputField"
import styles from './frequencydischargeplanform.module.css'
import { useSetIndividualState } from "src/features/Individual/state";

const FrequencyDischargePlanForm = () => {

  const setIndividualState = useSetIndividualState();


  const [serviceDaysFrequency, setServiceDaysFrequency] = useState<formFieldType>({
      type: "text",
      label: "Days and frequency of service",
      placeholder: "Days and frequency of service",
      value: "",
      error: "",
      validated: false
  });
  
  const [dischargePlan, setDischargePlan] = useState<formFieldType>({
    type: "text",
    label: "Discharge Plan",
    placeholder: "Discharge Plan",
    value: "",
    error: "",
    validated: false
  });

  const [serviceExpectedTimeAndFrequency, setServiceExpectedTimeAndFrequency] = useState<formFieldType>({
    type: "text",
    label: "Times and frequency of service",
    placeholder: "Expected times abd frequency of service",
    value: "",
    error: "",
    validated: false
  });

  const [expectedServiceDuration, setExpectedServiceDuration] = useState<formFieldType>({
    type: "text",
    label: "Expected duration of services",
    placeholder: "Expected duration of services",
    value: "",
    error: "",
    validated: false
  });


  function validateModel(updatedInputModel: formFieldType) {
      if(!updatedInputModel.value && !updatedInputModel.optional){
        updatedInputModel.validated = false;
        updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
        return;
      }
  
      updatedInputModel.validated = true;
      updatedInputModel.error = "";
      return;
    }
    
    function setInput(
      value: string,
      inputModel: formFieldType,
      setInputModel: setFormFieldType
    ) {
      inputModel.value = value;
      validateModel(inputModel);
      setInputModel({ ...inputModel });
  
      submit();
    }

    function submit(){
      setIndividualState((state) => {
        return{
          ...state,
          newIndividual: {
            ...state.newIndividual!,
            serviceFrequency: {
              daysAndFrequencyOfService: serviceDaysFrequency.value,
              dischargePlan: dischargePlan.value,
              durationOfService: expectedServiceDuration.value,
              frequencyOfService: expectedServiceDuration.value,
            }            
          }
        }
      })
    }
  return (
    <FormWrapper>
    <div className={styles.form_content}>
      <div className={styles.row}>
        <InputField 
          type={serviceDaysFrequency.type}
          placeholder={serviceDaysFrequency.placeholder}
          value={serviceDaysFrequency.value}
          error={serviceDaysFrequency.error}
          label={serviceDaysFrequency.label}
          onInput={(inputValue: string) => 
            setInput(inputValue, serviceDaysFrequency, setServiceDaysFrequency)
          }
        />
        <InputField 
          type={dischargePlan.type}
          placeholder={dischargePlan.placeholder}
          value={dischargePlan.value}
          error={dischargePlan.error}
          label={dischargePlan.label}
          onInput={(inputValue: string) => 
            setInput(inputValue, dischargePlan, setDischargePlan)
          }
        />
      </div>
      <div className={styles.row}>
        <InputField 
          type={serviceExpectedTimeAndFrequency.type}
          placeholder={serviceExpectedTimeAndFrequency.placeholder}
          value={serviceExpectedTimeAndFrequency.value}
          error={serviceExpectedTimeAndFrequency.error}
          label={serviceExpectedTimeAndFrequency.label}
          onInput={(inputValue: string) => 
            setInput(inputValue, serviceExpectedTimeAndFrequency, setServiceExpectedTimeAndFrequency)
          }
        />
        <InputField 
          type={expectedServiceDuration.type}
          placeholder={expectedServiceDuration.placeholder}
          value={expectedServiceDuration.value}
          error={expectedServiceDuration.error}
          label={expectedServiceDuration.label}
          onInput={(inputValue: string) => 
            setInput(inputValue, expectedServiceDuration, setExpectedServiceDuration)
          }
        />

      </div>      
    </div>
  </FormWrapper>
  )
}

export default FrequencyDischargePlanForm