import Table from "src/components/Table";
import styles from "./individualslisttable.module.css";
import { useEffect, useState } from "react";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import sortByDate from "src/utils/sortByDate";
import UserImage from "src/components/ImageComponent/UserImage";
import { IndividualListItemType } from "src/features/Individual/types";
import IndividualViewProfileButton from "./IndividualViewProfileButton";

export default function IndividualsListTable({
  currentPage,
  totalPages,
  goToPage,
  individuals,
  errorMessage,
}: {
  individuals: IndividualListItemType[];
  currentPage: number;
  totalPages: number;
  errorMessage: string;
  goToPage: (pageNumber: number) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [tableBody, setTableBody] = useState<JSX.Element[][] | object[][]>([]);
  const tableHead = [
    <div className={styles.user_name_cell_head}>Name</div>,
    <div className={styles.age_cell_head}>Age</div>,
    <div className={styles.gender_cell_head}>Gender</div>,
    <div className={styles.compartment_cell_head}>Compartment</div>,
    <div className={styles.medicaid_number_cell_head}>Medicaid number</div>,
    <div className={styles.table_action_cell_head}></div>,
  ]

  useEffect(() => {
    setIsLoading(true);

    sortByDate(individuals)
      .then((result) => {
        const newTransactions = formatTransactionsTable(result);
        setTableBody(newTransactions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [individuals]);

    function formatTransactionsTable (individuals:IndividualListItemType[]) {
        return individuals.map((individual)=> {
            return  [
                {
                    rowKey: individual.id,
                    actionEvent: 'action_button_click',
                    actionButtonPosition: 6
                },
                <div className={styles.user_name_cell}>
                  <UserImage 
                      imageUrl={individual.profileImage} 
                      fullname={individual?.firstname} 
                      size="50px"
                  />
                  <div className={styles.fullname}>{individual.firstname + ", " + individual.lastname}</div>
                </div>,
                <div className={styles.age_cell}>
                    <span>{individual.age}</span>
                    <span>yrs</span>
                </div>,
                <div className={styles.gender_cell}>{individual.gender}</div>,
                <div className={styles.compartment_cell}>{individual.compartment}</div>,
                <div className={styles.medicaid_number_cell}>{individual.medicaidNumber}</div>,
                <div className={styles.table_action_cell}>
                    <IndividualViewProfileButton individualId={individual.individualId} />
                </div>
            ]
        });
    }

  const paginateAction = (pageNumber: string | number) => {
    setIsLoading(true);
    goToPage(parseInt(pageNumber.toString()));
  };

  return (
    <div className={styles.staff_list_table}>
      {isLoading ? (
        <ComponentLoader />
      ) : (
        <Table
          head={tableHead}
          body={tableBody}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={(pageNumber: string | number) => paginateAction(pageNumber)}
          extraStyle={styles}
          emptyListMessage={errorMessage}
        />
      )}
    </div>
  );
}
