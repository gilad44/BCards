import { TCard } from "../types/TCard";
import UsersProps from "../types/UsersProps";

const CrmTable = ({
  currentCards,
  findUserForCard,
  setSelectedRow,
}: {
  currentCards: TCard[];
  findUserForCard: (card: TCard) => UsersProps | null;
  setSelectedRow: React.Dispatch<React.SetStateAction<TCard | null>>;
}) => {
  return (
    <table className="w-4/5 border-spacing-0 max-md:w-fluid-xs">
      <thead>
        <tr className="h-fluid-2xs">
          <th className="tableHead ">Title</th>
          <th className="tableHead ">Email</th>
          <th className="tableHead">Phone</th>
          <th className="tableHead">Date Added</th>
        </tr>
      </thead>
      <tbody>
        {currentCards.map((card, index) => {
          const user = findUserForCard(card);
          return (
            <tr
              onClick={() => setSelectedRow(card)}
              key={index}
              className={`tableRow ${
                index % 2 === 0
                  ? "bg-blue-300 dark:bg-blue-400"
                  : "bg-white dark:bg-gray-600 dark:text-gray-300"
              }`}
            >
              <td className="h-fluid-sm px-fluid-md text-fluid-sm max-md:w-full max-md:text-[2.5vmax]">
                {card.title}
              </td>
              <td className="px-fluid-md text-fluid-sm max-md:w-full max-md:text-[2.5vmax]">
                {user?.email || "N/A"}
              </td>
              <td className="px-fluid-md text-fluid-sm max-md:w-full max-md:text-[2.5vmax]">
                {user?.phone || "N/A"}
              </td>
              <td className="px-fluid-md text-fluid-sm max-md:w-full max-md:text-[2.5vmax]">
                {new Date(card.createdAt || "N/A").toLocaleDateString(
                  "he-IL",
                ) || "N/A"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default CrmTable;
