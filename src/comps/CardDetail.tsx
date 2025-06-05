type CardDetailProps = {
  field: string | undefined;
  value: number | string | undefined;
};

const CardDetail = (props: CardDetailProps) => {
  return (
    <>
      <div className="cardDetailDiv">
        <span className="cardField">{props.field}:</span>
        <p className="cardValue">{props.value}</p>
      </div>
    </>
  );
};
export default CardDetail;
