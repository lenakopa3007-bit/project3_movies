import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useTheme } from 'context/ThemeContext'; 
// Імпортуємо компоненти, які реально існують у файлі стилів
import { 
  Container, 
  HeaderContainer, 
  HeaderGrid, 
  LogoLink, 
  Nav, 
  LinkStyled, 
  SocialLinks, 
  FooterContainer, 
  FooterContent, 
  FooterText, 
  FooterLinks 
} from './SharedLayout.styled.jsx';

function SharedLayout() {
  const { isDark, toggleTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  // Міняємо фон body при зміні теми
  useEffect(() => {
    document.body.style.background = isDark
      ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)'
      : 'linear-gradient(180deg, #9dc0f6 0%, #d1e3ff 100%)';
    document.body.style.backgroundAttachment = 'fixed';
  }, [isDark]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <HeaderContainer $isDark={isDark}>
        <HeaderGrid>
          <LogoLink to="/">
            <img src={`${process.env.PUBLIC_URL}/apple-touch-icon.png`} alt="Logo" />
          </LogoLink>

          <Nav>
            {/* Використовуємо LinkStyled замість Link */}
            <LinkStyled to="/" end $isDark={isDark}>Home</LinkStyled>
            <LinkStyled to="/movies" $isDark={isDark}>Movies</LinkStyled>
            <LinkStyled to="/about" $isDark={isDark}>About me</LinkStyled>       
          </Nav>

          <SocialLinks $isDark={isDark}>
            {/* Кнопка перемикання теми */}
            <button onClick={toggleTheme} style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '28px',
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.3s ease',
            }}>
              {isDark ? '☀️' : '🌙'}
            </button>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </SocialLinks>
        </HeaderGrid>
      </HeaderContainer>
      
      <main style={{ flex: '1 0 auto', background: 'inherit',}}>
        <Container>
          <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '20px' }}>Loading page...</div>}>
            <Outlet />
          </Suspense>
        </Container>
      </main>

      <FooterContainer $isDark={isDark}>
        <Container>
          <FooterContent>
            <LogoLink to="/">
              <img src={`${process.env.PUBLIC_URL}/apple-touch-icon.png`} alt="Logo" />
            </LogoLink>

            <FooterLinks $isDark={isDark}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            </FooterLinks>
          </FooterContent>

          <FooterText $isDark={isDark}>
            &copy; {currentYear} MovieSearch. All rights reserved.
          </FooterText>
        </Container>
      </FooterContainer>

    </div>
  );
}

export default SharedLayout;