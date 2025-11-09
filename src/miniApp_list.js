// miniApp_list.js
export const pages = [
  {
    name: "Counter",
    route: "/counter",
    icon: () => import('./assets/square-1.svg'),
    source: () => import('./lib/Counter.svelte'),
  },
  {
    name: "ToDo List",
    route: "/todolist",
    icon: () => import('./assets/list-check.svg'),
    source: () => import('./lib/Todolist.svelte'),
  },
  {
    name: "QR code Generation",
    route: "/qrcodegeneration",
    icon: () => import('./assets/qr.svg'),
    source: () => import('./lib/Qrcode.svelte'),
  },
  {
    name: "Bar code Generation",
    route: "/barcodegeneration",
    icon: () => import('./assets/barcode.svg'),
    source: () => import('./lib/Barcode.svelte'),
  },
  {
    name: "OCR",
    route: "/ocr",
    icon: () => import('./assets/ocr.svg'),
    source: () => import('./lib/OCR.svelte'),
  },
  {
    name: "Short Chain",
    route: "/shortchain",
    icon: () => import('./assets/ShortChain.svg'),
    source: () => import('./lib/ShortChain.svelte'),
  },
  {
    name: "Girl Friends",
    route: "/girlfriends",
    icon: () => import('./assets/girl.svg'),
    source: () => import('./lib/live2D.svelte'),
  }
];

export const getComponentByPathname = (route) => {
  for (let index = 0; index < pages.length; index++) {
    if (pages[index].route === route) {
      return pages[index];
    }
  }
  return null;
}
