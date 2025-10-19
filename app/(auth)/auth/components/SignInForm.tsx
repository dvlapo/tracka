import {useState} from 'react';
import {Button} from '@/app/components/ui/Button';
import {FormInput} from '@/app/components/ui/FormInput';
import {FiLock} from 'react-icons/fi';
import {HiOutlineMail} from 'react-icons/hi';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {signInSchema} from '@/validations/auth';
import {RiEyeCloseLine, RiEyeLine} from 'react-icons/ri';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // handle inputs
        console.log(data);
      })}
      className="mt-4"
    >
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
      </div>

      <div className="mt-6">
        <Button label="Sign In" />
      </div>
    </form>
  );
}
