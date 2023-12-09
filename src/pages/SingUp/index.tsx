import Alert from '@/components/Alert';
import Input from '@/components/Input';
import PasswordCheckStatus from '@/components/PasswordCheckStatus';
import Steps from '@/components/Steps';
import Button from '@/components/ui/Button';
import RenderIf from '@/components/ui/RenderIf';
import { useAppDispatch, useAppSelector } from '@/store';
import { createUser } from '@/store/reducers/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createUserSchema } from './schema';

type userFields = z.infer<typeof createUserSchema>;
const SingUp = () => {
  const { error, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<userFields>({
    resolver: zodResolver(createUserSchema),
    mode: 'onChange',
    defaultValues: {
      name: ' general user',
      email: 'f@g.com',
      password: '434#fffFFF',
      confirmPassword: '434#fffFFF'
    }
  });

  const onSubmit = async (data: userFields) => {
    const response = await dispatch(
      createUser({
        email: data.email,
        name: data.name,
        password: data.password
      })
    );
    console.log(response);
  };

  return (
    <div className="flex bg-slate-100  ">
      <div className="container h-full grid grid-cols-12 p-16">
        <div className="hidden sm:flex sm:col-span-5  h-full bg-black/10 rounded-3xl"></div>
        <div className=" col-span-12 sm:col-span-7 px-12 ">
          <Steps step={1} stepQuantity={4} />
          <h1 className="text-3xl font-bold text-zinc-900 mt-6">Assuma ocontrole do seu salário</h1>
          <p className="text-zinc-400 mt-2">Cuidar do seu dinheiro pode ser simples.</p>
          <div className="mt-8 space-y-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Como você se chama?"
                  name="name"
                  placeholder="Jhon Textor"
                  onChange={onChange}
                  value={value}
                  error={!!errors?.name}
                  helperText={errors?.name?.message}
                />
              )}
            />
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
                  type="password"
                  onChange={onChange}
                  value={value}
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                  passwordCheck={<PasswordCheckStatus password={value} />}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Confirme sua senha"
                  name="confirmPassword"
                  placeholder="**********"
                  type="password"
                  onChange={onChange}
                  value={value}
                  error={!!errors?.confirmPassword}
                  helperText={errors?.confirmPassword?.message}
                  passwordCheck={<PasswordCheckStatus password={value} />}
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
          <div className="flex justify-end pt-8">
            <Button disabled={!isValid} onClick={handleSubmit(onSubmit)} isLoading={loading}>
              Criar minha conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
