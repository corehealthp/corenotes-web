
import ServicesListTable from "./ServicesListTable"
import styles from "./serviceslist.module.css"
// import { useServicesState } from "src/features/service/state";
import { useEffect, useState } from "react";
// import { useFetchServicesList } from "src/features/service/selector";
import AddServiceModal from "../AddServiceModal/AddServiceModal";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import { getFetch } from "src/lib/apiCalls";

export default function ServicesList() {

    const [servicesState, setServicesState] = useState();
    // const [servicesState, setServicesState] = useServicesState();

    // const fetchServicesListReponse = useFetchServicesList(servicesState.currentListPage);

    // console.log("fetchServicesListReponse",fetchServicesListReponse)
    // useEffect(()=> {
    //     setServicesState(state => ({
    //         ...state,
    //         servicesList: fetchServicesListReponse.list.services,
    //         currentListPage: fetchServicesListReponse.list.currentPage,
    //         totalListPages: fetchServicesListReponse.list.totalPages,
    //     }))
    // }, [fetchServicesListReponse, setServicesState])
    

    const [createServicesModalVisibility, toggleCreateServicesModalVisibility] = useState(false)


    useEffect(() => {
        getFetch(`/services/${1}`).then((response: any) => {
          const serviceResponse = response?.data;
          if (serviceResponse) {
            setServicesState(serviceResponse);
          }
        });
      }, []);

      console.log("servicesState",servicesState)
    
    return (
        <div className={styles.services_list}>
            <div className={styles.heading}>
                <div className={styles.title}>All Services</div>

                <AddNewNoBackgroundIconButton 
                    label="Create Service"
                    action={()=> toggleCreateServicesModalVisibility(true)}
                />
            </div>

            <div className={styles.services_table}>
                <ServicesListTable
                    services={servicesState}
                    // currentPage={servicesState.currentListPage} 
                    // totalPages={servicesState.totalListPages} 
                    errorMessage={"There are no services to show"} 
                    goToPage={()=> null}                    
                />
            </div>

            {
                createServicesModalVisibility
                ?   <AddServiceModal 
                        close={()=> toggleCreateServicesModalVisibility(false)} 
                    />
                :   null
            }
        </div>
    )
}