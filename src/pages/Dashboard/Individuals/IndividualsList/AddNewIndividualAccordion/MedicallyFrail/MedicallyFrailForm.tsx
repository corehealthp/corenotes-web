import { useState } from 'react'
// import style from './medicallyfrailform.css'
import { useSetIndividualState } from 'src/features/Individual/state'
import { RadioButtonFormFieldType } from 'src/components/FormComponents/RadioButtonField/types';
import RadioButtonField from 'src/components/FormComponents/RadioButtonField';
import { selectRadioOption } from 'src/components/FormComponents/RadioButtonField/RadioButtonField';

const MedicallyFrailForm = () => {
    const setIndividualState = useSetIndividualState();
    
    const [answerOptions, setAnswerOptions] = useState<RadioButtonFormFieldType>({
        label:'Medically Frail?',
        options:[
            {
                label:'YES',
                value:'yes'
            },
            {
                label:'NO',
                value:'no'
            }
        ],
        selected: false,
        selectedIndex: 0,
        error:'',
        value:''
    })

    // function selectAnswer(optionIndex:number, model:RadioButtonFormFieldType, setModel:SetRadioButtonFormFieldType) {
    //     model.selectedIndex = optionIndex;
    //     model.value = model.options[optionIndex].value;
    //     model.selected = true;

    //    onsubmit();
    // }    

    function submit(){
        setIndividualState((state) => {
          return{
            ...state,
            newIndividual: {
              ...state.newIndividual!,
              medicallyFrail: {
                options: answerOptions.value,
              }         
            }
          }
        })
      }

    return (
        <div>
            <div>
                <RadioButtonField
                    label={answerOptions.label}
                    options={answerOptions.options} 
                    selected={answerOptions.selected} 
                    selectedIndex={answerOptions.selectedIndex} 
                    selectOption={
                        (optionIndex:number)=> {
                            selectRadioOption(optionIndex, answerOptions, setAnswerOptions)
                            submit();                        
                        }}
                    />
            </div>
        </div>
    )
}

export default MedicallyFrailForm