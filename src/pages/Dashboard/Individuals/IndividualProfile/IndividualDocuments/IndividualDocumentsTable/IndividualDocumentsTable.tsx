import Table from "src/components/Table"
import styles from "./individualdocumentstable.module.css"
import { useEffect, useState } from "react";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import { staffsDocumentsListType } from "src/features/staff/utils/formatStaffDocuments";
import sortByDate from "src/utils/sortByDate";
import { useStaffValue } from "src/features/staff/state";
import DownloadIndividualDocButton from "./DownloadIndividualDocButton/DownloadIndividualDocButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";

export default function IndividualDocumentsTable({
    currentPage,
    totalPages,
    goToPage,
    documents,
    errorMessage

}:{documents:staffsDocumentsListType[] ,currentPage:number, totalPages:number, errorMessage:string, goToPage:(pageNumber:number)=> void}) {

    const staffState = useStaffValue();

    const [isLoading, setIsLoading] = useState(false);

    const [tableBody, setTableBody] = useState<JSX.Element[][]|object[][]>([]);
    const tableHead = [
        '',
        'Date added',
        'Type/Description',
        'File type',
        'Document',
        'Delete Document'
    ]
// function DeleteDocument(){

// }
    useEffect(()=> {
        setIsLoading(true)
        sortByDate(documents)
        .then((result)=> {
            const newTransactions = formatTransactionsTable(result);
            setTableBody(newTransactions)
            setIsLoading(false)
        })
        .catch((error)=> {
            console.log(error)
        })
    }, [documents, staffState.documents])

    function formatTransactionsTable (documents:staffsDocumentsListType[]) {
        return documents.map((document, index:number)=> {
            return  [
                {
                    rowKey: document.id,
                    actionEvent: 'action_button_click',
                    actionButtonPosition: 5
                },
                <div className={styles.serial_number}>{index + 1}.</div>,
                <div className={styles.doc_date}>{document.docDate}</div>,
                <div>{document.docTitle}</div>,
                <div>{document.docType}</div>,
                <div className={styles.button}>
                    <DownloadIndividualDocButton 
                        fileName={document.docFileName}
                        fileLink={document.docFileLink}
                    />
                </div>,
                <div> 
                    <PrimaryTextButton
                        label={'Delete'}
                        width={'100px'}
                        isLoading={false}
                        backgroundColor={"var(--red-accent-100)"}
                        labelColor={"white"}
                        clickAction={()=> ({})}
                        disabled={false}
                    />
                </div>
            ]
        });
    }

    const paginateAction = (pageNumber:string|number)=> {
        setIsLoading(true);
        goToPage(parseInt(pageNumber.toString()))
    }

    return (
        <div className={styles.staff_list_table}>
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