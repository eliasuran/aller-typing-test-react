export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* setting absolute and overflow hidden to outer div */}
      <div className='grid h-full w-full place-items-center bg-white bg-cover bg-no-repeat'>
        {/* div for background image */}
        <div className='h-4/6 w-4/6 bg-black/75 p-10 font-light text-white backdrop-blur-sm'>
          {/* div containing the main content of the page */}
          {children}
        </div>
      </div>
    </div>
  );
}
