import {Button} from '@/app/components/ui/Button';
import {useUser} from '@/app/hooks/auth/useUser';
import useClickOutside from '@/app/hooks/useClickOutside';
import {useQueryClient} from '@tanstack/react-query';
import {deleteCookie} from 'cookies-next';
import {AnimatePresence, motion} from 'motion/react';
import {useRouter} from 'next/navigation';
import {useRef, useState, RefObject} from 'react';
import {IoLogOutOutline} from 'react-icons/io5';

export default function ProfileDropdown() {
  const dropdownRef = useRef<any>(null) as RefObject<any>;
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const {data: user} = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    deleteCookie('tracka-user');
    deleteCookie('tracka-token');
    router.replace('/auth');
    queryClient.invalidateQueries();
  };

  useClickOutside(dropdownRef, () => setShowProfileDropdown(false));

  return (
    <div ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        className="grid place-content-center w-4 h-4 p-4 aspect-square rounded-full bg-gray-300 text-foreground capitalize cursor-pointer"
      >
        {user?.name?.charAt(0)}
      </button>

      <AnimatePresence>
        {showProfileDropdown && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.6,
            }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              type: 'spring',
            }}
            animate={{
              opacity: 1,
              scale: [1.06, 1],
              transformOrigin: 'top right',
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            className="squircle border-2 border-gray-300 dark:border-gray-500 rounded-lg w-fit p-3 absolute top-full right-0 mt-2 z-50 bg-background text-foreground dark:bg-foreground dark:text-background"
          >
            <p className="text-sm text-center font-semibold">{user?.name}</p>
            <small className="block my-3">{user?.email}</small>

            <Button
              onClick={handleLogout}
              label="Log out"
              icon={<IoLogOutOutline size={20} />}
              className="!rounded-full !font-normal !text-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
