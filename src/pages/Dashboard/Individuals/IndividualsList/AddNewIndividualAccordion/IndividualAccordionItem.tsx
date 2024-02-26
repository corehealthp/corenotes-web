import styles from "./individualaccordionitem.module.css"
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa';

export interface HiddenForm {
  index: number;
  label: string;
  value: React.ReactNode; 
}
interface AccordionItemProps {
  hiddenForm: HiddenForm
}

const IndividualAccordionItem:React.FC<AccordionItemProps> = ({hiddenForm}) => {
  const [visibility, setVisibility] = useState<boolean>(false);

    const handleToggleVisibility = () => {
        setVisibility((prevVisibility) => !prevVisibility);
    };

    const activeStatus = (visibility || hiddenForm.index === 1 )? styles.active : '';
    

    return (
        <div>
            <button className={styles.accordion__button} onClick={handleToggleVisibility}>
              <div className={styles.heading}>
                <div className={styles.number_circle}>{hiddenForm.index}</div>
                {hiddenForm.label}
              </div>
                <span>{visibility ? <FaMinus/> :  <FaPlus />}</span>
            </button>
            <p className={`${styles.accordion__content} ${activeStatus}`}>{hiddenForm.value}</p>
        </div>
    );
}

export default IndividualAccordionItem