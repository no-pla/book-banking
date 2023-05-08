import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { useQueryClient } from "react-query";
import useUser from "@/components/Hooks/useUser";

export default function Home({ currentUser }: any) {
  const queryClient = useQueryClient();
  const userInfo = useUser(currentUser?.uid);

  useEffect(() => {
    queryClient.invalidateQueries("getReadBookInfo");
  }, []);

  return (
    <InfoContainer>
      <UserInfo>
        <Image
          src="https://user-images.githubusercontent.com/88391843/236830698-34b4cb1d-da10-4d6d-858e-f370ec613dff.jpg" // 임시값
          height={100}
          width={100}
          alt={currentUser?.display}
          style={{ borderRadius: "50%" }}
        />
        <div>{currentUser?.displayName || "닉네임 없음"}</div>
        <Link href="/user/setting">⚙️ 프로필 설정</Link>
      </UserInfo>
      <BankingInfo>
        <BankingName>
          {currentUser?.displayName || "닉네임 없음"}&nbsp;님의 독서 통장
        </BankingName>
        <TotalAmount>
          {userInfo
            ?.reduce((cur: number, acc: any) => {
              return cur + acc.price;
            }, 0)
            .toLocaleString("ko-KR") || 0}
          원
        </TotalAmount>
        <BankingType>
          <Link href="/banking">내역 보기</Link>
          <Link href="/banking/deposit">입금하기</Link>
        </BankingType>
      </BankingInfo>
    </InfoContainer>
  );
}

const InfoContainer = styled.section`
  display: flex;
  flex-direction: row;
  height: 100vh;
  padding: 20px 12px 4px 12px;
  gap: 12px;
  box-sizing: border-box;
  width: 100vw;

  @media (max-width: 600px) {
    flex-direction: column;
    margin-top: 60px;
  }
`;

const UserInfo = styled.section`
  background-color: var(--main-color);
  box-sizing: border-box;
  border-radius: 12px;
  height: calc(min(36%, 300px));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 40%;
  @media (max-width: 600px) {
    height: 32%;
    width: 100%;
  }
`;

const BankingInfo = styled.section`
  width: 60%;
  background-color: var(--main-color);
  box-sizing: border-box;
  border-radius: 12px;
  height: calc(min(36%, 300px));
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 600px;
  justify-content: space-around;
  @media (max-width: 600px) {
    height: 32%;
    width: 100%;
  }
`;

const BankingType = styled.div`
  display: flex;
  > a:first-of-type::after {
    content: "|";
    padding: 0 12px;
  }
`;

export const TotalAmount = styled.span`
  font-weight: 800;
  font-size: 2rem;
`;

const BankingName = styled.div`
  text-align: left;
  width: 100%;
  margin-left: 48px;
`;
