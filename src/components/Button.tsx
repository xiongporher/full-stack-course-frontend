// components/Button.tsx
import styles from "../styles/modules/Button.module.css";
const Button: React.FC<{ label: string }> = ({ label }) => {
  return <button className={styles.button}>{label}</button>;
};
export default Button;
