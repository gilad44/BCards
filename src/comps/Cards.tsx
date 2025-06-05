import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaHeart, FaPhone } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cardTheme } from "../data/themes";
import { RootState } from "../store/store";
import { TCard, TCardsArr } from "../types/TCard";

const Cards = ({ cards }: TCardsArr) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
  }, []);

  const handleCardClick = (cardId: string) => {
    navigate(`/business/${cardId}`);
  };

  const handleFavoriteClick = (card: TCard) => {
    if (!user?._id || !user) {
      console.log("Empty or invalid card ID");
      return;
    }

    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    const isLiked = favorites.includes(card._id);
    let updatedFavorites;

    if (isLiked) {
      updatedFavorites = favorites.filter((id) => id !== card._id);
      card.likes = card.likes.filter((id) => id !== user._id);
    } else {
      updatedFavorites = [...favorites, card._id];
      card.likes.push(user._id);
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <>
      {cards.map((card) => (
        <Card
          onClick={() => handleCardClick(card._id)}
          theme={cardTheme.card}
          className="MyCard"
          key={card._id}
        >
          <div className="rounded-xl border-[3px] border-blue-700">
            <img
              className="cardImage"
              src={card.image.url}
              alt={card.image.alt}
            />
          </div>
          <div className="cardBody">
            <h1>{card.title}</h1>
            <h3>{card.subtitle}</h3>
            <p>{card.description}</p>
          </div>

          <div className="cardButtons">
            <hr className="mb-2" />
            <div className=" flex items-end justify-between">
              {user && (
                <FaHeart
                  className={`${
                    favorites.includes(card._id) ? "text-red-500" : "text-black"
                  } heart`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick(card);
                  }}
                />
              )}
              <p>
                <FaPhone className="phone" />
              </p>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default Cards;
