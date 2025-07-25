function Button({ text = " ", extraCSS, ...props }) {
  return (
    <button
      {...props}
      className={` whitespace-nowrap py-2 rounded-xl cursor-pointer  text-white border-2 bg-transparent border-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 text-2xl font-mon tracking-wide px-10 ${extraCSS}`}
    >
      {text}
    </button>
  );
}

export default Button;
