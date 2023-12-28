import Table from "src/components/Table"
import styles from "./staffdocumentstable.module.css"
import { useEffect, useState } from "react";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import { staffsDocumentsListType } from "src/features/staff/utils/formatStaffDocuments";
import DownloadStaffDocButton from "./DownloadStaffDocButton/DownloadStaffDocButton";
import sortByDate from "src/utils/sortByDate";
import { useStaffValue } from "src/features/staff/state";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton/PrimaryTextButton";
import { deleteStaffDocumentAction } from "src/features/staff/actions";

export default function StaffDocumentsTable({
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
    

    useEffect(()=> {
        console.log(staffState.documents.list)
        setIsLoading(true)

        sortByDate(staffState.documents.list)
        .then((result)=> {
            const newTransactions = formatTransactionsTable(result);
            setTableBody(newTransactions)
            setIsLoading(false)
        })
        .catch((error)=> {
            console.log(error)
        })
    }, [documents, staffState.documents.list])


    function deleteStaffDocument(staffId:string, documentId:string) {
		// const payload = {
		// 	staffId,
		// 	documentId
		// };
		

		// setStaffState((state) => ({
		// 	...state,
		// 	status: "LOADING",
		// }));

		deleteStaffDocumentAction(staffId,documentId)
			.then((response) => {
				// setStaffState((state) => ({
				// 	...state,
				// 	status: "SUCCESS",
				// 	// details: response.data.staff,
				// 	message: response.message,
				// 	error: false,
				// }));
                console.log("response",response)
			})
			.catch((error) => {
				// setStaffState((state) => ({
				// 	...state,
				// 	status: "FAILED",
				// 	details: staffInitState.details,
				// 	message: error.message,
				// 	error: false,
				// }));
                console.log("error",error)
                
			});
	}

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
                    <DownloadStaffDocButton 
                        fileName={document.docFileName}
                        fileLink={document.docFileLink}
                    />
                </div>,
                <div> <PrimaryTextButton
                label={'Delete'}
                width={'100px'}
                isLoading={false}
                backgroundColor={"var(--red-accent-100)"}
                labelColor={"white"}
                clickAction={()=> deleteStaffDocument(staffState.details._id,document.id)}
                disabled={false}
            /></div>
                
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