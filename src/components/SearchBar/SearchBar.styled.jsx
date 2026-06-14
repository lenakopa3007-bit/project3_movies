import styled from "@emotion/styled";

export const Form = styled.form`
  display: inline-flex;
  align-items: center;
  position: relative;
  margin-bottom: 24px;
  margin-top: 10px;
`;

export const Input = styled.input`
  padding: 10px 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  font-family: inherit; /* Автоматично підтягує наш Montserrat */
  font-size: 16px;
  width: 280px;
  margin-right: 12px;

  /* Стиль тексту підказки (placeholder) */
  &::placeholder {
    color: #999;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background-color: #4169e1; 
  color: white;
  font-size: 16px;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Робить перехід кольору плавним */

  /* Ефект наведення мишки на кнопку (Ховер) */
  &:hover {
    background-color: #3152c9; /* Кнопка стає трохи темнішою */
  }
`;