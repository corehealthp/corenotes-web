import { IndividualListItemType } from "src/features/Individual/types";
import styles from "./medicationserviceindividualsModal.module.css";
import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import UserImage from "src/components/ImageComponent/UserImage";
import DataLoadingError from "src/components/DataLoadingError";

export default function MedicationServiceIndividualsModal({ 
    individuals,
    closeModal
}:{ 
    individuals:Array<IndividualListItemType>;
    currentPage:number;
    totalPages:number;
    message:string;
    closeModal:()=> void;
}) {
    
    return (
        <ModalContainer>
            <div className={styles.medication_services_individuals_modal}>
                <div className={styles.header}>
                    <div className={styles.titiel}>Individuals taking this medication </div>
                    <IconCancelCircle onClick={()=> closeModal()}/>
                </div>

                <div className={styles.body}>
                    {
                        individuals.length
                        ?   individuals.map(individual => {
                                return  <div className={styles.medication_individual}>
                                            <UserImage 
                                                imageUrl={individual.profileImage} 
                                                fullname={individual.firstname}
                                                size={"60px"}
                                            />
                                            <div className={styles.full_name}>{ individual.firstname + " " + individual.lastname }</div>
                                        </div>
                            })
                        :   <DataLoadingError message={"No individuals under this service are taking this medication"} />
                    }
                </div>
            </div>
        </ModalContainer>
    )
}