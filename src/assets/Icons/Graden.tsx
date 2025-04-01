const Garden = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg fill={color} width={width} height={height} viewBox="0 0 32 32">
        <path d="M13.931 19.932c2.501-3.823-1.935-7.059-4.692-2.878h-0c-3.707-4.17-9.041-1.828-5.944 3.503-3.197 2.159-2.404 8.224 2.628 7.32 0.398 4.93 9.263 2.684 7.534-1.186 5.372-1.872 3.476-5.408 0.475-6.76zM9.3 25.498c-1.555 0-2.815-1.26-2.815-2.815s1.261-2.815 2.815-2.815 2.815 1.26 2.815 2.815c0 1.555-1.261 2.815-2.815 2.815zM27.364 13.568l-0 0.001c1.619-4.876-2.704-8.052-5.529-3.127-3.193-1.556-7.664 0.631-4.627 5.466-3.056 4.17 1.5 7.211 4.413 5.462 2.196 3.821 7.151 0.326 5.609-2.735 4.2 0.234 4.738-4.794 0.135-5.067zM24.197 18.463c-1.24 0.716-2.825 0.291-3.541-0.949s-0.291-2.826 0.949-3.542c1.24-0.716 2.825-0.291 3.541 0.949s0.291 2.826-0.949 3.542zM12.413 6.218c2.031-3.493-0.745-6.581-4.153-3.683-2.608-2.643-6.885-1.002-5.335 3.702-3.89 1.387-0.164 8.052 2.583 5.82 2.67 3.929 5.112 1.635 5.554-1.079 3.623 1.19 5.319-3.441 1.351-4.761zM8.625 9.657c-1.254 0.336-2.542-0.408-2.878-1.662s0.408-2.543 1.662-2.88c1.254-0.336 2.542 0.408 2.878 1.662s-0.408 2.543-1.662 2.88zM22.531 26.376c1.36-1.863-1.445-3.83-1.964-0.781-1.491-1.914-3.63 0.287-1.281 1.674-2.967 1.519 0.166 3.553 1.369 1.714 0.265 3.087 3.791 1.134 1.817-0.675 2.505 0.411 2.5-2.007 0.059-1.933zM21.153 28.064c-0.391 0-0.708-0.317-0.708-0.708s0.317-0.708 0.708-0.708c0.391 0 0.708 0.317 0.708 0.708s-0.317 0.708-0.708 0.708zM20.733 4.715c2.635-0.573 0.465-3.684-1.236-1.493-0.007-2.157-3.296-1.824-2.043 0.8h0c-2.133-0.044-1.329 2.925 0.272 2.091-0.835 2.579 2.542 2.984 2.092 0.306 2.014 1.269 2.925-0.756 0.915-1.704zM18.901 5.666c-0.391 0-0.708-0.317-0.708-0.708s0.317-0.708 0.708-0.708c0.391 0 0.708 0.317 0.708 0.708s-0.317 0.708-0.708 0.708z"></path>
      </svg>
    </div>
  );
};

export default Garden;
