import { GoogleLoginButton } from "react-social-login-buttons"
import { useRouter } from 'next/router';

const GOOGLE_AUTH_URL = process.env.GOOGLE_AUTH;
// ----------------------------------------------------------------------

export default function LoginForm() {
    const { push } = useRouter();

    const onGoogleLogin = () => {
        if (GOOGLE_AUTH_URL)
            push(GOOGLE_AUTH_URL);
        else console.error("GOOGLE_AUTH_URL is not provided");
    }

    return (
        <GoogleLoginButton align='center' onClick={onGoogleLogin}>
            Sign in with Google
        </GoogleLoginButton>
    );
}
