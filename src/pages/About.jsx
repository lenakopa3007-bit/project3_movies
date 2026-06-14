import { Container, Section, Title, Description, SubTitle, List, ListItem, Highlight, PhotoWrapper, Photo } from './About.styled';

export default function About() {
  return (
    <Container>
      <Section style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* блок із фотографією без жодних імпортів */}
        <PhotoWrapper>
          <Photo src={`${process.env.PUBLIC_URL}/my_foto.webp`} alt="My profile" />
        </PhotoWrapper>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <Title>About Me</Title>
          <Description>
            I am an enthusiastic <Highlight>Front-End Student</Highlight> with a passion for building clean, 
            interactive, and user-friendly web applications. My journey into web development starts with a 
            solid foundation in HTML5, CSS, and modern JavaScript.
          </Description>
          <Description>
            Currently, I am deeply focused on mastering React, managing application state, and styling 
            components using Emotion / Styled Components. I am comfortable working with modern development 
            tools like GitHub and ESLint to write clean, maintainable code.
          </Description>
          <Description>
            In addition to coding, <Highlight>I have successfully completed web design courses</Highlight>. 
            This UI/UX background helps me look at projects from both sides: writing high-quality logical 
            code while ensuring the layout remains pixel-perfect, visually appealing, and intuitive for users.
          </Description>
        </div>
      </Section>

      <Section>
        <SubTitle>My Technical Toolkit</SubTitle>
        <List>
          <ListItem><strong>Core:</strong> HTML5, CSS, SCSS, JavaScript</ListItem>
          <ListItem><strong>Design:</strong> UI/UX Design, Figma, Wireframing, Typography</ListItem>
          <ListItem><strong>Libraries & Frameworks:</strong> React, React vite</ListItem>
          <ListItem><strong>Styling:</strong> Styled Components, CSS Grid & Flexbox</ListItem>
          <ListItem><strong>Tools:</strong> GitHub, VS Code</ListItem>
        </List>
      </Section>
    </Container>
  );
}