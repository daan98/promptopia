"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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

  // Search states
  const [searchTerm, setSearchTerm]           = useState('');
  const [searchTimeout, setSearchTimeout]     = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [posts, setPosts]                     = useState([]);
  const { data: session }                     = useSession();
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i');
    
    return posts.filter((post) =>
      regex.test(post.creator.username) ||
      regex.test(post.tag) ||
      regex.test(post.prompt)
    );
  }

  const handleSearchTermChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchTerm(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    )
  };

  const onHandleTagClick = (tagClicked) => {
    const searchResult = filterPrompts(tagClicked);
    setSearchedResults(searchResult);
    setSearchTerm(tagClicked);
  }

  return (
    <>
    {session?.user.id && (
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
          data={searchedResults.length > 0 ? searchedResults : posts}
          handleTagClick={onHandleTagClick}
        />
      </section>
    )}
    </>
  )
}

export default Feed;