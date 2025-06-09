import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";

const Addedexpense = ({ expense, handleDelete }) => {
  const { title, amount, date, _id } = expense;
  const formattedDate = new Date(date).toLocaleDateString('en-GB');

  const getBackgroundColor = (title) => {
    switch (title) {
      case 'Education': return 'bg-blue-300';
      case 'Groceries': return 'bg-yellow-300';
      case 'Health': return 'bg-green-300';
      case 'Subscriptions': return 'bg-purple-300';
      case 'Traveling': return 'bg-red-300';
      default: return 'bg-white';
    }
  };

  return (
 <div className={`px-3 py-2 rounded-xl mb-3 max-w-md ${getBackgroundColor(title)}`}>
  <div className="flex flex-col md:flex-row justify-between items-center gap-2">
    
    {/* Expense Details */}
    <div className="w-full text-center md:text-left">
      <p className="font-bold text-lg">Expense: {title}</p>
      <div className="flex flex-col md:flex-row items-center gap-2">
        <p><span className="font-bold">{amount}</span> Tk</p>
        <p className="text-gray-600">{formattedDate}</p>
      </div>
    </div>

    {/* Delete Button */}
    <div className="flex justify-end md:justify-center">
      <button 
        className="font-bold text-xl text-red-500 hover:text-red-700 transition"
        onClick={() => handleDelete(_id)}
      >
        <MdDelete />
      </button>
    </div>

  </div>
</div>
  );
};

Addedexpense.propTypes = {
  expense: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Addedexpense;