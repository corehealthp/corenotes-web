import ModalContainer from "src/components/Modal/ModalContainer"
import styles from "./addcompartmentmodal.module.css"
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg"
import InputField from "src/components/FormComponents/InputField"
import { useState } from "react"
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types"
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton"
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton"
import { newCompartmentData, postCompartment } from "src/features/compartment/action"
import { useCompartmentState } from "src/features/compartment/state"
import ImageUploader from "src/components/ImageUploader"
import { ImageUploaderFormType } from "src/components/ImageUploader/ImageUploader"
import JSONToFormData from "src/utils/JSONToFormData"
import SizedBox from "src/components/SizedBox"
import displayFormData from "src/utils/displayFormData"

export default function AddCompartmentModal({ close }:{close:()=> void}) {

    const [compartmentState, setCompartmentState] = useCompartmentState();

    const [compartmentTitle, setCompartmentTitle] = useState<formFieldType>({
        type:'text',
        placeholder:'Enter name of compartment',
        value:'',
        error:'',
        validated:false
    })

    const [compartmentImage, setCompartmentImage] = useState<ImageUploaderFormType>()

    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;
        validateModel(model)
        setModel({...model});
    }

    function setImage(imageFile:Blob|MediaSource) {
        setCompartmentImage(state => {
            return {
                ...state!,
                image: imageFile
            }
        })
    }

    function validateModel(updatedModel:formFieldType) {
        if(!updatedModel.value) {
            updatedModel.error = "Field cannot be empty";
            updatedModel.validated = false;
            return;
        }

        const isMatch = compartmentState.compartmentsList.filter((compartment) => compartment.title === updatedModel.value.toLowerCase())[0]?.title;

        if(isMatch) {
            updatedModel.error = "Compartment already exist";
            updatedModel.validated = false;
            return;
        }

        updatedModel.error = "";
        updatedModel.validated = true;
        return;
    }

    function submitAddCompartment() {
        const payload:newCompartmentData = {
            title: compartmentTitle.value,
            compartmentImage: compartmentImage?.image
        }
        console.log(payload)
        setCompartmentState(state => ({
            ...state,
            status: 'LOADING', 
            error: false,
            message: ""
        }))

        JSONToFormData(payload)
        .then((payloadInFormData)=> {
            displayFormData(payloadInFormData);
            postCompartment(payloadInFormData)
            .then((response)=> {
                setCompartmentState(state => ({
                    ...state,
                    status: 'SUCCESS', 
                    error: false,
                    message: "Compartment successfully created",
                    compartmentsList: response.data.compartments,
                    currentListPage: response.data.currentListPage,
                    totalListPages: response.data.totalListPages,
                }))
            })
            .catch((error)=> {
                setCompartmentState(state => ({
                    ...state,
                    status: 'SUCCESS', 
                    error: true,
                    message: error.message || "There was an error creating compartment"
                }))
            })
        })
    }

    return (
        <ModalContainer close={()=> close()}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <div className={styles.title}>Compartments</div>
                    <IconCancelCircle />
                </div>

                <div className={styles.body}>
                    <ImageUploader 
                        extraStyle={""}
                        position={""} 
                        label={"Compartment image"} 
                        error={""} 
                        saveImage={(imageFile:File)=> setImage(imageFile)} 
                        deleteImage={()=> ({})} 
                    />

                    <SizedBox height="50px" />

                    <InputField
                        placeholder={compartmentTitle.placeholder}
                        value={compartmentTitle.value}
                        error={compartmentTitle.error}
                        onInput={(value)=> setInput(value, compartmentTitle, setCompartmentTitle)}
                    />
                </div>

                <div className={styles.buttons}>
                    <FadedBackgroundButton 
                        width="200px"
                        label="Cancel"
                        labelColor={"var(--blue-accent-200)"}
                        backgroundColor={"var(--blue-accent-faded-100)"}
                        action={() => ({})}
                    />
                    
                    <PrimaryTextButton
                        width="200px"
                        label="Create compartment"
                        clickAction={()=> submitAddCompartment()}
                        disabled={!compartmentTitle.validated}
                        isLoading={compartmentState.status === 'LOADING'}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}