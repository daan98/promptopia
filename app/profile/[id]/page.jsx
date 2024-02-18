"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

import ProfileInfo from "@components/ProfileInfo";

const UserProfile = ({ params }) => {

    const router            = useRouter();
    const searchParams      = useSearchParams();
    const userName          = searchParams.get("name");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
    
            setPosts(data);
        };
        
        if(params?.id) {
            fetchPosts();
        }
    }, [params?.id]);

    return (
        <ProfileInfo
            username={userName}
            desc={`Welcome to ${userName} personalized profile. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
            data={posts}
        />
    );
}

export default UserProfile;