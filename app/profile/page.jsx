"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProfileInfo from "@components/ProfileInfo";

const Profile = () => {

    const { data: session } = useSession();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
    
            setPost(data);
        };
        
        if(session?.user.id) {
            fetchPosts();
        }
    }, []);

    const onHandleDelete = async () => {};

    const onHandleEdit = async () => {};

    return (
        <ProfileInfo
            username="My"
            desc="Welcome to your personalized profile."
            data={post}
            handleEdit={()=> onHandleEdit}
            handleDelete={()=> onHandleDelete}
        />
    );
}

export default Profile;