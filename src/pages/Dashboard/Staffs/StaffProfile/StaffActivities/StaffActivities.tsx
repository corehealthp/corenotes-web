import DateRangeField from "src/components/FormComponents/DateRangeField"
import StaffProfileHeader from "../StaffProfileHeader"
import styles from "./staffactivities.module.css"
import { useEffect, useState } from "react"
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield"
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types"
import capitalize from "src/utils/capitalize"
import StaffActivitiesTable from "./StaffActivitiesTable"
import SizedBox from "src/components/SizedBox"
import { useFetchStaffActivities } from "src/features/staff/selector"
import { useParams } from "react-router-dom"
import { useStaffState } from "src/features/staff/state"
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton"

export default function StaffActivities() {
    
    const { id } = useParams();

    const [staffState, setStaffState] = useStaffState()

    const staffActivitiesResponse = useFetchStaffActivities({id: id!, pageNumber:staffState.currentActivitiesPage!, activityType: staffState.activityType?.toUpperCase() ?? 'MEETING'})

    useEffect(()=> {
        if(!staffActivitiesResponse.error) {
            setStaffState(state => {
                return {
                    ...state,
                    activities: [...staffActivitiesResponse.activities],
                    currentActivitiesPage: staffActivitiesResponse.currentPage,
                    totalPages: staffActivitiesResponse.totalPages,
                    error: false,
                    status: 'SUCCESS',
                    message: '',
                }
            })

        } else {
            setStaffState(state => {
                return {
                    ...state,
                    error: true,
                    status: 'FAILED',
                    message: 'There was an error fetching staff activities',
                    activities: staffActivitiesResponse.activities,
                    currentActivitiesPage: staffActivitiesResponse.currentPage,
                    totalPages: staffActivitiesResponse.totalPages,
                }
            })

        }

    }, [setStaffState, staffActivitiesResponse])

    const [activityTypeModel, setActivityTypeModel] = useState<DropDownFormData>({
        label:'',
        name:'activity-type',
        options: [
            {
                id:'1',
                label:'Meeting activity',
                value:'MEETING'
            },
            {
                id:'2',
                label:'Training activity',
                value:'TRAINING'
            }
        ],
        value: {
            id:'1',
            label:'Meeting activity',
            value:'meeting'
        },
        selected: true,
        selectedOptionIndex: 0,
        error:'',
    })

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selectedOptionIndex = optionIndex;
        model.selected = true;

        if(model.name === 'activity-type') {
            setStaffState(state=> {
                return {
                    ...state,
                    activityType: model.value?.value
                }
            })
        }

        setModel({...model})
    }

    return (
        <div className={styles.staff_activities}>
            <StaffProfileHeader />

            <div className={styles.body}>
                <div className={styles.heading}>
                    {capitalize(activityTypeModel.value?.value ?? '')} activity
                </div>

                <div className={styles.activity_header}>
                    <DateRangeField 
                        onSelect={()=>  ({})}  
                    />

                    <DropDownField 
                        extraStyle={styles.dropdown_field}
                        width="200px"
                        height="45px"
                        options={activityTypeModel.options} 
                        error={activityTypeModel.error} 
                        selected={activityTypeModel.selected} 
                        selectedOptionIndex={activityTypeModel.selectedOptionIndex}       
                        onSelect={(optionIndex:number)=> selectOption(optionIndex, activityTypeModel, setActivityTypeModel)}
                    />
                </div>
                <br></br>
                <PrimaryTextButton
                    label={"Create Activity"}
                    isLoading={false}
                    disabled={false}
                    width="200px"
                    clickAction={() => ({})}
                />
                <SizedBox height="50px" />
                
                <StaffActivitiesTable
                    activitiesList={staffState.activities!}
                    currentPage={staffState.currentActivitiesPage!}
                    totalPages={staffState.totalActivitiesPage!}
                    errorMessage={"There are no activities to show"}
                    goToPage={(pageNumber: number)=> console.log(pageNumber)}
                />
            </div>
        </div>
    )
}