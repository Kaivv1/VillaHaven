/*eslint-disable react/prop-types */

const FacilitiesCard = ({ data }) => {
  const { title, pic } = data;
  return (
    <div className="facilities-card">
      <img src={pic} alt="" />
      <div>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default FacilitiesCard;
