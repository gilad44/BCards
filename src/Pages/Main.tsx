import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Cards from "../comps/Cards";
import MyPagination from "../comps/MyPagination";
import { paginationTheme } from "../data/themes";
import useCardPagination from "../Hooks/useCardPagination";
import useSetCards from "../Hooks/useCards";
import { RootState } from "../store/store";

const Main = () => {
  const { cards, loading } = useSetCards();
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
    allCards: cards,
    searchKeyword: keyword,
    resetOn: [cards],
  });

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
      <div className="mainDiv">
        {/* Header */}
        <header className="mainHeader">
          <h1 className="mainTitle">Cards Examples</h1>
          <p className="mainDescription">
            Here you can find business cards from all categories
          </p>
        </header>
        <div className="mainSpinnerDiv">{loading && <Spinner size="xl" />}</div>
        {/* Cards Section */}
        <section className="mainCardSection">
          <Cards cards={itemsToDisplay} />
        </section>
        {/* Pagination */}
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

export default Main;
