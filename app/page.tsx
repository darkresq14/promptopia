import Feed from '@/components/Feed';

const Home = () => {
  return (
    <>
      <section className='flex-center w-full flex-col'>
        <h1 className='head_text text-center'>
          Discover & Share
          <br className='max-md:hidden' />
          <span className='orange_gradient text-center'>
            {' '}
            AI-Powered Promts
          </span>
        </h1>
        <p className='desc text-center'>
          Promptopia is an open-source AI prompting tool for modern w orld to
          discover, create and share creative prompts
        </p>
        <Feed />
      </section>
    </>
  );
};

export default Home;
