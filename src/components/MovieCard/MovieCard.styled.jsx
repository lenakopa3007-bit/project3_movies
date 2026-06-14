import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
  margin-bottom: 24px;
  align-items: flex-start; /* Притискає елементи до верху, фіксуючи постер */

  /* на мобільному — колонка замість рядка */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 240px;      /* Фіксуємо ширину */
    height: 350px;     /* Задаємо чітку пропорційну висоту для кінопостера */
    object-fit: cover; /* Акуратно підганяє постер під розміри, щоб він не деформувався */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  /* на мобільному картинка на всю ширину */
  @media (max-width: 600px) {
    width: 100%;
    height: auto;
    max-height: 400px;
  }
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  h4 {
    font-size: 18px;
    font-weight: 700;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    margin: 0;
    margin-bottom: 4px;
    color: #444;
  }
`;

export const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 16px;
  color: #111;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const WatchButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-top: 24px;         /* Відступ зверху від жанрів */
  padding: 12px 24px;
  border-radius: 4px;
  background-color: #4169e1;
  color: white;
  font-size: 16px;
  font-family: inherit;
  font-weight: 600;
  text-decoration: none;    /* Прибираємо підкреслення лінку */
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(65, 105, 225, 0.2);

  /* Плавний перехід для фону та трансформації */
  transition: background-color 0.3s ease, transform 0.2s ease;

  /* Ховер-ефект */
  &:hover {
    background-color: #3351c4; /* Темніший синій при наведенні */
    transform: translateY(-5px) scale(1.05); /* Комбінуємо збільшення (1.05 = 105%) та зміщення вгору */  
  }

  &:active {
    transform: translateY(0) scale(1); /* Повернення на місце при кліку */
  }
`;