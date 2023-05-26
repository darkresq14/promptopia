'use client';

import Profile from '@/components/Profile';
import { IPrompt } from '@/models/prompt';
import { set } from 'mongoose';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<IPrompt[]>([]);
  const router = useRouter();

  const handleEdit = (post: IPrompt) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: IPrompt) => {
    const hasConfirmed = confirm(
      `Are you sure you want to delete this prompt?`
    );

    if (hasConfirmed)
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      if (session?.user.id) {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
