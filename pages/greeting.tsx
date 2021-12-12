import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { routes } from 'constant';
import UserLayout from 'components/layouts/user';

export default function Greeting() {
  const router = useRouter();

  return (
    <>
      <div>
        <h1 className="text-lg font-medium mb-3">Chào Minteau,</h1>
        <p className="text-base font-light leading-7">
          Là lmint đây!
          <br />
          Anh được biết là em đang thi và anh hông biết tặng gì để chúc em đạt
          được kết quả tốt nữa. Hôm nay rảnh rỗi, anh ngồi làm cái ứng dụng nhỏ
          nhỏ xàm xí này mong em được vui và qua nó anh muốn gửi lời chúc tới em
          mong em những điều tốt đẹp nhứttt
        </p>
        <div className="relative mx-auto teaImg">
          <Image src="/images/phuclong.png" layout="fill" />
        </div>

        <p className="text-base font-light leading-7">
          Tui để ly trà vải ở đây, đợi khi nào hết dịch và ai đó đạt được điểm
          cao thì tới lấy nha nha! Sẵn tiện tui cũng có đôi lời xàm xí... Bạn
          nào dễ thương muốn xem tiếp thì cứ ấn cái nút xanh xanh ở dưới nhó 😜
        </p>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-5"
          onClick={() => router.push(routes.chanceQuestion())}
        >
          Hm... đọc tiếp
        </button>
      </div>
      <style jsx>{`
        .teaImg {
          width: 60vw;
          height: 62vw;
        }

        @media (min-width: 765px) {
          .teaImg {
            width: 18vw;
            height: 20vw;
          }
        }
      `}</style>
    </>
  );
}

Greeting.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
