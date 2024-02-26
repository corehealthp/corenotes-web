import styles from "./addaccordiongroup.module.css"
import IndividualAccordionItem, { HiddenForm } from "./IndividualAccordionItem";

interface AccordionProps {
    hiddenForms: HiddenForm[];
}

const AddAccordionGroup: React.FC<AccordionProps> = ({ hiddenForms }) => {
    return (
        <div className={styles.accordion}>
            {hiddenForms.map((hiddenForm) => (
                <IndividualAccordionItem key={hiddenForm.label} hiddenForm={hiddenForm} />
            ))}
        </div>
    );
};

export default AddAccordionGroup