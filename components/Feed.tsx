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
  const [allPosts, setAllPosts] = useState<IPrompt[]>([]);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState<IPrompt[]>([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchTimeout && clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='flex-center relative w-full'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;

// 'use client';

// import { useState, useEffect } from 'react';
// import PromptCard from './PromptCard';
// import { IPrompt } from '@/models/prompt';

// interface PromptCardListProps extends React.HTMLAttributes<HTMLDivElement> {
//   data: IPrompt[];
//   handleTagClick: (tag: string) => void;
// }

// const PromptCardList: React.FC<PromptCardListProps> = ({
//   data,
//   handleTagClick,
// }) => {
//   return (
//     <div className='prompt_layout mt-16'>
//       {data.map((post) => (
//         <PromptCard
//           key={post._id}
//           post={post}
//           handleTagClick={handleTagClick}
//         />
//       ))}
//     </div>
//   );
// };

// const Feed = () => {
//   const [searchText, setSearchText] = useState('');
//   const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
//     null
//   );
//   const [posts, setPosts] = useState<IPrompt[]>([]);
//   const [filteredPosts, setFilteredPosts] = useState<IPrompt[]>([]);

//   const fetchPosts = async () => {
//     const response = await fetch('/api/prompt');
//     const data = await response.json();

//     setPosts(data);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleTagClick = (tag: string) => {
//     handleSearchChange({
//       target: { value: tag },
//     } as React.ChangeEvent<HTMLInputElement>);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = e.target.value;
//     searchTimeout !== null && clearTimeout(searchTimeout);
//     setSearchText(inputValue);

//     // debounce method
//     setSearchTimeout(
//       setTimeout(() => {
//         const newFilteredPosts = posts.filter(
//           (post) =>
//             post.prompt.includes(inputValue) ||
//             post.creator?.username.includes(inputValue) ||
//             post.creator?.email.includes(inputValue) ||
//             post.tag.includes(inputValue)
//         );

//         setFilteredPosts(newFilteredPosts);
//       }, 200)
//     );
//   };

//   return (
//     <section className='feed'>
//       <form className='flex-center relative w-full'>
//         <input
//           type='text'
//           className='search_input peer'
//           placeholder='Search for a prompt'
//           value={searchText}
//           onChange={handleSearchChange}
//           required
//         />
//       </form>
//       {searchText !== '' ? (
//         <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
//       ) : (
//         <PromptCardList data={posts} handleTagClick={handleTagClick} />
//       )}
//     </section>
//   );
// };

// export default Feed;
