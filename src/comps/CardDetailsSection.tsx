import { TCard } from "../types/TCard";
import UsersProps from "../types/UsersProps";
import CardDetail from "./CardDetail";

const DetailsSection = ({
  selectedRow,
  findUserForCard,
}: {
  selectedRow: TCard;
  findUserForCard: (card: TCard) => UsersProps | null;
  deleteCard: (card: TCard) => void;
  setEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editVisible: boolean;
}) => {
  const matchingUser = findUserForCard(selectedRow);

  return (
    <>
      <h2 className="detailsSectionTitle">Card Details</h2>

      <div className="details">
        <CardDetail field="Title" value={selectedRow.title} />
        <CardDetail field="Subtitle" value={selectedRow.subtitle} />
        <CardDetail field="Email" value={matchingUser?.email} />
        <CardDetail field="Phone" value={selectedRow.phone} />
        <CardDetail
          field="Date Created"
          value={
            selectedRow.createdAt
              ? new Date(selectedRow.createdAt).toLocaleDateString("he-IL")
              : "N/A"
          }
        />
      </div>
    </>
  );
};
export default DetailsSection;
