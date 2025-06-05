import axios from "axios";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cards from "../comps/Cards";
import MyPagination from "../comps/MyPagination";
import { paginationTheme } from "../data/themes";
import useCardPagination from "../Hooks/useCardPagination";
import type { RootState } from "../store/store";
import CreateCard from "./CreateCard";

const MyCards = () => {
  const keyword = useSelector(
    (state: RootState) => state.searchSlice.searchWord,
  );
  const [createCardVisible, setCreateCardVisible] = useState(false);
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    itemsToDisplay,
    currentPage,
    totalPages,
    onPageChange,
    isMobile,
    loadMore,
  } = useCardPagination({
    allCards: cards,
    searchKeyword: keyword,
    resetOn: [cards],
  });

  const handleCreateCard = () => navigate("/create-card");

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to view your cards");
          navigate("/login");
          return;
        }

        axios.defaults.headers.common["x-auth-token"] = token;

        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
        );

        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
        toast.error("Failed to load your cards");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCards();
  }, [navigate]);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, loadMore]);
  return (
    <>
      <div className="myCardsMain">
        <header className="myCardsHeader">
          <h1 className="myCardsTitle">My Cards</h1>
          <p className="myCardsDescription">
            Create, edit or delete your cards
          </p>
        </header>
        <section className="myCardsSection">
          {cards.length === 0 ? (
            <div className="noCards">
              <p className="text-xl">You don't have any cards yet</p>
              <Button
                color="blue"
                className="flex items-center gap-2"
                onClick={handleCreateCard}
              >
                <MdAddCircleOutline className="text-xl" />
                Create Your First Card
              </Button>
            </div>
          ) : (
            <>
              <Cards cards={itemsToDisplay} />
              <div
                className={`createCard  ${createCardVisible ? "z-50 opacity-100" : "z-0 opacity-0"}`}
              >
                <CreateCard />
              </div>
              <MdAddCircleOutline
                className="createCardButton"
                onClick={() => setCreateCardVisible(!createCardVisible)}
              />
            </>
          )}
        </section>
        {!isMobile && totalPages > 1 && (
          <div className="paginationDiv">
            <MyPagination
              theme={paginationTheme}
              layout="pagination"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons={true}
              className="max-xs:hidden"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MyCards;
