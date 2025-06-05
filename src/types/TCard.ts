type TCard = {
  _id: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  address: {
    state: "";
    country: "";
    city: "";
    street: "";
    houseNumber: 0 | null;
    zip: 0 | null;
  };
  description: string;
  web: string;
  image: {
    url: string;
    alt: string;
  };
  user_id: string;
  createdAt: string;
  likes: string[];
};

type TCardsArr = {
  cards: TCard[];
};
export type { TCard, TCardsArr };
