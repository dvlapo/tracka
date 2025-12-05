import {Dispatch, SetStateAction, useState} from 'react';
import {Button} from '@/app/components/ui/Button';
import {FormInput} from '@/app/components/ui/FormInput';
import {FiLock} from 'react-icons/fi';
import {HiOutlineMail} from 'react-icons/hi';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {signUpSchema} from '@/validations/auth';
import {RiEyeCloseLine, RiEyeLine} from 'react-icons/ri';
import {MdOutlinePerson} from 'react-icons/md';
import {useAuth} from '@/app/hooks/auth/useAuth';
import {toast} from 'sonner';

export default function SignUpForm({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {signUpMutation} = useAuth();

  const {
    register,
    formState: {errors},
    handleSubmit,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: {name: string; email: string; password: string}) => {
    signUpMutation.mutate(data, {
      onSuccess() {
        toast.success(
          'Sign up successful! You can sign in to your account to proceed'
        );
        setActiveTab('Sign In');
        resetForm();
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
          label="Name"
          placeholder="Enter your name"
          leftIcon={<MdOutlinePerson size={20} />}
          {...register('name')}
          error={errors.name?.message?.toString()}
        />
      </div>

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
                <RiEyeLine size={20} />
              ) : (
                <RiEyeCloseLine size={20} />
              )}
            </button>
          }
          {...register('password')}
        />
      </div>

      <div className="mb-4">
        <FormInput
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          leftIcon={<FiLock size={20} />}
          error={errors.confirmPassword?.message?.toString()}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <RiEyeLine size={20} />
              ) : (
                <RiEyeCloseLine size={20} />
              )}
            </button>
          }
          {...register('confirmPassword')}
        />
      </div>

      <div className="mt-6">
        <Button label="Create Account" loading={signUpMutation.isPending} />
      </div>
    </form>
  );
}
