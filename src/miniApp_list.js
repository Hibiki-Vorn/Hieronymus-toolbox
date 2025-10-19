// miniApp_list.js
export const pages = [
  {
    name: "Home",
    icon: () => import('./assets/favicon.svg'),
    router: "/",
    source: () => import('./lib/Index.svelte'),
  },
  {
    name: "Counter",
    icon: () => import('./assets/square-1.svg'),
    router: "/Counter",
    source: () => import('./lib/Counter.svelte'),
  },
  {
    name: "ToDo List",
    icon: () => import('./assets/list-check.svg'),
    router: "/ToDo-List",
    source: () => import('./lib/Todolist.svelte'),
  },
  {
    name: "QR code Generation",
    icon: () => import('./assets/qr.png'),
    router: "/QRcode",
    source: () => import('./lib/Qrcode.svelte'),
  },
  {
    name: "Bar code Generation",
    icon: () => import('./assets/barcode.svg'),
    router: "/Barcode",
    source: () => import('./lib/Barcode.svelte'),
  }
];

// 自动生成路由对象
export const routes = pages.reduce((acc, page) => {
  // 这里把 "/ToDo-List" -> "/TodoList" 等等统一成驼峰
  const key = page.router.replace(/-./g, m => m[1].toUpperCase());
  acc[key] = page.source;
  return acc;
}, {});
