import type { RootState } from "@react-three/fiber";
import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DetailsSection from "../comps/CardDetailsSection";
import CrmTable from "../comps/CrmTable";
import EditCard from "../comps/EditCard";
import MyPagination from "../comps/Mypagination";
import { buttonTheme, paginationTheme } from "../data/themes";
import useCardPagination from "../Hooks/useCardPagination";
import { TCard } from "../types/TCard";
import UsersProps from "../types/UsersProps";
const Crm = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [selectedRow, setSelectedRow] = useState<TCard | null>(null);
  const [cardsInfo, setcardsInfo] = useState<TCard[]>([]);
  const keyword = useSelector(
    (state: RootState) => state.searchSlice.searchWord,
  );
  const {
    itemsToDisplay,
    currentPage,
    totalPages,
    onPageChange,
    isMobile,
    loadMore,
  } = useCardPagination({
    allCards: cardsInfo,
    searchKeyword: keyword,
    resetOn: [cardsInfo],
  });

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("You need to log in to access this page");
          return;
        }
        axios.defaults.headers.common["x-auth-token"] = token;

        const [users, cards] = await axios.all([
          axios.get(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
          ),

          axios.get(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
          ),
        ]);

        setcardsInfo(cards.data);
        setUsers(users.data);
      } catch (error) {
        toast("Error retrieving info");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);
  const findUserForCard = (card: TCard) => {
    return users.find((user) => user._id === card.user_id) || null;
  };
  const deleteCard = async (card: TCard) => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
      }
      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
      );

      toast.success("Card deleted successfully");
      setcardsInfo((prevCards) => prevCards.filter((c) => c._id !== card._id));
      setSelectedRow(null);
      setEditVisible(false);
    } catch (error) {
      toast.error("Error deleting card");
    }
  };

  return (
    <div className="CrmMainDiv">
      <div className="crmTitleDiv">
        <h1 className="crmTitle">Client Management</h1>
        <h2 className="subtitle">View, edit, or delete cards & users</h2>
      </div>
      <div className="tableDiv">
        <h2 className="tableTitle">Cards/Users</h2>
        {(selectedRow || editVisible) && (
          <>
            <div className="buttons">
              <Button
                theme={buttonTheme}
                className="editButton text-black"
                onClick={() => setEditVisible(!editVisible)}
              >
                <RiFileEditFill />
              </Button>
              <Button
                theme={buttonTheme}
                className="deleteButton text-black"
                onClick={() => {
                  if (selectedRow) {
                    deleteCard(selectedRow);
                  }
                }}
              >
                <MdDeleteForever />
              </Button>
            </div>
          </>
        )}
        {selectedRow &&
          (editVisible ? (
            <div>
              <EditCard
                card={selectedRow}
                onClose={() => setEditVisible(false)}
              />
            </div>
          ) : (
            <DetailsSection
              selectedRow={selectedRow}
              findUserForCard={findUserForCard}
              deleteCard={deleteCard}
              setEditVisible={setEditVisible}
            />
          ))}
        {loading && <Spinner size="xl" />}
        <CrmTable
          currentCards={itemsToDisplay}
          findUserForCard={findUserForCard}
          setSelectedRow={setSelectedRow}
        />
      </div>

      <div className="paginationDiv">
        {window.innerWidth < 640 ? (
          <Button
            theme={buttonTheme}
            onClick={loadMore}
            className="loadMoreButton text-black"
          >
            Load More
          </Button>
        ) : (
          <MyPagination
            theme={paginationTheme}
            layout="pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons={true}
          />
        )}
      </div>
    </div>
  );
};
export default Crm;
