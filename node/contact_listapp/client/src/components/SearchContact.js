import { useState } from "react";
export const SearchContact = ({ onSearch }) => {

    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        onSearch(search)
    };

    return (
        <div>
            <input
                type="text"
                placeholder="search"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <button onClick={handleSubmit}>Search</button>
        </div>


    );

}