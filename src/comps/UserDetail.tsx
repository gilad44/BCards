type UserDetailProps = {
  field: string | undefined;
  value: number | string | undefined;
};
const UserDetail = (props: UserDetailProps) => {
  return (
    <>
      <div className="flex w-full">
        <label className="profileTableField">{props.field}</label>
        <p className="profileTableValue">{props.value}</p>
      </div>
    </>
  );
};
export default UserDetail;
