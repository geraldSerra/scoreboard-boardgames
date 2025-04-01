const Field = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        width={width}
        height={height}
      >
        <path d="M23.5,14.992H21v-1.25a.25.25,0,0,1,.25-.25H23a.5.5,0,0,0,.434-.748L21.861,9.992H22.5a.5.5,0,0,0,.424-.764l-2.5-4a.519.519,0,0,0-.848,0l-2.5,4a.5.5,0,0,0,.424.764h.639l-1.574,2.752a.5.5,0,0,0,.435.748h1.75a.25.25,0,0,1,.25.25v1.483a14.292,14.292,0,0,0-5.725,2.9.249.249,0,0,0-.09.238.247.247,0,0,0,.165.194,12.647,12.647,0,0,1,5.686,3.655,1.961,1.961,0,0,1,.434,1.5.251.251,0,0,0,.062.2.247.247,0,0,0,.187.084H23.5a.5.5,0,0,0,.5-.5v-8A.5.5,0,0,0,23.5,14.992Z" />
        <path d="M.222,21.076A.5.5,0,0,0,0,21.492v2a.5.5,0,0,0,.5.5h17a.5.5,0,0,0,.384-.82C15.437,20.235,10.906,19.217,8,19.028V16.742a.25.25,0,0,1,.25-.25h3.29a1,1,0,0,0,.818-1.574l-2.4-3.426h.629a1,1,0,0,0,.843-1.537l-2.545-4a1,1,0,0,0,.587-1.476L6.929.235a.52.52,0,0,0-.858,0L3.525,4.478a1,1,0,0,0,.588,1.477l-2.545,4a1,1,0,0,0,.843,1.538H3.04l-2.4,3.426a1,1,0,0,0,.819,1.574H4.75a.25.25,0,0,1,.25.25v2.41A11.66,11.66,0,0,0,.222,21.076Z" />
      </svg>
    </div>
  );
};

export default Field;
