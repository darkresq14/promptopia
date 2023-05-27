import React from 'react';
import { IPrompt } from '@/models/prompt';
import PromptCard from './PromptCard';

interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  desc: string;
  data: IPrompt[];
  handleEdit?: (post: IPrompt) => void;
  handleDelete?: (post: IPrompt) => void;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='prompt_layout mt-10'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
