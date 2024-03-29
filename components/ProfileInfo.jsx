"use client";
import PromptCard from "./PromptCard";

const ProfileInfo = ( {data, desc, handleDelete, handleEdit, username,}) => {
  return (
    <section>
      <h1
        className="head_text text-left"
      >
        <span
          className="blue_gradient"
        >
          {username} Profile
        </span>
      </h1>

      <p
        className="desc text-left"
      >
        {desc}
      </p>

      <div
        className="mt-10 prompt_layout"
      >
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
    </section>
  )
}

export default ProfileInfo;