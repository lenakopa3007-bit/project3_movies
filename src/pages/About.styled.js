import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: inherit;
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 700;
`;

export const SubTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
  font-weight: 600;
  border-bottom: 2px solid #4169e1;
  padding-bottom: 8px;
  display: inline-block;
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 16px;
`;

export const Highlight = styled.span`
  color: #4169e1;
  font-weight: 600;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;

  &::before {
    content: "⚡";
    position: absolute;
    left: 0;
    color: #4169e1;
  }
`;

export const PhotoWrapper = styled.div`
  flex-shrink: 0;
  width: 250px;
  height: 250px;
  border-radius: 50%; /* Робить фото круглим */
  overflow: hidden;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* красива тінь */
  border: 2px solid #e0e0e0; /* Тонка світло-сіра рамка */
  
  @media (max-width: 768px) {
    margin: 0 auto 20px auto;
  }
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;