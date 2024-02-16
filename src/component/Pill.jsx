/* eslint-disable react/prop-types */
const Pill = ({ image, text, onClick }) => {
  return (
    <span className="single-search-value" onClick={onClick}>
      <span>{text} &times;</span>
    </span>
  );
};

export default Pill;
