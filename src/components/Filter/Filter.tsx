import "./Filter.css";
import { categories } from "../../Pages/HomePage";

interface Props {
  onSelectCategory: (category: string) => void;
}

const Filter = ({ onSelectCategory }: Props) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    onSelectCategory(selectedCategory);
  };
  return (
    <>
      {/* <header className="header">
        <h1 className="title " title={heading}>
          {heading}
        </h1>
      </header> */}
      <div className="dropup">
        <select
          className="btn btn-secondary"
          defaultValue=""
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Categorize
          </option>

          <optgroup label="───────────────"></optgroup>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Filter;
