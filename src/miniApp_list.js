// miniApp_list.js
export const pages = [
  {
    name: "Counter",
    icon: () => import('./assets/square-1.svg'),
    // @ts-ignore
    source: () => import('./lib/Counter.svelte'),
  },
  {
    name: "ToDo List",
    icon: () => import('./assets/list-check.svg'),
    // @ts-ignore
    source: () => import('./lib/Todolist.svelte'),
  },
  {
    name: "QR code Generation",
    icon: () => import('./assets/qr.png'),
    // @ts-ignore
    source: () => import('./lib/Qrcode.svelte'),
  },
  {
    name: "Bar code Generation",
    icon: () => import('./assets/barcode.svg'),
    // @ts-ignore
    source: () => import('./lib/Barcode.svelte'),
  },
  {
    name: "OCR",
    icon: () => import('./assets/ocr.svg'),
    // @ts-ignore
    source: () => import('./lib/OCR.svelte'),
  }
];

// 自动生成路由对象
export const routes = pages.reduce((acc, page) => {
  // 这里把 "/ToDo-List" -> "/TodoList" 等等统一成驼峰
  const key = page.name;
  acc[key] = page.source;
  return acc;
}, {});
