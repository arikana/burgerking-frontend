// Vercel에 배포된 Flask 백엔드 URL
const backendUrl = 'https://burgerking-b1l2xcuyz-arikanas-projects.vercel.app/';

async function recommendMenu() {
  const budget = document.getElementById('budget').value;
  const resultElement = document.getElementById('result');

  // 예산 값이 없는 경우 처리
  if (!budget) {
    resultElement.innerHTML = '예산을 입력해 주세요.';
    return;
  }

  try {
    // API 요청 보내기
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // CORS 모드 설정
      body: JSON.stringify({ budget: parseInt(budget) }),
    });

    // 응답 처리
    if (!response.ok) {
      throw new Error('서버에서 응답을 받지 못했습니다.');
    }

    const data = await response.json();

    // 추천 결과 표시
    if (data.name) {
      resultElement.innerHTML = `추천 메뉴: ${data.name} (가격: ${data.price} 원)`;
    } else {
      resultElement.innerHTML = `추천할 메뉴가 없습니다.`;
    }
  } catch (error) {
    console.error('에러:', error);
    resultElement.innerHTML = '메뉴 추천 중 오류가 발생했습니다. 다시 시도해 주세요.';
  }
}
