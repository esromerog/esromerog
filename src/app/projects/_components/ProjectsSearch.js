"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function ProjectsSearch({}) {
  const placeholder = "Type a project name, tags, or description";
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="mb-2">
      <button
        className="button-primary"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setShowSearch(!showSearch)}
      >
        Search
      </button>
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="search-container"
            initial={{ height: 0, paddingTop: 0, paddingBottom: 0 }}
            animate={{ height: "64px", paddingTop: 16, paddingBottom: 16 }}
            exit={{ height: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{ duration: 0.15 }}
          >
            <SearchBar
              placeholder={placeholder}
              setShowSearch={setShowSearch}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchBar({ placeholder, setShowSearch }) {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="search">
      <label htmlFor="search">Search</label>
      <input
        placeholder={"Type a project name, tags, or description"}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        autoFocus
        // onBlur={() => setShowSearch(false)}
      />
      {/*<span className="material-symbols-outlined">search</span>*/}
    </div>
  );
}
