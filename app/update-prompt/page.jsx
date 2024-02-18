"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


import Form from "@components/Form";


const UpdatePrompt = () => {
    
    const router                      = useRouter();
    const searchParams                = useSearchParams();
    const promptId                    = searchParams.get('id');
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost]             = useState({
                                                    prompt: "",
                                                    tag: "",
                                                });
                                                
    useEffect(() => {
        const getPrompt = async () => {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "GET"
            });
            const data = await response.json();
            const { prompt, tag } = data;

            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        }

        if(promptId) {
            getPrompt();
        }
    }, [promptId])
    
    const onUpdatePrompt  = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) {
            setSubmitting(false);
            alert('Prompt Id not found.');
            return;
        }

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={onUpdatePrompt}
        />
    )
}

export default UpdatePrompt;