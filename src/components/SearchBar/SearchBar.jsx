import { Form, Input, Button } from "./SearchBar.styled";

// Додаємо проп value, який за замовчуванням буде порожнім рядком
export default function SearchBar({ onSubmit, value = "" }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.name.value.trim();
    console.log(inputValue);
    
    if (inputValue !== "") {
      onSubmit(inputValue);
    }      
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="name"
        type="text"
        aria-label="movie_search"
        placeholder="Введіть назву фільму..." // підказка!
        defaultValue={value} // Використовуємо defaultValue, щоб підставити текст із URL-адреси
        key={value} // Це змусить інпут оновитися, якщо ми прийшли з іншої сторінки
      />
      <Button type='submit'>Search</Button>
    </Form>
  );
}