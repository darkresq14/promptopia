import { IPrompt } from '@/models/prompt';
import Link from 'next/link';

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  type: string;
  post: IPrompt;
  setPost: (post: IPrompt) => void;
  submitting: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  return (
    <>
      <section className='flex-start w-full max-w-full flex-col'>
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{type} Post</span>
        </h1>
        <p className='desc max-w-md text-left'>
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform.
        </p>

        <form
          onSubmit={handleSubmit}
          className='glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7'
        >
          <label>
            <span className='font-satoshi text-base font-semibold text-gray-700'>
              Your AI Prompt
            </span>
            <textarea
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              placeholder='Write your prompt here...'
              required
              className='form_textarea'
            ></textarea>
          </label>

          <label>
            <span className='font-satoshi text-base font-semibold text-gray-700'>
              Tag{' '}
              <span className='font-normal'>
                (#product, #webdevelopment, #idea)
              </span>
            </span>
            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              placeholder='#tag'
              required
              className='form_input'
            ></input>
          </label>

          <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href='/' className='text-sm text-gray-500'>
              Cancel
            </Link>
            <button
              type='submit'
              disabled={submitting}
              className='rounded-full bg-primary-orange px-5 py-1.5 text-sm text-white'
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
