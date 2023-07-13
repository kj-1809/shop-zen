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
      <div className='flex flex-col'>
        <h1 className='ml-2'>Name : {name}</h1>
        <h1 className='ml-2'>Price : {price}</h1>
      </div>
    </div>
  );
};
