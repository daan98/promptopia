"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProfileInfo from "@components/ProfileInfo";

const Profile = () => {

    const { data: session } = useSession();
    const router            = useRouter();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
    
            setPosts(data);
        };
        
        if(session?.user.id) {
            fetchPosts();
        }
    }, []);

    const onHandleDelete = async (deletedPost) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${deletedPost._id}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((post) => post._id !== deletedPost._id)

                setPosts(filteredPosts);
                router.refresh();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onHandleEdit = async (actualPost) => {
        if(actualPost._id) {
            router.push(`/update-prompt?id=${actualPost._id}`);
        }
    };

    return (
        <ProfileInfo
            username="My"
            desc="Welcome to your personalized profile."
            data={posts}
            handleEdit={onHandleEdit}
            handleDelete={onHandleDelete}
        />
    );
}

export default Profile;