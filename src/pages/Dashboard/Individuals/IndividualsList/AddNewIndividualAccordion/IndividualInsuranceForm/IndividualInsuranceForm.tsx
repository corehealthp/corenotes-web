import { useState } from 'react'
import styles from './indivdualform.module.css';
import { useSetIndividualState } from 'src/features/Individual/state';
import FormWrapper from 'src/components/FormComponents/FormWrapper';
import { formFieldType, setFormFieldType } from 'src/components/FormComponents/FormWrapper/types';
import InputField from 'src/components/FormComponents/InputField';

const IndividualInsuranceForm = () => {
    const setIndividualState = useSetIndividualState();

    const [medicareModel, setMedicareModel] = useState<formFieldType>({
        type: "text",
        label: "Medicare ",
        placeholder: "Medicare",
        value: "",
        error: "",
        validated: false
    })

    const [medicareNumberModel, setMedicareNumberModel] = useState<formFieldType>({
        type: "text",
        label: "Medicare Number",
        placeholder: "Medicare Number",
        value: "",
        error: "",
        validated: false
    })

    // const [othersModel, setOthersModel] = useState<formFieldType>({
    //     type: "text",
    //     label: "Others",
    //     placeholder: "",
    //     value: "",
    //     error: "",
    //     validated: false
    // })
    const [medicaidNumberModel, setMedicaidNumberModel] = useState<formFieldType>({
        type: "text",
        label: "Medicaid Number",
        placeholder: "Medicaid Number",
        value: "",
        error: "",
        validated: false
    })

    const [othersNumberModel, setOthersNumberModel] = useState<formFieldType>({
        type: "text",
        label: "Insurance Number",
        placeholder: "insurance number",
        value: "",
        error: "",
        validated: false
    })

    const [contactFullnameModel, setContactFullnameModel] = useState<formFieldType>({
        type: "text",
        label: "Full Name",
        placeholder: "John Dode",
        value: "",
        error: "",
        validated: false
    })

    const [contactEmailAddressModel, setContactEmailAddressModel] = useState<formFieldType>({
        type: "text",
        label: "Email Address",
        placeholder: "johndoe@mail.com",
        value: "",
        error: "",
        validated: false
    })

    const [contactCellPhoneModel, setContactCellPhoneModel] = useState<formFieldType>({
        type: "text",
        label: "Cell Phone",
        placeholder: "+13023948489",
        value: "",
        error: "",
        validated: false
    })

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
        console.log(inputModel, "hhhh")
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
              medicare_no: medicareNumberModel.value,
              medicaid_no: medicaidNumberModel.value,
              insuranceNo: othersNumberModel.value,
              contact: {
                name: contactFullnameModel.value,
                email: contactEmailAddressModel.value,
                phoneNumber: contactCellPhoneModel.value,
              },
            }
          }
        })
      }
  
   
  return (
    <FormWrapper>
        <div className={styles.form_content}>
            <div className={styles.row}>
                <InputField
                    type={medicareModel.type}
                    placeholder="Medicare"
                    value={medicareModel.value}
                    error={medicareModel.error}
                    onInput={(inputValue: string) =>
                    setInput(inputValue, medicareModel, setMedicareModel)
                    }
                />

                <InputField
                    type={medicareNumberModel.type}
                    placeholder="Medicare ID Number"
                    value={medicareNumberModel.value}
                    error={medicareNumberModel.error}
                    onInput={(inputValue: string) =>
                    setInput(inputValue, medicareNumberModel, setMedicareNumberModel)
                    }
                />
            </div>
            <div className={styles.row}>

                {/* <InputField
                    type={medicaidModel.type}
                    placeholder="Medicaid"
                    value={medicaidModel.value}
                    error={medicareModel.error}
                    onInput={(inputValue: string) =>
                    setInput(inputValue, medicaidModel, setMedicaidModel)
                    }
                /> */}

                <InputField
                    type={medicareNumberModel.type}
                    placeholder={medicaidNumberModel.placeholder}
                    value={medicaidNumberModel.value}
                    error={medicaidNumberModel.error}
                    onInput={(inputValue: string) =>
                    setInput(inputValue, medicaidNumberModel, setMedicaidNumberModel)
                    }
                />
                <InputField
                    type={othersNumberModel.type}
                    placeholder={othersNumberModel.placeholder}
                    value={othersNumberModel.value}
                    error={othersNumberModel.error}
                    onInput={(inputValue: string) =>
                        setInput(inputValue, othersNumberModel, setOthersNumberModel)
                    }
                />
            </div>
            <div className={styles.row}>
            {/* <InputField
                type={othersModel.type}
                placeholder="Others"
                value={othersModel.value}
                error={othersModel.error}
                onInput={(inputValue: string) =>
                    setInput(inputValue, othersModel, setOthersModel)
                }
            />  */}


            
            </div>
        
            <div className={styles.row_header}>
            Contact information (a guardian or relative)
            </div> 
            <div className={styles.row}>
            <InputField
                type={contactFullnameModel.type}
                label={contactFullnameModel.label}
                placeholder={contactFullnameModel.placeholder}
                value={contactFullnameModel.value}
                error={contactFullnameModel.error}
                onInput={(inputValue: string) =>
                    setInput(
                        inputValue,
                        contactFullnameModel,
                        setContactFullnameModel
                    )
                }
            />

            <InputField
                type={contactEmailAddressModel.type}
                label={contactEmailAddressModel.label}
                placeholder={contactEmailAddressModel.placeholder}
                value={contactEmailAddressModel.value}
                error={contactEmailAddressModel.error}
                onInput={(inputValue: string) =>
                setInput(
                    inputValue,
                    contactEmailAddressModel,
                    setContactEmailAddressModel
                )
                }
            />

            <InputField
                type={contactCellPhoneModel.type}
                label={contactCellPhoneModel.label}
                placeholder={contactCellPhoneModel.placeholder}
                value={contactCellPhoneModel.value}
                error={contactCellPhoneModel.error}
                onInput={(inputValue: string) =>
                setInput(
                    inputValue,
                    contactCellPhoneModel,
                    setContactCellPhoneModel
                )
                }
            />
            </div> 
        </div>
    </FormWrapper>
  )
}

export default IndividualInsuranceForm