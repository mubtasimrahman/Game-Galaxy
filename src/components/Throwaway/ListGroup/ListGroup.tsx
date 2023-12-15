import { useState } from "react";
import "./ListGroup.css";

/* <></> is shorthand of using <frangment> </fragment>.
to group multiple JSX elements under a single root element*/

//Basically like a class with properties. An interface for props
//Props are input for functions
interface Props {
  items: string[];

  //onSelectItem: (item: string) => void;
  onItemAdd: (item: string) => void;
  onItemSub: (item: string) => void;
}

function ListGroup({ items, onItemAdd, onItemSub }: Props) {
  /* useState function is called a hook. Hooks are function that lets us use REACT features. 
  State hook Lets React know that this component will have data or state that changes over time.
  State is similar to local vars. They are read only.
  UseState returns an array with 2 elements. (-1) means nothing currently selected.(0) would mean
  0 index selected, as in selectedItem is 0.
  First element is a state var, second is an updater function*/
  //let selecteditem = 0; THIS won't work as local and global vars like this won't trigger a re-render
  const [selectedItem, setSelectedItem] = useState(-1);

  //items = [];
  const CheckItems = () => {
    return items.length === 0 ? <p>No Fruits in Stall </p> : null;
  };

  const HandleItemClick = (item: string) => {
    console.log(item);
  };

  const ItemSort = (item: string, index: number) => {
    return (
      <li
        className={
          selectedItem === index
            ? "list-group-item list-group-item-dark active"
            : "list-group-item list-group-item-dark"
        }
        key={index}
        onClick={() => {
          HandleItemClick(item);
          setSelectedItem(index);
          //onSelectItem(item);
        }}
      >
        <div className="item-content">{item}</div>
        <div className="item-buttons">
          <button
            type="button"
            className=" btn btn-success btn-sm "
            /*Here onClick needs to be passed a function calling the
            handler with item argument so that type inferencing
            can occur as onItemAdd defined outside main function */
            onClick={() => {
              onItemAdd(item);
            }}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => {
              onItemSub(item);
            }}
          >
            -
          </button>
        </div>
      </li>
    );
  };

  return (
    <>
      {CheckItems()}
      <ul className="list-group">{items.map(ItemSort)}</ul>
    </>
  );
}

export default ListGroup;
