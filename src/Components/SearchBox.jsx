import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navegate = useNavigate();
  //   To track the search  input changes
  const [searchTraker, setSearchTraker] = useState("");
  const [sugistions, setSugistions] = useState([]);

  const handelSubmit = (e) => {
    e.preventDefault();
    // encodeURI is used to encode the search query to avoid special characters
    if (searchTraker.trim()) {
      navegate(`/search?query=${encodeURI(searchTraker)}`);
      setSearchTraker("");
      setSugistions([]);
    }
  };
  useEffect(() => {
    // if Click any way to close the sugistions
    document.body.addEventListener("click", () => {
      setSugistions([]);
    });
  }, []);
  //   console.log(searchTraker);
  useEffect(() => {
    const fetchSugistions = async () => {
      if (!searchTraker) {
        setSugistions([]);
        return;
      }
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchTraker}`
        );
        const data = await res.json();
        setSugistions(data.products.slice(0, 5) || []);
      } catch (error) {
        console.log("Filed to fetch data :: " + error);
        setSugistions([]);
      }
    };
    //  to limit the Prusher of the api we will use a timer to delay the fetch request
    const timer = setTimeout(() => {
      fetchSugistions();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTraker]);

  // console.log(sugistions);

  return (
    <div className="relative flex flex-col justify-center items-center">
      <form
        onSubmit={handelSubmit}
        className="Search_item w-full flex bg-gray-300 p-2  items-center rounded-full relative z-[100] "
      >
        <input
          className="outline-none w-full px-4 py-1 bg-transparent text-gray-600  font-semibold text-sm  "
          type="text"
          placeholder="Search"
          name="search"
          id="search"
          autoCapitalize="off"
          autoComplete="off"
          value={searchTraker}
          onChange={(e) => {
            setSearchTraker(e.target.value);
            setSugistions([]);
          }}
          onClick={() => {
            setSearchTraker("");
          }}
        />
        <button className="search_btn bg-main p-3 rounded-full" type="submit">
          <AiOutlineSearch />
        </button>
      </form>
      {sugistions.length > 0 ? (
        <ul className="sugistions bg-gray-100 p-5 rounded-lg w-[20rem] sm:w-[42rem] transition-all flex flex-col justify-center items-center shadow-lg absolute top-[80%] z-[3] ">
          {sugistions.map((item) => {
            return (
              <li
                key={item.id}
                className="p-2 hover:bg-black/10 rounded-md text-black cursor-pointer w-full "
                onClick={() => {
                  navegate(`/productes/${item.id}`);
                  setSugistions([]);
                  setSearchTraker("");
                }}
              >
                <div
                  className={`  ${
                    sugistions.length > 0
                      ? "flex gap-2 justify-start  items-center"
                      : "hidden"
                  }`}
                >
                  <img
                    className="size-20 h-20 object-cover flex justify-start items-start"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <div className="content flex flex-col">
                    <div className="font-bold ">{item.title}</div>
                    <div className="font-normal line-clamp-1 sm:line-clamp-1 w-50">
                      {item.description}
                    </div>
                    <span className="font-bold text-green-700">
                      ${item.price}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
