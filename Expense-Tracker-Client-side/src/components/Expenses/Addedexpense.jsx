

import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";

const Addedexpense = ({ expense, handleDelete }) => {
  const { title, amount, date, _id } = expense;

  const formattedDate = new Date(date).toLocaleDateString('en-GB');

  const getBackgroundColor = (title) => {
    switch (title) {
      case 'Education':
        return 'bg-blue-300';
      case 'Groceries':
        return 'bg-yellow-300';
      case 'Health':
        return 'bg-green-300';
      case 'Subscriptions':
        return 'bg-purple-300';
      case 'Traveling':
        return 'bg-red-300';
      default:
        return 'bg-white';
    }
  };

  return (
    <>
      <div className={`px-2 rounded-xl mb-4 ${getBackgroundColor(title)}`}>
        <div className="flex flex-row justify-between items-center gap-4 ml-4">
          <div>
            <p className="font-bold">Expense: {title}</p>
            <div className="flex flex-row items-center gap-2">
              <p><span className="font-bold">{amount}</span> Tk <span className="font-bold">{formattedDate}</span></p>
            </div>
          </div>
          <div className="mr-4">
            <button className="font-bold text-3xl text-center" onClick={() => handleDelete(_id)}><MdDelete /></button>
          </div>
        </div>
      </div>
    </>
  );
};

Addedexpense.propTypes = {
  expense: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Addedexpense;
