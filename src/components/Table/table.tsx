import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./table.module.css";
import DataLoadingError from "../DataLoadingError";
import PrimaryTextButton from "../Buttons/PrimaryTextButton";
import { ReactNode } from "react";

export default function Table({
  head,
  body,
  action,
  extraStyle,
  currentPage,
  totalPages,
  goToPage,
  emptyListMessage,
}: {
  head?:ReactNode[];
  body: any[][];
  currentPage?: number;
  totalPages?: number;
  goToPage?: (pageNumber: string | number) => void;
  action?: (key: string) => void;
  extraStyle?: any;
  enableSearch?: boolean;
  emptyListMessage: string;
}) {
  const navigate = useNavigate();
  const paginationArray = [...Array(totalPages)];

  return (
    <div className={`${styles.container} ${extraStyle}`}>
      {body.length ? (
        <div>
          <table className={styles.table_wrapper}>
              {
								head?.length 
								?	<thead className={styles.table_head}>
										<tr>
											{
												head?.map((cell, index) => {
													if (cell !== head[index - 1]) {
														return (
															<th
																key={index}
																colSpan={cell === head[index + 1] ? 2 : 1}
																children={cell}
															/>
														);
													}
													return null;
												})
											}
										</tr>
									</thead>
								: null
							}

            <tbody className={styles.table_body}>
              {body.map((row, index) => {
                return (
                  <tr
                    key={row[0].rowKey ?? index}
                    className={styles.table_row}
                    style={{
                      cursor:
                        row[0].actionEvent === "row_click" ? "pointer" : "auto",
                    }}
                    onClick={() => {
                      if (row[0].actionEvent === "row_click") {
                        if (row[0].target === "new_page")
                          navigate({ pathname: row[0].rowKey });
                        if (row[0].target === "show_modal")
                          action?.(row[0].rowKey);
                      }
                    }}
                  >
                    {row.map((cell, secondIndex) => {
                      if (secondIndex !== 0) {
                        return (
                          <td key={row[0].rowKey + secondIndex ?? secondIndex}>
                            {" "}
                            {cell}{" "}
                          </td>
                        );
                      }
                      return null;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {totalPages ? (
							<div className={styles.table_pagination}>
								<FaAngleLeft
									className={`${styles.page_button} ${currentPage! > 1 ? null : styles.inactive}`}
									onClick={() =>currentPage! > 1 ? goToPage?.(--currentPage!) : ({})}
								/>

								<div className={styles.page_numbers}>
									{paginationArray.map((_, index) => {
										const currentPageNumber = index + 1;

										let pageNumber:string|number|null = currentPageNumber;

										if (currentPageNumber > currentPage! + 3 && currentPageNumber !== totalPages && currentPageNumber !== 1) pageNumber = "...";
										if (currentPage! > currentPageNumber && currentPageNumber! < totalPages - 3 && currentPageNumber !== 1) pageNumber = "...";

										paginationArray[index] = pageNumber;

										return pageNumber && paginationArray[index] !== paginationArray[index - 1] 
										?	<div
												key={"page" + currentPageNumber}
												className={`
													${styles.page_number}
													${index+1 === currentPage ? styles.current_page : null}
												`}
												style={parseInt(pageNumber!.toString())
													? { cursor: "pointer" }
													: { cursor: "default" }
												}
												onClick={() => parseInt(pageNumber!.toString()) 
													? goToPage?.(pageNumber!) : ({})
												}>
												{pageNumber}
											</div>
										: 	null;
									})}
								</div>

								<FaAngleRight
									className={`${styles.page_button} ${
										currentPage! < totalPages! ? null : styles.inactive
									}`}
									onClick={() =>
										currentPage! < totalPages! ? goToPage?.(++currentPage!) : {}
									}
								/>
							</div>
						) : null}

						{totalPages ? (
							<div className={styles.mobile_pagination}>
								<PrimaryTextButton
									label="Prev"
									disabled={currentPage! === 1}
									clickAction={() => currentPage! > 1 ? goToPage?.(--currentPage!) : {}}
								/>

								<PrimaryTextButton
									label="Next"
									disabled={currentPage! === totalPages!}
									clickAction={() =>
										currentPage! < totalPages! ? goToPage?.(++currentPage!) : {}
									}
								/>
							</div>
						) : null}
         
        </div>
      ) : (
        <div className={styles.empty_table_message}>
          <DataLoadingError message={emptyListMessage} />
        </div>
      )}
    </div>
  );
}
