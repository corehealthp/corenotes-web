import { Link } from "react-router-dom";
// import styles from "./individualservicecard.module.css";
import { useIndividualStateValue } from "src/features/Individual/state";

interface IIndividualServiceCardProps {
  title: string;
  refName: string;
  category: string;
  frequency: string;
  time: string;
}

export default function IndividualServiceCard({
  title,
  refName,
  category,
  frequency,
  time,
}: IIndividualServiceCardProps) {
  const individualState = useIndividualStateValue();

  return (
    
    <div className="border-l-2 rounded border-blue-400 p-2 shadow-lg">
      <div className="w-9/12">
      <div className="font-bold text-lg"> {title.toUpperCase()} </div>
      <div className="flex items-center justify-between">
        <label htmlFor="Category" className="font-semibold text-sm">Category:</label>
        <p>{category} </p>
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="Category" className="font-semibold text-sm">Frequency:</label>
        <p>{frequency} </p>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="Category" className="font-semibold text-sm">Start Date:</label>
        <p>{time} </p>
      </div>
      
      {individualState.servicesWithTemplate.includes(refName) ? (
        <Link to={`${refName}`}> open </Link>
      ) : null}
      </div>
      
    </div>
  );
}
