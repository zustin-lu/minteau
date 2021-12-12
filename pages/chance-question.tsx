import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';

import { routes } from 'constant';
import UserLayout from 'components/layouts/user';

export default function ChanceQuestion() {
  const router = useRouter();
  const [showNo, setShowNo] = useState(true);
  const [accepted, setAccepted] = useState(false);

  return (
    <div>
      <h1 className="text-lg font-medium mb-3">Đôi lời xàm xí,</h1>
      <p className="text-base font-light leading-7">
        Hm... Em đã bước qua một vài câu chuyện buồn, và vài điều không đáng để
        nhớ. Anh ở đây mong được làm bạn với em, làm trò cùng em mong một ngày
        nào đó cho em có được một câu chuyện tốt đẹp hơn 👊🏼👊🏼
      </p>
      <p className="text-base font-light leading-7">
        Tuy anh là một IT nhạt nhẽo, nhưng mà anh cũng biết làm trò con bò cho
        em vui đó nha. Anh còn biết học nấu ăn, biết đàn hát, biết đi làm kiếm
        xiền mua đồ ăn vặt nựa. Nhưng anh cũng có vài khuyết điểm. Nói về con
        người thì anh hơi nhỏ con, hông có cao to 8 múi như con nhà người ta.
        Nhưng anh có thể bảo vệ em theo cách khác, của riêng anh 🙈 Nói về học
        thì anh tự học hầu hết mọi thứ nên anh hông có nhiều bằng cấp như bao
        người. Nhưng mà hiện tại công việc anh cũng đã rất ổn và anh lo đc cho
        gia đình rồi nên anh nghĩ đó cũng hông còn là vấn đề lớn nữaa. <br />{' '}
        Anh nghĩ mình xứng đáng có một cơ hội để theo đuổi Minteau, được khummm!
      </p>

      {!accepted ? (
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full mt-3"
          onClick={() => setAccepted(true)}
        >
          Xứng đáng có 01 cơ hội 😂
        </button>
      ) : (
        <>
          <p className="text-base font-light leading-7 mt-3">
            Chúc em thi tốt!!
            <br />
            Có phúc long và có cả anh 😜
          </p>
        </>
      )}
      {showNo && (
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full mt-3 "
          onClick={() => setShowNo(false)}
        >
          Khummmmmm
        </button>
      )}

      <p
        className="text-blue-600 mt-3 w-full text-center"
        onClick={() => router.push(routes.greeting())}
      >
        Trở về
      </p>
    </div>
  );
}

ChanceQuestion.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
