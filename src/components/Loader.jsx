import { Audio } from "react-loader-spinner";
export const Loader = () => {
  return (
    <div>
      <Audio
        height="100"
        width="100"
        color="blue"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
};
