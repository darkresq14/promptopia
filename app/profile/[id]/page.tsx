'use client';

import Profile from '@/components/Profile';
import { IPrompt } from '@/models/prompt';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface OtherProfileParams {
  params?: {
    id: string;
  };
}

function OtherProfile({ params }: OtherProfileParams) {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const [posts, setPosts] = useState<IPrompt[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      if (params?.id) {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [params?.id]);

  return (
    <Profile
      name={`${username ?? ''}'s`}
      desc={`Welcome to ${
        username ?? ''
      }'s personalized profile page.  Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
}

export default OtherProfile;
