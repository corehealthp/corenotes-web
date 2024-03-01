import { useIndividualStateValue } from "src/features/Individual/state";
import styles from "./individualhealthinformation.module.css"

export default function IndividualHealthInformationForm() {
    
    const IndividualState = useIndividualStateValue();

    return (
        <div className={styles.individual_health_information}>
            <div className={styles.heading}>Health Information</div>

            <div className={styles.info_section}>
                <div className={styles.section}>
                    <div className={styles.sub_heading}>Diet</div>
                    <div className={styles.list}>
                        {
                            IndividualState?.profile?.healthInformation?.diet?.map((dietItem:any) => (
                                <div key={dietItem} className={styles.diet_item}>{ dietItem  }</div>
                            ))
                        }
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sub_heading}>Allergies</div>
                    <div className={styles.list_group}>
                        <div className={styles.list}>
                            <div className={styles.allergy_type}>Food</div>
                            <div>
                                {
                                    IndividualState?.profile?.healthInformation?.allergies?.food.map((dietItem:any) => (
                                        <div key={dietItem} className={styles.diet_item}>{ dietItem  }</div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.list}>
                            <div className={styles.allergy_type}>Meds</div>
                            <div>
                                {
                                    IndividualState?.profile?.healthInformation?.allergies?.meds.map((dietItem:any) => (
                                        <div key={dietItem} className={styles.diet_item}>{ dietItem  }</div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.list}>
                            <div className={styles.allergy_type}>Others</div>
                            <div>
                                {
                                    IndividualState?.profile?.healthInformation?.allergies?.others.map((allergies:any) => (
                                        <div key={allergies} className={styles.diet_item}>{ allergies  }</div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}