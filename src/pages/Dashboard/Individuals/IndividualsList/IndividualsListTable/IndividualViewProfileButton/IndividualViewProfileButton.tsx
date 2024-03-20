import { useNavigate } from "react-router-dom";
// import NoBackgroundButton from "src/components/Buttons/NoBackgroundButton/NoBackgroundButton";

export default function IndividualViewProfileButton({
  individualId,
}: {
  individualId: number;
}) {
  const navigate = useNavigate();

  return (
    <button
      className="bg-[#16ADF5] text-white font-semibold p-1 text-xs rounded-sm"
      onClick={() => navigate({ pathname: `${individualId}` })}
    >
      View profile
    </button>
  );
}
