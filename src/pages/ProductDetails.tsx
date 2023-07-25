import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useGetAProductQuery } from '@/redux/api/products';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner'
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/features/cart/cartSlice';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetAProductQuery(id!)
  const dispatch = useAppDispatch()
  if (isLoading) {
    return <div style={{ width: "100% ", display: 'flex', justifyContent: "center" }}>
      <TailSpin
        height="80"
        width="80"
        color="#1493ff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperClass=""
        visible={true}
      />
    </div>
  }

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.model}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.keyFeature?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button onClick={() => dispatch(addToCart(product))}>Add to cart</Button>
        </div>
      </div>
      <ProductReview id={product._id} ></ProductReview>
    </>
  );
}
