'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import { IPrompt } from '@/models/prompt';

interface PromptCardListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: IPrompt[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList: React.FC<PromptCardListProps> = ({
  data,
  handleTagClick,
}) => {
  return (
    <div className='prompt_layout mt-16'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={(tag) => {}} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: React.FormEvent) => {
    return e.target;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='flex-center relative w-full'>
        <input
          type='text'
          className='search_input peer'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
