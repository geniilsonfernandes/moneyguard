import { SignIn } from '@clerk/clerk-react';

const SingIn = () => {
  return (
    <div className="flex justify-center items-center bg-slate-100 h-screen">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
};

export default SingIn;
