import { useTranslation } from 'react-i18next';

export function Todo() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>Todo</h1>

      <p>Todo list will be here</p>
      <ul>
        <li>Todo 1</li>
        <li>Todo 2</li>
        <li>Todo 3</li>
      </ul>
    </div>
  );
}

export default Todo;
