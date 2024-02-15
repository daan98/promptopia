"use client";

import { useEffect, useState } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div
      className="mt-16 prompt_layout"
    >
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
};

function Feed() {

  const [searchTerm, setSearchTerm] = useState('');
  const [post, setPost]             = useState([]);

  const handleSearchTermChange = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPost(data);
    };

    fetchPosts();
  }, []);
  

  return (
    <section
      className="feed"
    >
      <form
        className="relative w-full flex-center"
      >
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchTerm}
          onChange={handleSearchTermChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={post}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed;