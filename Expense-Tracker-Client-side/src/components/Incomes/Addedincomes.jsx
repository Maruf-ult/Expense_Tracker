
import PropTypes from "prop-types";
import { CgMathPlus } from "react-icons/cg";
import { MdDelete } from "react-icons/md";

const Addedincomes = ({ income, deleteIncome }) => {
  const { _id, title, amount, date } = income; 

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
  <div className={`px-3 py-2 rounded-xl mb-3 max-w-md ${getBackgroundColor(title)}`}>
    <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
      
      {/* Income Details */}
      <div className="w-full text-center md:text-left">
        <p className="font-bold">From: {title}</p>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="bg-black font-bold text-white p-1 rounded"><CgMathPlus /></div>
          <p><span className="font-bold">{amount}</span> Tk <span className="font-bold">{formattedDate}</span></p>
        </div>
      </div>

      {/* Delete Button */}
      <div className="flex justify-end md:justify-center">
        <button 
          className="font-bold text-xl text-red-500 hover:text-red-700 transition"
          onClick={() => deleteIncome(_id)}
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
