import { useState } from 'react';

import Alert from '@/components/Alert';
import Input, { ValueInput } from '@/components/Input';
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

import bannerLogin from '@/assets/4x/money_guard_banner_login.png';
import Logo from '@/components/Logo';
import { useNavigate } from 'react-router-dom';

type userFields = z.infer<typeof createUserSchema>;
const SingUp = () => {
  const navigate = useNavigate();
  const { error, loading } = useAppSelector((state) => state.auth);
  const [stepCounter, setstepCounter] = useState(1);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<userFields>({
    resolver: zodResolver(createUserSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: userFields) => {
    await dispatch(
      createUser({
        email: data.email,
        name: data.name,
        password: data.password,
        monthlyBudget: data.monthlyBudget
      })
    );
  };

  return (
    <div className="flexs  ">
      <div className="container h-full grid grid-cols-12 py-12 sm:p-16">
        <div className="hidden sm:flex flex-col justify-between sm:col-span-5 h-[70vh] rounded-3xl">
          <Logo />
          <img
            src={bannerLogin}
            alt="banner login"
            className="object-contain w-[100%] h-[350px]  "
            loading="lazy"
          />
        </div>
        <div className=" col-span-12 sm:col-span-7 px-12">
          <Steps step={stepCounter} stepQuantity={3} />

          <RenderIf condition={stepCounter === 1}>
            <div className="h-[80vh] flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900 mt-6">
                  Assuma ocontrole do seu salário
                </h1>
                <p className="text-zinc-400 mt-2">
                  Cuidar do seu dinheiro pode ser
                  <br /> simples, <b>crie sua conta gratuitamente.</b>
                </p>
              </div>

              <div className="mt-8 flex flex-row gap-4 justify-end">
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate('/sign-in');
                  }}>
                  Já tenho uma conta
                </Button>
                <Button variant="fill" onClick={() => setstepCounter(2)}>
                  {' '}
                  Assuma o controle
                </Button>
              </div>
            </div>
          </RenderIf>

          <RenderIf condition={stepCounter === 2} className="h-[90%] flex flex-col justify-between">
            <h1 className="text-3xl font-bold text-zinc-900 mt-6">Vamos iniciar sua conta</h1>
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

            <div className="flex justify-end pt-8">
              <Button variant="ghost" onClick={() => setstepCounter(1)}>
                Voltar
              </Button>

              <Button onClick={() => setstepCounter(3)}>Próxima etapa</Button>
            </div>
          </RenderIf>

          <RenderIf condition={stepCounter === 3}>
            <div className="h-[80vh] flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900 mt-6">
                  Última etapa {watch('name')}
                </h1>
                <p className="text-zinc-400 mt-2">
                  Vamos iniciar sua conta, Definar por favor um limite de gastos mensal
                </p>

                <div className="mt-8">
                  <Controller
                    control={control}
                    name="monthlyBudget"
                    render={({ field: { onChange, value } }) => (
                      <ValueInput
                        label="Limite de gastos mensal"
                        onChange={onChange}
                        value={value}
                        error={!!errors?.monthlyBudget}
                        helperText={errors?.monthlyBudget?.message}
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
                <RenderIf condition={Object.keys(errors).length > 0} className="my-4">
                  <Alert
                    variant="danger"
                    title="Atenção!"
                    description="alguns campos precisam ser preenchidos corretamente"
                    body={
                      <div>
                        {Object.values(errors).map((error) => (
                          <p key={error.message}>
                            {error.root?.type} {error.message}
                          </p>
                        ))}
                      </div>
                    }
                  />
                </RenderIf>
              </div>
              <div className="flex justify-end pt-8 gap-4">
                <Button variant="ghost" onClick={() => setstepCounter(2)}>
                  Revisar meus dados
                </Button>
                <Button disabled={!isValid} onClick={handleSubmit(onSubmit)} isLoading={loading}>
                  Criar minha conta
                </Button>
              </div>
            </div>
          </RenderIf>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
