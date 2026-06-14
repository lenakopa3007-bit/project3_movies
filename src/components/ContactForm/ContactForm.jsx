
import { FormWrapper, Input, Button } from './ContactForm.styled';

export const ContactForm = () => {
  return (
    <FormWrapper
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>GET IN TOUCH</h2>
      <Input type="text" placeholder="Your Name" />
      <Input type="email" placeholder="Email" />
      <Button type="submit">SUBMIT</Button>
    </FormWrapper>
  );
};