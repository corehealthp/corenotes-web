import { useNavigate } from "react-router-dom";
// import NoBackgroundButton from "src/components/Buttons/NoBackgroundButton/NoBackgroundButton";

export default function StaffViewProfileButton({ id }: { id: string }) {
  const navigate = useNavigate();

  return (
    <button
      className="bg-[#16ADF5] text-white font-semibold p-1 text-xs rounded-sm"
      onClick={() => navigate({ pathname: `${id}` })}
    >
      View profile
    </button>
  );
}
