import "../css/ProductPhoto.css";

type ProductPhotoProps = {
  url : string,
  description: string
}

const ProductPhoto = ({url, description} : ProductPhotoProps) => {
  return (
    <div className="product-photo">
      <div className="product-photo-container">
        <div className="product-photo-main">
          <img src={url} alt={description} />
        </div>
      </div>
    </div>
  )

}

export default ProductPhoto;