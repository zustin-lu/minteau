import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { routes } from 'constant';
import UserLayout from 'components/layouts/user';
import { Button, Paragraph } from 'components';

function Greeting() {
  const router = useRouter();

  return (
    <>
      <div>
        <h1 className="text-lg font-medium mb-3">Chào Minteau,</h1>
        <Paragraph>
          Là lmint đây!
          <br />
          Anh được biết là em đang thi và anh hông biết tặng gì để chúc em đạt
          được kết quả tốt nữa. Hôm nay rảnh rỗi, anh ngồi làm cái ứng dụng nhỏ
          nhỏ xàm xí này mong em được vui và qua nó anh muốn gửi lời chúc tới em
          mong em những điều tốt đẹp nhứttt
        </Paragraph>

        <div className="relative mx-auto teaImg">
          <Image src="/images/phuclong.png" layout="fill" />
        </div>

        <Paragraph>
          Tui để ly trà vải ở đây, đợi khi nào hết dịch và ai đó đạt được điểm
          cao thì tới lấy nha nha! Sẵn tiện tui cũng có đôi lời xàm xí... Bạn
          nào dễ thương muốn xem tiếp thì cứ ấn cái nút xanh xanh ở dưới nhó 😜
        </Paragraph>

        <Button
          variant="info"
          className="mt-6 block ml-auto px-8"
          onClick={() => router.push(routes.chanceQuestion())}
        >
          Hm... đọc tiếp
        </Button>
      </div>
      <style jsx>{`
        .teaImg {
          width: 60vw;
          height: 62vw;
        }

        @media (min-width: 768px) {
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

export default Greeting;
