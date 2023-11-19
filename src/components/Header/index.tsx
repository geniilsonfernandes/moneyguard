import useMediaQuery from '@/hooks/useMediaQuery';
import useVisibility from '@/hooks/useVisibility';
import { Bell, LogOut, Menu, Search, Settings, User2, X } from 'lucide-react';
import { HTMLAttributes, useRef } from 'react';

import {
  useAuth, useSession,
} from "@clerk/clerk-react";


type ButtonMenuProps = HTMLAttributes<HTMLButtonElement>;
const ButtonMenu = (props: ButtonMenuProps) => {
  return (
    <button
      className="bg-white rounded-lg  h-[48px] w-[48px] flex justify-center items-center text-zinc-600"
      {...props}>
      {props.children}
    </button>
  );
};

type ButtonMenuListProps = {
  icon: React.ReactNode;
  title: string;
} & HTMLAttributes<HTMLButtonElement>;

const ButtonMenuList = ({ icon, title, ...props }: ButtonMenuListProps) => {
  return (
    <button className="group flex items-center gap-4 w-full rounded-lg  transition" {...props}>
      <div className="w-[48px] h-[48px] flex justify-center items-center border border-slate-200 group-hover:bg-slate-100 rounded-lg transition">
        {icon}
      </div>
      {title}
    </button>
  );
};

const User = () => {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
      <div className="w-[48px] h-[48px] flex justify-center items-center border border-slate-200 rounded-lg">
        <User2 />
      </div>
      <div className="flex flex-col">
        <h4 className="text-zinc-950 font-semibold">Genilson fernandes</h4>
        <span className="text-zinc-400">@genilsondev</span>
      </div>
    </div>
  );
};

const Header = () => {
  const menuControl = useVisibility();
  const userControl = useVisibility();
  const isSmallScreen = useMediaQuery('sm');
  const menuRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const session = useSession();
  const { signOut, ...auth } = useAuth();


  console.log({
    session,
    auth
  });



  if (isSmallScreen) {
    return (
      <>
        {menuControl.visible && (
          <div
            aria-label="overlay"
            className="fixed inset-0 bg-black/5"
            onClick={menuControl.onHidden}
          />
        )}
        <div className="container p-4">
          <nav className="flex justify-between gap-8 relative">
            <ButtonMenu>
              <Search size={22} />
            </ButtonMenu>
            <ButtonMenu
              onClick={() => {
                menuControl.visible ? menuControl.onHidden() : menuControl.onShow();
              }}>
              {menuControl.visible ? <X size={22} /> : <Menu size={22} />}
            </ButtonMenu>
            {menuControl.visible && (
              <div
                className="absolute w-full h-full left-0 top-[56px] flex justify-end "
                ref={menuRef}>
                <div className="bg-white border border-slate-100 absolute w-[80%] rounded-lg z-50 p-4">
                  <User />
                  <div className="space-y-2 pt-4">
                    <ButtonMenuList icon={<Settings />} title="Configurações" />
                    <ButtonMenuList icon={<LogOut />} title="Sair"
                      onClick={() => {
                        console.log(session);

                        signOut();
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      </>
    );
  }

  return (
    <>
      {userControl.visible && (
        <div
          aria-label="overlay"
          className="fixed inset-0 z-40 bg-black/5"
          onClick={userControl.onHidden}
        />
      )}
      <div className="container p-4">
        <nav className="grid grid-cols-12 gap-8">
          <div className="col-span-8 bg-white rounded-lg h-[48px] w-full text-zinc-400 flex items-center  ">
            <ButtonMenu>
              <Search size={22} />
            </ButtonMenu>
            <input
              type="text"
              className="w-full h-full bg-transparent outline-none"
              placeholder="Pesquisar por nome ou orçamento"
            />
          </div>
          <div className="col-span-4 flex justify-end gap-4 relative">
            <ButtonMenu>
              <Bell size={22} />
            </ButtonMenu>
            <ButtonMenu>
              <Settings size={22} />
            </ButtonMenu>
            <ButtonMenu
              onClick={() => {
                userControl.visible ? userControl.onHidden() : userControl.onShow();
              }}>
              <User2 size={22} />
            </ButtonMenu>
            {userControl.visible && (
              <div
                className="absolute w-full h-full left-0 top-[56px] flex justify-end "
                ref={userRef}>
                <div className="bg-white border border-slate-100 absolute w-[80%] rounded-lg z-50 p-4">
                  <User />
                  <div className="space-y-2 pt-4">
                    <ButtonMenuList icon={<Settings />} title="Configurações" />
                    <ButtonMenuList icon={<LogOut />} title="Sair" onClick={() => {
                      console.log(session);

                      signOut();
                    }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
