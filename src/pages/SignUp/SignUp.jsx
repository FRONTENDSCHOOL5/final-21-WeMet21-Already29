import { useState } from 'react';

import SignUpEmail from './SignUpEmail/SignUpEmail';
import SignUpProfile from './SignUpProfile/SignUpProfile';

export default function SignUp() {
  const [page, setPage] = useState('SignUpEmail');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      {page === 'SignUpEmail' ? (
        <SignUpEmail
          setPage={setPage}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        ></SignUpEmail>
      ) : (
        <SignUpProfile email={email} password={password}></SignUpProfile>
      )}
    </>
  );
}