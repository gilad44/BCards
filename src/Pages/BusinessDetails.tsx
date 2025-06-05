import axios from "axios";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buttonTheme } from "../data/themes";
import { TCard } from "../types/TCard";

type ContactProps = {
  field: string | undefined;
  value: number | string | undefined;
};
const Contact = (props: ContactProps) => {
  const { field, value } = props;
  return (
    <>
      <div className="flex h-10 w-full">
        <label className="flex w-fluid-4xl items-center rounded-lg border-2 border-white pl-1 font-semibold shadow-md shadow-slate-800">
          {field}
        </label>
        <p className="ml-2 w-full overflow-hidden rounded-lg bg-slate-300 px-2 pt-1 text-xl shadow-md shadow-slate-800">
          {value}
        </p>
      </div>
    </>
  );
};
const BusinessDetails = () => {
  const [card, setCard] = useState<TCard | null>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const capitalize = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleReturn = () => {
    navigate(-1); // This navigates back to the previous page
  };
  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const res = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        );
        console.log(res.data);
        setCard(res.data);
      } catch (error) {
        console.error("Error fetching cards", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCardDetails();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!card) {
    return <div>Card not found</div>;
  }
  return (
    <div className="outer-div">
      <div className="card">
        <div className="card-upper">
          <h1 className="text-4xl">{card.title}</h1>
          <h2 className="text-2xl">{card.subtitle}</h2>
          <img
            className="size-60 rounded-3xl border-4 border-blue-600 bg-gray-300 p-2"
            src={card.image.url}
            alt={card.image.alt}
          />
        </div>
        <div className="card-lower">
          <p className="text-fluid-base">{card.description}</p>
          <Contact field="Email" value={card.email} />
          <Contact field="Phone" value={card.phone} />
          <Contact field="Website" value={card.web} />
          <Contact
            field="Adress"
            value={`${card.address.houseNumber}${"  "}${capitalize(card.address.street)}${"  "}${capitalize(card.address.city)}${"  "}${capitalize(card.address.country)}`}
          />
        </div>
      </div>
      <Button
        theme={buttonTheme}
        className="retunButton"
        onClick={handleReturn}
      >
        Return
      </Button>
    </div>
  );
};

export default BusinessDetails;
