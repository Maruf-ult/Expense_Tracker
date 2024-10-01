
import PropTypes from "prop-types";
import { CgMathPlus } from "react-icons/cg";
import { MdDelete } from "react-icons/md";

const Addedincomes = ({ income, deleteIncome }) => {
  const { _id, title, amount, date } = income; // Assuming each income has a unique _id

  const formattedDate = new Date(date).toLocaleDateString('en-GB');

  const getBackgroundColor = (title) => {
    switch (title) {
      case 'Teaching':
        return 'bg-green-300';
      case 'Freelanching':
        return 'bg-red-300';
      case 'Stocks':
        return 'bg-violet-300';
      case 'Youtubing':
        return 'bg-pink-300';
      case 'Marketing':
        return 'bg-rose-400';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`px-2 rounded-xl mb-4 ${getBackgroundColor(title)}`}>
      <div className="flex flex-row justify-between items-center gap-4 ml-4">
        <div>
          <p className="font-bold">From: {title}</p>
          <div className="flex flex-row items-center gap-2">
            <div className="bg-black font-bold text-white"><CgMathPlus /></div>
            <p className="flex flex-row items-center gap-1">
              <span className="font-bold">{amount}</span> Tk <span className="font-bold">{formattedDate}</span>
            </p>
          </div>
        </div>
        <div className="mr-4">
          <button
            className="font-bold text-3xl text-center"
            onClick={() => deleteIncome(_id)} // Call the delete function with the income id
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

Addedincomes.propTypes = {
  income: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  deleteIncome: PropTypes.func.isRequired,
};

export default Addedincomes;
