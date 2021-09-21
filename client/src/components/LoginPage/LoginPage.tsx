import React from "react";
import googleImage from "../../assets/google.jpg";
import githubIcon from "../../assets/githubIcon.png";
import twitterIcon from "../../assets/twitterIcon.png";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const googleLogin = () => {
        window.open("http://localhost:4000/auth/google", "_self");
    };
    const githubLogin = () => {
        window.open("http://localhost:4000/auth/github", "_self");
    };
    const twitterLogin = () => {
        window.location.href = "http://localhost:4000/auth/twitter";
    };

    return (
        <div className={styles.loginPage}>
            <h1>Login</h1>

            <div className={styles.loginForm}>
                <div className={styles.googleContainer} onClick={googleLogin}>
                    <img src={googleImage} alt="Google icon" />
                    <p>Login with Google</p>
                </div>
                <div
                    className={`${styles.googleContainer} ${styles.githubContainer}`}
                    onClick={githubLogin}
                >
                    <img src={githubIcon} alt="Github icon" />
                    <p>Login with Github</p>
                </div>
                <div
                    className={`${styles.googleContainer} ${styles.twitterContainer}`}
                    onClick={twitterLogin}
                >
                    <img src={twitterIcon} alt="Twitter icon" />
                    <p>Login with Twitter</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
