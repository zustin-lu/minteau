import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { routes } from 'constant';
import UserLayout from 'components/layouts/user';
import { Button, Header, Paragraph } from 'components';

function ChanceQuestion() {
  const router = useRouter();
  const [showNo, setShowNo] = useState(true);
  const [accepted, setAccepted] = useState(false);

  return (
    <div>
      <Header variant="head4">Đôi lời xàm xí,</Header>
      <Paragraph>
        Hm... Em đã bước qua một vài câu chuyện buồn, và vài điều không đáng để
        nhớ. Anh ở đây mong được làm bồ không tèo của em, làm trò cùng em, mong
        một ngày nào đó cho em có được một câu chuyện tốt đẹp hơn 👊🏼👊🏼
      </Paragraph>

      <div className="relative mainImg mx-auto mb-4">
        <Image src="/images/chance-question.svg" layout="fill" />
      </div>

      <Paragraph>
        Tuy anh là một IT nhạt nhẽo, nhưng mà anh cũng biết làm trò con bò cho
        em vui đó nha. Anh còn biết học nấu ăn, biết đàn hát, biết đi làm kiếm
        xiền mua đồ ăn vặt nựa. Nhưng anh cũng có vài khuyết điểm. Nói về con
        người thì anh hơi nhỏ con, hông có cao to 8 múi như con nhà người ta.
        Nhưng anh có thể bảo vệ em theo cách khác, của riêng anh 🙈 Nói về học
        thì anh tự học hầu hết mọi thứ nên anh hông có nhiều bằng cấp như bao
        người. Nhưng mà hiện tại công việc anh cũng đã rất ổn và anh lo đc cho
        gia đình rồi nên anh nghĩ đó cũng hông còn là vấn đề lớn nữaa. <br />{' '}
        Anh nghĩ mình xứng đáng có một cơ hội để theo đuổi Minteau, được khummm!
      </Paragraph>

      <div className="grid grid-cols-2 gap-6">
        {!accepted ? (
          <Button variant="success" onClick={() => setAccepted(true)}>
            Xứng đáng có 01 cơ hội 😂
          </Button>
        ) : (
          <Paragraph className="col-span-2">
            Chúc em thi tốt!!
            <br />
            Có trà vải phúc long và có cả minthon 😜
          </Paragraph>
        )}
        {showNo && (
          <Button variant="error" onClick={() => setShowNo(false)}>
            Khummmmmm
          </Button>
        )}
      </div>

      <Button
        variant="dark"
        className="w-full mt-3"
        onClick={() => router.push(routes.greeting())}
      >
        Trở về
      </Button>
      <Button
        variant="dark"
        className="w-full mt-3"
        onClick={() => router.push(routes.home())}
      >
        Trang chủ
      </Button>

      <style jsx>{`
        .mainImg {
          width: 60vw;
          height: 40vw;
        }

        @media (min-width: 768px) {
          .mainImg {
            width: 18vw;
            height: 12vw;
          }
        }
      `}</style>
    </div>
  );
}

ChanceQuestion.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default ChanceQuestion;
