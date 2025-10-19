import {useState} from 'react';
import {Button} from '@/app/components/ui/Button';
import {FormInput} from '@/app/components/ui/FormInput';
import {FiLock} from 'react-icons/fi';
import {HiOutlineMail} from 'react-icons/hi';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {signInSchema} from '@/validations/auth';
import {RiEyeCloseLine, RiEyeLine} from 'react-icons/ri';
import {useAuth} from '@/app/hooks/auth/useAuth';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {signInMutation} = useAuth();
  const router = useRouter();

  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: {email: string; password: string}) => {
    signInMutation.mutate(data, {
      onSuccess() {
        router.replace('/dashboard');
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-4">
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          leftIcon={<HiOutlineMail size={20} />}
          {...register('email')}
          error={errors.email?.message?.toString()}
        />
      </div>

      <div className="mb-4">
        <FormInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          leftIcon={<FiLock size={20} />}
          error={errors.password?.message?.toString()}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <RiEyeCloseLine size={20} />
              ) : (
                <RiEyeLine size={20} />
              )}
            </button>
          }
          {...register('password')}
        />
        <button
          className="bg-transparent border-none outline-none ml-auto block mt-2 text-sm"
          type="button"
          onClick={() => console.log('Do nothing 😏')}
        >
          <span className="">Forgot password?</span>
        </button>
      </div>

      <div className="mt-6">
        <Button label="Sign In" loading={signInMutation.isPending} />
      </div>
    </form>
  );
}
