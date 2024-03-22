import InputField from "src/components/FormComponents/InputField"
import UserProfileCard from "../UserProfileCard"
import styles from "./pageheader.module.css"
import { useState } from "react"
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types"
import { ReactComponent as IconSearch } from "src/assets/icons/icon-search.svg"

export default function PageHeader() {

    const [searchModel, setSearchModel] = useState<formFieldType>({
        type:'text',
        placeholder:'Search by keyword',
        prefixIcon: <IconSearch />,
        value: '',
        error:'',
        validated: false
    })

    function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType) {
        inputModel.value = value
        validateModel(inputModel)
        setInputModel({...inputModel});
    }

    function validateModel(updatedInputModel:formFieldType) {
        if(!updatedInputModel.value) {
            updatedInputModel.validated = false;
            return
        }

        updatedInputModel.validated = true;
        return
    }

    return (
        <div className="flex p-8 items-center -mb-12">
            <div className={styles.search_bar}>
                <InputField
                    extraInputContainerStyle={styles.input_container}
                    type={searchModel.type}
                    value={searchModel.value} 
                    placeholder={searchModel.placeholder}
                    prefixIcon={searchModel.prefixIcon}
                    error={""}
                    onInput={(value:string)=> setInput(value, searchModel, setSearchModel)}  
                />
            </div>

            <UserProfileCard
                extraStyles={styles.user_profile}
            />
        </div>
    )
}