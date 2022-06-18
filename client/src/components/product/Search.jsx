import React ,{useState}from "react";
import MetaData from '../layout/metadata';
import './search.css';
import {useNavigate} from 'react-router-dom'

const Search = () => {
  const [keyword, setKeyword] = useState("");
 const navigate = useNavigate();


  const searchSubmitHandle = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
     
      <form className="searchBox" onSubmit={searchSubmitHandle}>
        <input
          type="text"
          placeholder="Search a product"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
