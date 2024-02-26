import ComponentLoader from "src/components/Loaders/ComponentLoader";
import styles from "./staffshiftsscheduletable.module.css";
import Table from "src/components/Table";
import { useEffect, useState } from "react";
import sortByDate from "src/utils/sortByDate";
import { IStaffShift } from "src/features/staff/types";
import formatDate from "src/utils/formatDate";

export default function StaffShiftsScheduleTable({
    shifts,
    currentPage, 
    totalPages,
    goToPage,
    errorMessage

}:{
    shifts:IStaffShift[], 
    currentPage:number, 
    totalPages:number, 
    errorMessage:string, 
    goToPage:(pageNumber:number)=> void
}) {
    const [isLoading, setIsLoading] = useState(false);

    const [tableBody, setTableBody] = useState<JSX.Element[][]|object[][]>([]);
    const tableHead = [
        'Date',
        'Start Time',
        'End Time'
    ]

    useEffect(()=> {
        setIsLoading(true)

        sortByDate(shifts)
        .then((result)=> {
            const newTransactions = formatTransactionsTable(result);
            setTableBody(newTransactions)
            setIsLoading(false)
        })
        .catch((error)=> {
            console.log(error)
        })

    }, [shifts])

    function formatTransactionsTable (shifts:IStaffShift[]) {
        
        return shifts.map((shift)=> {
            return  [
                { rowKey: shift.id },
                <div className={styles.title}>{formatDate(shift.date)}</div>,
                <div className={styles.compartment}>{shift.startTime}</div>,
                <div className={styles.start_date}>{shift.endTime}</div>,
            ]
        });
    }

    const paginateAction = (pageNumber:string|number)=> {
        setIsLoading(true);
        goToPage(parseInt(pageNumber.toString()))
    }



    return (
        <div className={styles.individual_services_list_table}>
            {   
                isLoading
                ?   <ComponentLoader />
                :   <Table 
                        head={tableHead}
                        body={tableBody}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToPage={(pageNumber:string|number)=> paginateAction(pageNumber)}
                        extraStyle={styles}
                        emptyListMessage={errorMessage}
                    />
            }
        </div>
    )
}