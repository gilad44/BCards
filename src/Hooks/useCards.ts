import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TCard } from "../types/TCard";
const useSetCards = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        );

        const filteredCards = res.data.filter(
          (card: { description: string | [] }) => card.description.length <= 20,
        );

        setCards(filteredCards);
      } catch (error) {
        toast("Error retrieving cards");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);
  return { cards, loading };
};
export default useSetCards;
