import styles from "./clockinOutmodal.module.css";
import { useState } from 'react'
import ModalContainer from 'src/components/Modal/ModalContainer'
import TextField from "src/components/FormComponents/TextField";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useNavigate } from "react-router-dom";
import Clock from '../../../assets/images/clock.png'

type ClockinModalProps = {
    title: string;
    logTime: Date;
    label: string;
}

    
const formatShiftMessage = (logTime: Date): string => {    
    const optionsTime = { hour12: true, hour: 'numeric', minute: 'numeric' };
    const optionsDate = { month: 'numeric', day: 'numeric', year: 'numeric' };

    const formattedLoginTime = logTime?.toLocaleTimeString(undefined, optionsTime as Intl.DateTimeFormatOptions);
    
    // Calculate end time as 24 hours from the start time
    const endTime = new Date(logTime.getTime() + 24 * 60 * 60 * 1000);
    const formattedEndTime = endTime.toLocaleTimeString(undefined, optionsTime as Intl.DateTimeFormatOptions);
    const formattedEndDate = endTime.toLocaleDateString(undefined, optionsDate as Intl.DateTimeFormatOptions);

    return `${formattedLoginTime} - ${formattedEndTime} ${formattedEndDate}`;
};

  

const ClockInOutModal = ({title, logTime, label}: ClockinModalProps) => {
    const navigate = useNavigate();
    const [clockinNote, setClockinNote] = useState<formFieldType>({
        type: "text",
        label: "Please leave a note iif you clocked in 7 minutes earlier",
        placeholder: "",
        value:'',
        error: "",
        validated: false
    })

    const [providerRole, setProviderRole] = useState<DropDownFormData>({
        name: "provider-role",
        placeholder: "",
        options: [           
            {
                id:'1',
                label:'Administrator',
                value:'admin'
            },
            {
                id:'2',
                label:'Staff',
                value:'staff'
            },            
        ],
        selected: false,
        selectedOptionIndex: 0,
        error: ""
    })


    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;

        validateModel(model);
        setModel({...model})

    }

    function validateModel(model:formFieldType) {
        if(!model.value) {
            model.error = `${model.label} field cannot be empty`
            model.validated = false;
            return;
        }

        model.error = ''
        model.validated = true;
        return;
    }

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;
        model.validated = true;                    

        setModel({ ...model });
    }

    async function submitRole(){
        if(label === "Clock In"){
            navigate({pathname: '/dashboard'})
        }else if(label === "Clock Out"){
            navigate({pathname: "/"})
        }
    }
 

  return (
    <ModalContainer>
        <div className={styles.clockin_modal}>
            <div className={styles.header}>
                <img src={Clock} className={styles.modal_image} />
                <div className={styles.title}>{title ? title : "August Williams"}</div>
                <div className={styles.subTitle}>Please clock in to begin your shift</div>
                <div className={styles.shiftTime}>{formatShiftMessage(logTime)}</div>
          
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "8rem",
                marginBottom: "0.5rem"
            }}>

                {/* dropdown */}
                <DropDownField
                    placeholder="Select Provider role"
                    options={providerRole.options}
                    selected={providerRole.selected} 
                    selectedOptionIndex={providerRole.selectedOptionIndex}
                    error={providerRole.error} 
                    onSelect={(optionIndex: number) => selectOption(optionIndex, providerRole, setProviderRole)} 
                    customStyles={{
                        display: "flex",
                        justifyContent: "center",
                        width: "50%",
                    }}               
                />
            </div>

            {/* Text area */}
            <div className={styles.modal_text_area}>
                <p className={styles.earlierText}>If you are resuming 7 minutes earlier, comment below </p>
                <TextField 
                    error={clockinNote.error}
                    onInput={(value: string) => setInput(value, clockinNote, setClockinNote)}
                    width="50%" 
                    extraStyles={{
                        textAlign: "center"
                    }}                                      
                />
            </div>
            {/* button */}
            <div className={styles.buttons}>
                <PrimaryTextButton                    
                    width={"60%"}
                    label={label}
                    clickAction={() => submitRole()}
                    customStyles={{
                        backgroundColor: `${label === "Clock In" ? "Green" : "Red"}` ,
                        marginTop: "2rem",
                        marginBottom: "2rem",
                    }}
                    // disabled={}
                />
            </div>
        </div>
    </ModalContainer>
  )
}

export default ClockInOutModal