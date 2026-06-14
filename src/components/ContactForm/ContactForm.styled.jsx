import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const FormWrapper = styled(motion.div)`
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;

  /* Ефект скла */
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  
  /* Мультяшна м'якість */
  border-radius: 25px; 
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 15px;
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333; /* Початковий колір тексту */
  transition: all 0.3s ease;

  &:hover {
    border-color: #4169e1;
    color: #000;
  }

  /* Ефект при наведенні мишкою */
  &:hover {
    border-color: #4169e1;
    color: #000; /* Текст стає чорнішим при наведенні */
  }

    /* Ефект при кліку (фокусі) */
  &:focus {
    outline: none;
    border-color: #4169e1;
    color: #000; /* Текст стає чорнішим при введенні */
    box-shadow: 0 0 5px rgba(65, 105, 225, 0.3);
  }

  /* Для зміни кольору тексту placeholder (сірий за замовчуванням) */
  &::placeholder {
    color: #999;
    transition: color 0.3s ease;
  }

  &:hover::placeholder {
    color: #666; /* Placeholder стає темнішим при наведенні */
  }
`;

export const Button = styled.button`
  padding: 15px 30px;
  background-color: #4169e1; /* Основний колір */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  
  /* Плавність переходу для всіх змін */
  transition: background 0.3s, transform 0.2s ease;

  &:hover {
    background-color: #3351c4; /* Стає темнішим при наведенні */
    /* Зміщення вгору на 5 пікселів */
    transform: translateY(-5px);
  }

  /* Додатково: ефект при натисканні (щоб кнопка "присідала") */
  &:active {
    transform: translateY(0);
  }
`;