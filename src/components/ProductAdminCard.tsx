import Image from "next/image";
export const ProductAdminCard = ({
  imgUrl,
  name,
  price,
}: {
  imgUrl: string;
  name: string;
  price: number;
}) => {
  return (
    <div className='shadow-md rounded-md p-2 m-2 flex'>
      <Image
        src={imgUrl}
        alt='product-img'
        height={200}
        width={200}
        className='rounded-md'
      />
      <div className='flex flex-col relative'>
        <h1 className='ml-2'>Name : {name}</h1>
        <h1 className='ml-2'>Price : {price}</h1>
        <button className='px-3 py-1 border-blue-600 rounded-md border-2 hover:bg-blue-300 duration-200 ml-3 w-32 absolute bottom-1'>
          View
        </button>
      </div>
    </div>
  );
};
