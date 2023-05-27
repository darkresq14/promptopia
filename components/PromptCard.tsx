'use client';

import { IPrompt } from '@/models/prompt';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface PromptCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: IPrompt;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: IPrompt) => void;
  handleDelete?: (post: IPrompt) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [copied, setCopied] = useState('');

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied('');
    }, 3000);
  };

  const handleUserClick = () => {
    if (session?.user.id === post.creator?._id) {
      router.push('/profile');
    } else {
      router.push(
        `/profile/${post.creator?._id}?username=${post.creator?.username}`
      );
    }
  };

  return post.creator ? (
    <div className='prompt_card'>
      <div className='item-start flex justify-between gap-5'>
        <div
          className='flex flex-1 cursor-pointer items-center justify-start gap-3'
          onClick={handleUserClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt='copy prompt button'
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='blue_gradient cursor-pointer font-inter text-sm'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='flex-center mt-5 gap-4 border-t border-gray-100 pt-3'>
          <p
            className='green_gradient cursor-pointer font-inter text-sm'
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className='orange_gradient cursor-pointer font-inter text-sm'
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  ) : (
    <div>Post has no creator.</div>
  );
};

export default PromptCard;
