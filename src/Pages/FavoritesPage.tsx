import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyCards from "../comps/Cards";
import MyPagination from "../comps/MyPagination";
import { paginationTheme } from "../data/themes";
import useCardPagination from "../Hooks/useCardPagination";
import useSetCards from "../Hooks/useCards";
import type { RootState } from "../store/store";
import { TCard } from "../types/TCard";

const FavoriteCards = () => {
  const { cards, loading } = useSetCards();
  const [favCards, setFavCards] = useState<TCard[]>([]);
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
    allCards: favCards,
    searchKeyword: keyword,
    resetOn: [favCards],
  });
  const getFavoritesFromStorage = (): string[] => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };
  useEffect(() => {
    const storedFavorites = getFavoritesFromStorage();
    const filteredCards = cards.filter((card) =>
      storedFavorites.includes(card._id),
    );
    setFavCards(filteredCards);
  }, [cards]);
  return (
    <div className="favMain">
      <header className="favHeader">
        <h1 className="favTitle">My Favorites</h1>
        <p className="favDescription">Here you can see your favorited cards</p>
      </header>
      <section className="favCardSection">
        {loading ? (
          <Spinner size="xl" />
        ) : favCards.length > 0 ? (
          <MyCards cards={itemsToDisplay} />
        ) : (
          <div className="mb-fluid-8xl h-fluid-md p-8 text-center text-fluid-2xl">
            No favorite cards yet.
          </div>
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
  );
};

export default FavoriteCards;
