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
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [posts, setPosts] = useState<IPrompt[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPrompt[]>([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setPosts(data);
  };

  const handleTagClick = (tag: string) => {
    handleSearchChange({
      target: { value: tag },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    searchTimeout !== null && clearTimeout(searchTimeout);
    setSearchText(inputValue);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const newFilteredPosts = posts.filter(
          (post) =>
            post.prompt.includes(inputValue) ||
            post.creator?.username.includes(inputValue) ||
            post.creator?.email.includes(inputValue) ||
            post.tag.includes(inputValue)
        );

        setFilteredPosts(newFilteredPosts);
      }, 200)
    );
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  return (
    <section className='feed'>
      <form className='flex-center relative w-full'>
        <input
          type='text'
          className='search_input peer'
          placeholder='Search for a prompt'
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
