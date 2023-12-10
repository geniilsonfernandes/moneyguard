import Input from '@/components/Input';
import Button from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store';
import { loginUser } from '@/store/reducers/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createUserSchema } from './schema';

import bannerLogin from '@/assets/4x/money_guard_banner_login.png';
import Alert from '@/components/Alert';
import Logo from '@/components/Logo';
import RenderIf from '@/components/ui/RenderIf';
import { useNavigate } from 'react-router-dom';

type userFields = z.infer<typeof createUserSchema>;
const SingUp = () => {
  const navigate = useNavigate();
  const { error, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,

    formState: { errors, isValid }
  } = useForm<userFields>({
    resolver: zodResolver(createUserSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: userFields) => {
    await dispatch(loginUser({ email: data.email, password: data.password }));
  };

  return (
    <div className="flex  ">
      <div className="h-full grid grid-cols-12 py-12 sm:p-16">
        <div className="hidden sm:flex flex-col justify-between sm:col-span-5 h-full rounded-3xl">
          <Logo />
          <img
            src={bannerLogin}
            alt="banner login"
            className="object-contain w-[100%] h-[350px]  "
            loading="lazy"
          />
        </div>
        <div className=" col-span-12 sm:col-span-7 px-12">
          <h1 className="text-3xl font-bold text-zinc-900 mt-6">Bem vindo novamente</h1>
          <p className="text-zinc-400 mt-2">Faça o login para continuar</p>
          <div className="mt-8 space-y-4">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="E-mail"
                  name="email"
                  placeholder="JhonTextor@mail.com"
                  onChange={onChange}
                  value={value}
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Senha"
                  name="password"
                  placeholder="**********"
                  recoveryPasswordbutton={() => {}}
                  type="password"
                  onChange={onChange}
                  value={value}
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                />
              )}
            />
          </div>
          <RenderIf condition={!!error} className="my-4">
            <Alert
              variant="danger"
              title="Atenção!"
              description={error?.message || 'Alguma coisa deu errado, tente novamente'}
            />
          </RenderIf>

          <div className="flex lg:flex-row sm:flex-col justify-end pt-8 gap-4">
            <Button variant="ghost" onClick={() => navigate('/sign-up')}>
              Ainda não tenho uma conta
            </Button>
            <Button disabled={!isValid} onClick={handleSubmit(onSubmit)} isLoading={loading}>
              Entrar na minha conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
