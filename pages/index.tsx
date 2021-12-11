import { useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { apiClient, toast } from 'helpers';

export default function Home() {
  const pwdRef = useRef();
  const [phase, setPhase] = useState(1);

  const [showNo, setShowNo] = useState(true);
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = async () => {
    try {
      const pwdValue = (pwdRef.current as any).value;
      await apiClient.post.auth({ pwd: pwdValue });
      toast.success('Chúc mừng đồng chí đã nhập đúng mật khẩu');
    } catch (err) {
      toast.info('Sai mật khẩu rồi đồng chí ơiii');
    }
  };

  return (
    <>
      <Head>
        <title>For Minteau</title>
      </Head>

      {phase === 1 && (
        <div
          className="container px-12 py-4 flex flex-col items-center justify-center"
          style={{ height: '100vh' }}
        >
          <div
            className="rounded-full overflow-hidden relative"
            style={{ width: 160, height: 160 }}
          >
            <Image
              src="/images/minteau.jpeg"
              layout="fill"
              className="rounded"
            />
          </div>

          <div className="space-y-3">
            <div className="text-sm font-normal text-gray-500 mt-6">
              Mật khẩu là nước uống yêu thích của em, viết liền không dấu
            </div>

            <input
              ref={pwdRef}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="password"
              placeholder="Mời yangho nhập mật khẩu"
            />

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={handleSubmit}
            >
              Dzoooooooo
            </button>
          </div>
        </div>
      )}

      {/* {phase === 2 && (
        <div className="p-5">
          <h1 className="text-lg font-medium mb-3">Chào Minteau,</h1>
          <p className="text-base font-light leading-7">
            Là lmint đây!
            <br />
            Anh được biết là em đang thi và anh hông biết tặng gì để chúc em đạt
            được kết quả tốt nữa. Hôm nay rảnh rỗi, anh ngồi làm cái ứng dụng
            nhỏ nhỏ xàm xí này mong em được vui và qua nó anh muốn gửi lời chúc
            tới em mong em những điều tốt đẹp nhứttt
          </p>
          <div
            className="relative mx-auto"
            style={{ width: '60vw', height: '64vw' }}
          >
            <Image src="/images/phuclong.png" layout="fill" />
          </div>

          <p className="text-base font-light leading-7">
            Tui để ly trà vải ở đây, đợi khi nào hết dịch và ai đó đạt được điểm
            cao thì tới lấy nha nha! Sẵn tiện tui cũng có đôi lời xàm xí... Bạn
            nào dễ thương muốn xem tiếp thì cứ ấn cái nút xanh xanh ở dưới nhó
            😜
          </p>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-5"
            onClick={() => setPhase(3)}
          >
            Hm... đọc tiếp
          </button>
          <p
            className="text-blue-600 mt-3 w-full text-center"
            onClick={() => setPhase(1)}
          >
            Trở về
          </p>
        </div>
      )}

      {phase === 3 && (
        <div className="p-5">
          <h1 className="text-lg font-medium mb-3">Đôi lời xàm xí,</h1>
          <p className="text-base font-light leading-7">
            Hm... Em đã bước qua một vài câu chuyện buồn, và vài điều không đáng
            để nhớ. Anh ở đây mong được làm bạn với em, làm trò cùng em mong một
            ngày nào đó cho em có được một câu chuyện tốt đẹp hơn 👊🏼👊🏼
          </p>
          <p className="text-base font-light leading-7">
            Tuy anh là một IT nhạt nhẽo, nhưng mà anh cũng biết làm trò con bò
            cho em vui đó nha. Anh còn biết học nấu ăn, biết đàn hát, biết đi
            làm kiếm xiền mua đồ ăn vặt nựa. Nhưng anh cũng có vài khuyết điểm.
            Nói về con người thì anh hơi nhỏ con, hông có cao to 8 múi như con
            nhà người ta. Nhưng anh có thể bảo vệ em theo cách khác, của riêng
            anh 🙈 Nói về học thì anh tự học hầu hết mọi thứ nên anh hông có
            nhiều bằng cấp như bao người. Nhưng mà hiện tại công việc anh cũng
            đã rất ổn và anh lo đc cho gia đình rồi nên anh nghĩ đó cũng hông
            còn là vấn đề lớn nữaa. <br /> Anh nghĩ mình xứng đáng có một cơ hội
            để theo đuổi Minteau, được khummm!
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
            onClick={() => setPhase(2)}
          >
            Trở về
          </p>
        </div>
      )} */}
    </>
  );
}
