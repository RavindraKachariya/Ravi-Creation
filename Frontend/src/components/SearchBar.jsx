import { useSelector, useDispatch } from "react-redux";
import { setSearch, setShowSearch } from "../store/searchSlice";

const SearchBar = () => {
    const dispatch = useDispatch();
    const { search, showSearch } = useSelector((state) => state.search);

    if (!showSearch) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-5">

            <div className="flex justify-center gap-4">

                <input
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    type="text"
                    placeholder="Search products..."
                    className="border px-4 py-2 w-1/2"
                />

                <button
                    onClick={() => dispatch(setShowSearch(false))}
                    className="bg-black text-white px-4 py-2"
                >
                    Close
                </button>

            </div>

        </div>
    )
}

export default SearchBar
