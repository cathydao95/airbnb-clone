import { urlFor } from "../client";

function Image({ identifier, image }) {
  console.log("asd", image);
  return (
    <div className={identifier === "main-image" ? "main-image" : "image"}>
      <img src={urlFor(image.asset)} alt="" />
    </div>
  );
}

export default Image;
