import FormWrapper from "src/components/FormComponents/FormWrapper"
import styles from './functionallimitationspecialneeds.module.css'
import InputField from "src/components/FormComponents/InputField"
import { useSetIndividualState } from "src/features/Individual/state";
import { useState } from "react";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
const FunctionalLimitationSpecialNeedsForm = () => {


  const setIndividualState = useSetIndividualState();

  const [seizureActivityModel, setSeizureActivityModel] = useState<formFieldType>({
    type: "text",
    label: "Seizure Activity",
    placeholder: "Seizure Activity",
    value: "",
    error: "",
    validated: false
  });
  
  const [blindVisionLossModel, setBlindVisionLossModel] = useState<formFieldType>({
    type: "text",
    label: "Blind, or vision loss",
    placeholder: "Blind, or vision loss",
    value: "",
    error: "",
    validated: false
  });

  const [hardHearingModel, setHardHearingModel] = useState<formFieldType>({
    type: "text",
    label: "Hard of Hearing/ Deaf",
    placeholder: "Hard of Hearing/ Deaf",
    value: "",
    error: "",
    validated: false
  });

  const [incontinentSafetyModel, setIncontinentSafetyModel] = useState<formFieldType>({
    type: "text",
    label: "Incontinent, Safety",
    placeholder: "Incontinent, Safety",
    value: "",
    error: "",
    validated: false
  });

  const [proneToFallingModel, setProneToFallingModel] = useState<formFieldType>({
    type: "text",
    label: "Prone to Falling",
    placeholder: "Prone to Falling",
    value: "",
    error: "",
    validated: false
  });

  const [oxygenModel, setOxygenModel] = useState<formFieldType>({
    type: "text",
    label: "Oxygen",
    placeholder: "Oxygen",
    value: "",
    error: "",
    validated: false
  });

  const [weightBearingLimitationModel, setWeightBearingLimitationModel] = useState<formFieldType>({
    type: "text",
    label: "Weight-bearing Limitation",
    placeholder: "Weight-bearing Limitation",
    value: "",
    error: "",
    validated: false
  });

  const [activityLimitationModel, setActivityLimitationModel] = useState<formFieldType>({
    type: "text",
    label: "Activity Limitation",
    placeholder: "Activity Limitation",
    value: "",
    error: "",
    validated: false
  });

  const [shortnessOfBreathModel, setShortnessOfBreathModel] = useState<formFieldType>({
    type: "text",
    label: "Shortness of breath",
    placeholder: "Shortness of breath",
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
          specialNeeds: {
            activityLimitation: activityLimitationModel.value,
            blindVisionLoss: blindVisionLossModel.value,
            failingProne: proneToFallingModel.value,
            hardHearing: hardHearingModel.value,
            incontintentSafety: incontinentSafetyModel.value, 
            oxygen: oxygenModel.value,
            seizureActivity: seizureActivityModel.value,
            shortnessOfBirth: shortnessOfBreathModel.value,
            weightBearingLimitation: weightBearingLimitationModel.value,          
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
            type={seizureActivityModel.type}
            placeholder={seizureActivityModel.placeholder}
            value={seizureActivityModel.value}
            error={seizureActivityModel.error}
            label={seizureActivityModel.label}
            onInput={(inputValue: string) => 
              setInput(inputValue, seizureActivityModel, setSeizureActivityModel)
            }
          />
          <InputField 
            type={blindVisionLossModel.type}
            placeholder={blindVisionLossModel.placeholder}
            value={blindVisionLossModel.value}
            error={blindVisionLossModel.error}
            label={blindVisionLossModel.label}
            onInput={(inputValue: string) => 
              setInput(inputValue, blindVisionLossModel, setBlindVisionLossModel)
            }
          />
        </div>
        <div className={styles.row}>
          <InputField 
            type={hardHearingModel.type}
            placeholder={hardHearingModel.placeholder}
            value={hardHearingModel.value}
            error={hardHearingModel.error}
            label={hardHearingModel.label}
            onInput={(inputValue: string) => 
              setInput(inputValue, hardHearingModel, setHardHearingModel)
            }
          />
          <InputField 
            type={incontinentSafetyModel.type}
            placeholder={incontinentSafetyModel.placeholder}
            value={incontinentSafetyModel.value}
            error={incontinentSafetyModel.error}
            label={incontinentSafetyModel.label}
            onInput={(inputValue: string) => 
              setInput(inputValue, incontinentSafetyModel, setIncontinentSafetyModel)
            }
          />

        </div>
        <div className={styles.row}>
          <InputField 
            type={proneToFallingModel.type}
            placeholder={proneToFallingModel.placeholder}
            value={proneToFallingModel.value}
            error={proneToFallingModel.error}
            label={proneToFallingModel.label}
            onInput={(inputValue: string) => 
              setInput(inputValue, proneToFallingModel, setProneToFallingModel)
            }
          />
          <InputField 
            type={oxygenModel.type}
            placeholder={oxygenModel.placeholder}
            value={oxygenModel.value}
            error={oxygenModel.error}
            label={oxygenModel.label}
            onInput={(inputValue: string) => 
              setInput(inputValue, oxygenModel, setOxygenModel)
            }
          />

        </div>
        <div className={styles.row}>
          <InputField 
            type={weightBearingLimitationModel.type}
            placeholder={weightBearingLimitationModel.placeholder}
            value={weightBearingLimitationModel.value}
            error={weightBearingLimitationModel.error}
            label={weightBearingLimitationModel.label}
            onInput={(inputValue: string) => 
              setInput(inputValue, weightBearingLimitationModel, setWeightBearingLimitationModel)
            }
          />
          <InputField 
            type={activityLimitationModel.type}
            placeholder={activityLimitationModel.placeholder}
            value={activityLimitationModel.value}
            error={activityLimitationModel.error}
            label={activityLimitationModel.label}
            onInput={(inputValue: string) => 
              setInput(inputValue, activityLimitationModel, setActivityLimitationModel)
            }
          />

        </div>
        <div className={styles.row} style={{width: "50%", }}>
          <InputField 
            type={shortnessOfBreathModel.type}
            placeholder={shortnessOfBreathModel.placeholder}
            value={shortnessOfBreathModel.value}
            error={shortnessOfBreathModel.error}
            label={shortnessOfBreathModel.label}
            onInput={(inputValue: string) => 
              setInput(inputValue, shortnessOfBreathModel, setShortnessOfBreathModel)
            }
          />

        </div>
      </div>
    </FormWrapper>
  )
}

export default FunctionalLimitationSpecialNeedsForm