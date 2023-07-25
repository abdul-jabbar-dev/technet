
import { useGetCommentQuery, useSendCommentMutation } from '@/redux/api/products';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';


export default function ProductReview({ id }: { id: string }) {
  const [sendComment, result] = useSendCommentMutation()
  const { data, isLoading } = useGetCommentQuery(id)
  const [comt, setComt] = useState('')
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <Textarea className="min-h-[30px]" onChange={(e) => setComt(e.target.value)} />
        <Button onClick={() => sendComment({ id, body: comt })} className="rounded-full h-10 w-10 p-2 text-[25px]">
          <FiSend />
        </Button>
      </div>
      <div className="mt-10">
        {
          isLoading ? <div style={{ width: "100% ", display: 'flex', justifyContent: "center" }}>
            <TailSpin
              height="80"
              width="80"
              color="#1493ff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperClass=""
              visible={true}
            />
          </div> : data?.map((comment: string, index: number) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{comment}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
