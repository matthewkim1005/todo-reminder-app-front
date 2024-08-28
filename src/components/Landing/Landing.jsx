import styles from './Landing.module.css';

const Landing = () => {
  return (
    <main className={styles.landing}>
      <div>
        <h1>Todo & Reminder Application</h1>
        <h3>
          Please sign in or sign up if you do not have an account!
        </h3>
      </div>
    </main>
  );
};

export default Landing;
