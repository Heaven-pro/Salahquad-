declare module '*.MOV' {
  const src: string;
  export default src;
}

declare module '*.mov' {
  const src: string;
  export default src;
}

declare module '*.JPG' {
  const src: import('next/image').StaticImageData;
  export default src;
}

declare module '*.jpg' {
  const src: import('next/image').StaticImageData;
  export default src;
}
