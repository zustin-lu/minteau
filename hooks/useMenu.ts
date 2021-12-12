import { routes } from 'constant';
import { useRouter } from 'next/router';

type MenuRouteItem = {
  text: string;
  pathname: string;
};

type Input = {
  removeCurrentPage?: boolean;
};

type Output = {
  menuRoutes: Array<MenuRouteItem & { isActive: boolean }>;
};

const menuRoutes: MenuRouteItem[] = [
  { text: 'Trang chủ', pathname: routes.home() },
  { text: 'Trò mèo đầu tiên của lmint', pathname: routes.greeting() },
  { text: 'Máy tính điểm của Boss Chou', pathname: routes.loveScore() },
];

function useMenu({ removeCurrentPage }: Input = {}): Output {
  const router = useRouter();
  const output: Output['menuRoutes'] = menuRoutes.map((i) => {
    return { ...i, isActive: i.pathname === router.pathname };
  });
  return {
    menuRoutes: removeCurrentPage
      ? output.filter((i) => i.pathname !== router.pathname)
      : output,
  };
}

export default useMenu;
