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
    icon: () => import('./assets/qr.svg'),
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
  },
  {
    name: "ShortChain",
    icon: () => import('./assets/ShortChain.svg'),
    // @ts-ignore
    source: () => import('./lib/ShortChain.svelte'),
  }
];

// 自动生成路由对象
export const routes = pages.reduce((acc, page) => {
  const key = page.name;
  acc[key] = page.source;
  return acc;
}, {});
