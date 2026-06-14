import styled from "@emotion/styled";
import { NavLink, Link } from "react-router-dom";

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0;
`;

/*export const Header = styled.header`
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 24px;
  background-color: #ffffff;
`;*/

export const HeaderGrid = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 16px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 680px) {
    flex-direction: column;
    gap: 12px;
    padding: 12px 16px;
  }
`;

export const HeaderContainer = styled('header', {
  shouldForwardProp: prop => prop !== '$isDark',
})`
  position: sticky; /* Фіксує елемент */
  top: 0;           /* Притискає до самого верху */
  z-index: 1000;    /* Гарантує, що хедер буде над усіма іншими елементами */
  
  width: 100%;

  /* Додаємо матове скло */
  background-color: ${({ $isDark }) => $isDark 
    ? 'rgba(26, 26, 46, 0.8)' 
    : 'rgba(255, 255, 255, 0.6)'};
  backdrop-filter: blur(10px); 
  border-bottom: 1px solid ${({ $isDark }) => $isDark 
    ? 'rgba(255,255,255,0.1)' 
    : 'rgba(255, 255, 255, 0.3)'};
  padding: 20px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Легка тінь для виділення */
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center; /* Центруємо картинку */
  flex-shrink: 0;
  text-decoration: none;
  cursor: pointer;
  position: relative; 
  z-index: 10;
  /* Фіксуємо розмір "квадрата" */
  width: 65px;  
  height: 40px; 

  /* Видаляємо фоновий колір за замовчуванням */
  background-color: transparent;  
  transition: all 0.3s ease;  

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;    

    /* Додаємо заокруглені кути */
    border-radius: 8px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  flex-grow: 1; 
`;

export const LinkStyled = styled(NavLink , {
  shouldForwardProp: prop => prop !== '$isDark',
})`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: ${({ $isDark }) => $isDark ? '#e0e0e0' : 'black'};
  font-size: 20px; 
  font-weight: 600;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    color: #4169e1;           
    background-color: ${({ $isDark }) => $isDark ? 'rgba(65,105,225,0.2)' : '#e8f0fe'};
    transform: scale(1.1);
  }
    
  &.active {
    color: white;
    background-color: #4169e1; 
  }
    
`;

export const SocialLinks = styled('div', {
  shouldForwardProp: prop => prop !== '$isDark',
})`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;

  a {
    color: ${({ $isDark }) => $isDark ? '#e0e0e0' : '#333'};
    font-size: 36px;
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;    

    &:hover {
      color: #4169e1;
      transform: scale(1.1);
    }
  }
`;

export const FooterContainer = styled('footer', {
  shouldForwardProp: prop => prop !== '$isDark',
})`
  margin-top: auto;
  padding: 20px 0;
  
  /* Додаємо матове скло */
  background-color: ${({ $isDark }) => $isDark 
    ? 'rgba(26, 26, 46, 0.8)' 
    : 'rgba(255, 255, 255, 0.6)'};
  backdrop-filter: blur(10px);
  border-top: 1px solid ${({ $isDark }) => $isDark 
    ? 'rgba(255,255,255,0.1)' 
    : 'rgba(255, 255, 255, 0.3)'};
  transition: background-color 0.3s ease;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  width: 100%;
  padding-bottom: 16px;
  position: relative;

  @media (max-width: 680px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const FooterLinks = styled('div', {
  shouldForwardProp: prop => prop !== '$isDark',
})`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    color: ${({ $isDark }) => $isDark ? '#e0e0e0' : '#333'};
    font-size: 36px; 
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: transform 0.3s ease;

    &:hover {
      color: #4169e1;
      transform: scale(1.1);
    }
  }
`;

export const FooterText = styled('p', {
  shouldForwardProp: prop => prop !== '$isDark',
})`
  font-size: 15px;
  color: ${({ $isDark }) => $isDark ? '#aaaaaa' : '#666666'};
  font-weight: 500;
  margin: 0;
  text-align: center;
  width: 100%;
  border-top: 1px solid ${({ $isDark }) => $isDark ? '#333' : '#f0f0f0'};
  padding-top: 12px;
  transition: color 0.3s ease;
`;

